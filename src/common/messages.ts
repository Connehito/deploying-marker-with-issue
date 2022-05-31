import {LabelName} from './label'

export const Messages = {
  'error:label_already_attached': [
    'ERROR: Label already attached.',
    '- Please check latest issue comments',
    `- If to detach "${LabelName}" label is no problem, please detach the label manually.`
  ].join('\n'),
  'error:label_already_detached': [
    'ERROR: Label already detached.',
    '- Please check latest issue comments',
    `- If to attach "${LabelName}" label is no problem, please attach the label manually.`
  ].join('\n')
}
