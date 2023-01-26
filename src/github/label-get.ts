import Ajv, {JSONSchemaType} from 'ajv'
import {fetchGitHubGraphQL} from './common'
import {onWarning} from '../common/error'

interface LabelType {
  data: {
    organization: {
      repository: {
        labels: {
          nodes: {
            id: string
            name: string
          }[]
        }
      }
    }
  }
}

export const LabelSchema: JSONSchemaType<LabelType> = {
  type: 'object',
  additionalProperties: false,
  required: ['data'],
  properties: {
    data: {
      type: 'object',
      additionalProperties: false,
      required: ['organization'],
      properties: {
        organization: {
          type: 'object',
          additionalProperties: false,
          required: ['repository'],
          properties: {
            repository: {
              type: 'object',
              additionalProperties: false,
              required: ['labels'],
              properties: {
                labels: {
                  type: 'object',
                  additionalProperties: false,
                  required: ['nodes'],
                  properties: {
                    nodes: {
                      type: 'array',
                      items: {
                        type: 'object',
                        additionalProperties: false,
                        required: ['id', 'name'],
                        properties: {
                          id: {type: 'string'},
                          name: {type: 'string'}
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}

const validateLabelType = new Ajv().compile(LabelSchema)

interface Args {
  repoOwner: string
  repoName: string
  labelName: string
}

export const getLabels = async (args: Args): Promise<LabelType> => {
  const result = await fetchGitHubGraphQL(
    `query ($repoOwner: String!, $repoName: String!, $labelName: String!) {
       organization(login: $repoOwner) {
         repository(name: $repoName) {
           labels(first: 100, query: $labelName) {
             nodes {
               id
               name
             }
           }
         }
       }
     }`,
    {...args}
  )
  if (validateLabelType(result)) {
    return result
  }
  onWarning(`GitHub APIv4 Result: ${JSON.stringify(result)}`)
  throw new Error(`Schema Error: ${JSON.stringify(validateLabelType.errors)}`)
}
