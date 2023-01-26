import Ajv, {JSONSchemaType} from 'ajv'
import {fetchGitHubApiV3} from './common'
import {DefaultLabelColor, DefaultLabelDescription} from '../common/label'
import {onWarning} from '../common/error'

interface CreateLabelResultType {
  id: number
  node_id: string
  url: string
  name: string
  description: string
  color: string
  default: boolean
}

// https://docs.github.com/ja/rest/issues/labels#create-a-label
const CreateLabelResultSchema: JSONSchemaType<CreateLabelResultType> = {
  type: 'object',
  properties: {
    id: {
      type: 'integer'
    },
    node_id: {
      type: 'string'
    },
    url: {
      type: 'string'
    },
    name: {
      type: 'string'
    },
    description: {
      type: 'string'
    },
    color: {
      type: 'string'
    },
    default: {
      type: 'boolean'
    }
  },
  required: ['id', 'node_id', 'url', 'name', 'color', 'default']
}
const validateCreateLabelResultSchema = new Ajv().compile(
  CreateLabelResultSchema
)

interface Args {
  repoOwner: string
  repoName: string
  labelName: string
  labelColor?: string | null
  labelDescription?: string | null
}

export const createLabel = async (
  args: Args
): Promise<CreateLabelResultType> => {
  const {repoOwner, repoName, labelName, labelColor, labelDescription} = args
  const result = await fetchGitHubApiV3(
    'POST',
    `/repos/${repoOwner}/${repoName}/labels`,
    JSON.stringify({
      name: labelName,
      color: labelColor ?? DefaultLabelColor,
      description: labelDescription ?? DefaultLabelDescription
    })
  )
  if (validateCreateLabelResultSchema(result)) {
    return result
  }
  onWarning(`GitHub APIv4 Result: ${JSON.stringify(result)}`)
  throw new Error(
    `Schema Error: ${JSON.stringify(validateCreateLabelResultSchema.errors)}`
  )
}
