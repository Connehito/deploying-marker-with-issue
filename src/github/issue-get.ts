import Ajv, {JSONSchemaType} from 'ajv'
import {fetchGitHubGraphQL} from './common'
import {onWarning} from '../common/error'

interface IssueType {
  data: {
    organization: {
      repository: {
        issue: {
          id: string
          body: string
          assignees: {
            nodes: {
              id: string
              login: string
            }[]
          }
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
}

const IssueSchema: JSONSchemaType<IssueType> = {
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
                  required: ['id', 'body', 'assignees', 'labels'],
                  properties: {
                    id: {type: 'string'},
                    body: {type: 'string'},
                    assignees: {
                      type: 'object',
                      additionalProperties: false,
                      required: ['nodes'],
                      properties: {
                        nodes: {
                          type: 'array',
                          items: {
                            type: 'object',
                            additionalProperties: false,
                            required: ['id', 'login'],
                            properties: {
                              id: {type: 'string'},
                              login: {type: 'string'}
                            }
                          }
                        }
                      }
                    },
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
}

const validateIssueType = new Ajv().compile(IssueSchema)

interface Args {
  repoOwner: string
  repoName: string
  issueNumber: number
}

export const getIssue = async (args: Args): Promise<IssueType> => {
  const result = await fetchGitHubGraphQL(
    `query ($repoOwner: String!, $repoName: String!, $issueNumber: Int!) {
      organization(login: $repoOwner) {
        repository(name: $repoName) {
          issue(number: $issueNumber) {
            id
            body
            assignees(first: 100) {
              nodes {
                id
                login
              }
            }
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
  if (validateIssueType(result)) {
    return result
  }
  onWarning(`GitHub APIv4 Result: ${JSON.stringify(result)}`)
  throw new Error(`Schema Error: ${JSON.stringify(validateIssueType.errors)}`)
}
