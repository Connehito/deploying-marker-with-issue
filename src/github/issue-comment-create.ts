import {fetchGitHubGraphQL} from './common'
import {buildValidator} from '../common/validater'
import {FromSchema} from 'json-schema-to-ts'

const Schema = {
  type: 'object',
  additionalProperties: false,
  required: ['data'],
  properties: {
    data: {
      type: 'object',
      additionalProperties: false,
      required: ['addComment'],
      properties: {
        addComment: {
          type: 'object',
          additionalProperties: false,
          required: ['commentEdge'],
          properties: {
            commentEdge: {
              type: 'object',
              additionalProperties: false,
              required: ['node'],
              properties: {
                node: {
                  type: 'object',
                  additionalProperties: false,
                  required: ['url'],
                  properties: {
                    url: {
                      type: 'string',
                      pattern: '^https://github.com/'
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
  issueId: string
  body: string
}

export const createIssueComment = async (
  args: Args
): Promise<FromSchema<typeof Schema>> => {
  const result = await fetchGitHubGraphQL(
    `mutation ($issueId: ID!, $body: String!) {
       addComment(input: {subjectId: $issueId, body: $body}) {
         commentEdge {
           node {
             url
           }
         }
       }
     }`,
    {...args}
  )
  return buildValidator(Schema)(result)
}
