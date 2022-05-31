import {FromSchema} from 'json-schema-to-ts'
import {buildValidator, fetchGitHubGraphQL} from './common'

const IssueSchema = {
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
              required: ['issue'],
              properties: {
                issue: {
                  type: 'object',
                  additionalProperties: false,
                  required: ['id', 'labels'],
                  properties: {
                    id: {type: 'string'},
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
  }
} as const

interface Args {
  owner: string
  repo: string
  issueNumber: number
}

export const getIssue = async (
  args: Args
): Promise<FromSchema<typeof IssueSchema>> => {
  const result = await fetchGitHubGraphQL(
    `query ($owner: String!, $repo: String!, $issueNumber: Int!) {
      organization(login: $owner) {
        repository(name: $repo) {
          issue(number: $issueNumber) {
            id
            labels(first: 100) {
              nodes {
                id
                name
              }
            }
          }
        }
      }
    }`,
    {...args}
  )
  return buildValidator(IssueSchema)(result)
}
