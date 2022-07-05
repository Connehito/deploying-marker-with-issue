import {LabelName} from './label'
import {onError} from './error'

const LatestLogCommentMarker = '<!-- LATEST_LOG_COMMENT_MARKER:LK2YMYBB -->'
export const updateIssueBody = (
  sourceBody: string,
  latestCommentUrl: string
): string => {
  const bodyLines = sourceBody.split(/\r?\n/g)
  const markerLineIndex = bodyLines.findIndex(line =>
    line.includes(LatestLogCommentMarker)
  )
  if (markerLineIndex === -1) {
    // Not exists marker line
    return `${sourceBody}\n\n## Latest Log Comment\n\n- ${latestCommentUrl} ${LatestLogCommentMarker}`
  }
  return bodyLines
    .map((line, index) => {
      if (index !== markerLineIndex) {
        return line
      }
      return `- ${latestCommentUrl} ${LatestLogCommentMarker}`
    })
    .join('\n')
}

export const getMessage = (
  key: keyof typeof Messages,
  variables: Record<string, string> = {}
): string => {
  let message = Messages[key]
  if (message != null) {
    for (const [variableKey, variableValue] of Object.entries(variables)) {
      const beforeMessage = message
      message = message.replace(
        new RegExp(`{{${variableKey}}}`, 'g'),
        variableValue
      )
      if (beforeMessage === message) {
        onError(`{{${variableKey}}} not found in message: ${message}`)
      }
    }
    return message
  }
  throw new Error(`Unknown message key: ${key}`)
}

const Messages = {
  'error:label_already_attached': [
    `ERROR: "${LabelName}" label already attached.`,
    '- Please check latest issue comments',
    `- If to detach "${LabelName}" label is no problem, please detach the label manually.`
  ].join('\n'),
  'error:label_already_detached': [
    `ERROR: "${LabelName}" label already detached.`,
    '- Please check latest issue comments',
    `- If to attach "${LabelName}" label is no problem, please attach the label manually.`
  ].join('\n'),
  'error:label_already_attached_and_not_assigned_actor': [
    `ERROR: "${LabelName}" label already attached and not assigned actor.`,
    '- Please check latest issue comments',
    `- If to detach "${LabelName}" label is no problem, please attach the label manually.`,
    `- If to remove actor in assignees is no problem, please remove assign manually.`
  ].join('\n'),
  'warning:label_already_attached': `WARNING: "${LabelName}" label already attached, but not errored because exit-with-error is false.`,
  'warning:label_already_detached': `WARNING: "${LabelName}" label already detached, but not errored because exit-with-error is false.`,
  'warning:label_already_attached_and_not_assigned_actor': `WARNING: "${LabelName}" label already attached and not assigned actor, but not errored because exit-with-error is false.`,
  'issue_comment:attached': `:no_entry: Attached \`${LabelName}\` label by {{refLink}}, initiated this workflow by @{{actor}}`,
  'issue_comment:detached': `:white_check_mark: Detached \`${LabelName}\` label by {{refLink}}, initiated this workflow by @{{actor}}`
}
