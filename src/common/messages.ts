import {LabelName} from './label'

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
  ].join('\n')
}
