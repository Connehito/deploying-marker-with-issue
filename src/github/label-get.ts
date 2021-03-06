import {fetchGitHubGraphQL} from './common'
import {FromSchema} from 'json-schema-to-ts'
import {buildValidator} from '../common/validater'

export const Schema = {
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
} as const

interface Args {
  repoOwner: string
  repoName: string
  labelName: string
}

export const getLabels = async (
  args: Args
): Promise<FromSchema<typeof Schema>> => {
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
  return buildValidator(Schema)(result)
}
