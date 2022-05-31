import {buildValidator, fetchGitHubGraphQL} from './common'
import {FromSchema} from 'json-schema-to-ts'

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
  owner: string
  repo: string
  labelName: string
}

export const getLabels = async (
  args: Args
): Promise<FromSchema<typeof Schema>> => {
  const result = await fetchGitHubGraphQL(
    `query ($owner: String!, $repo: String!, $labelName: String!) {
       organization(login: $owner) {
         repository(name: $repo) {
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
