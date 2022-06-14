import {LabelName} from './label'

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

export const getMessage = (key: keyof typeof Messages): string => {
  const message = Messages[key]
  if (message != null) {
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
  'warning:label_already_attached': `WARNING: "${LabelName}" label already attached, but not errored because exit-with-error is false.`,
  'warning:label_already_detached': `WARNING: "${LabelName}" label already detached, but not errored because exit-with-error is false.`
}
