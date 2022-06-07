import {fetchGitHubApiV3} from './common'
import {FromSchema} from 'json-schema-to-ts'
import {DefaultLabelColor, DefaultLabelDescription} from '../common/label'
import {buildValidator} from '../common/validater'

// https://docs.github.com/ja/rest/issues/labels#create-a-label
const Schema = {
  title: 'Label',
  description:
    'Color-coded labels help you categorize and filter your issues (just like labels in Gmail).',
  type: 'object',
  properties: {
    id: {
      type: 'integer',
      examples: [208045946]
    },
    node_id: {
      type: 'string',
      examples: ['MDU6TGFiZWwyMDgwNDU5NDY=']
    },
    url: {
      description: 'URL for the label',
      type: 'string',
      examples: ['https://api.github.com/repositories/42/labels/bug']
    },
    name: {
      description: 'The name of the label.',
      type: 'string',
      examples: ['bug']
    },
    description: {
      type: ['string', 'null'],
      examples: ["Something isn't working"]
    },
    color: {
      description:
        '6-character hex code, without the leading #, identifying the color',
      type: 'string',
      examples: ['FFFFFF']
    },
    default: {
      type: 'boolean',
      examples: [true]
    }
  },
  required: ['id', 'node_id', 'url', 'name', 'description', 'color', 'default']
} as const

interface Args {
  repoOwner: string
  repoName: string
  labelName: string
  labelColor?: string | null
  labelDescription?: string | null
}

export const createLabel = async (
  args: Args
): Promise<FromSchema<typeof Schema>> => {
  const {repoOwner, repoName, labelName, labelColor, labelDescription} = args
  const response = await fetchGitHubApiV3(
    'POST',
    `/repos/${repoOwner}/${repoName}/labels`,
    JSON.stringify({
      name: labelName,
      color: labelColor ?? DefaultLabelColor,
      description: labelDescription ?? DefaultLabelDescription
    })
  )
  return buildValidator(Schema)(await response.json())
}
