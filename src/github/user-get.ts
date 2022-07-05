import {FromSchema} from 'json-schema-to-ts'
import {buildValidator} from '../common/validater'
import {fetchGitHubGraphQL} from './common'

const UserSchema = {
  type: 'object',
  additionalProperties: false,
  required: ['data'],
  properties: {
    data: {
      type: 'object',
      additionalProperties: false,
      required: ['user'],
      properties: {
        user: {
          type: 'object',
          additionalProperties: false,
          required: ['id'],
          properties: {
            id: {
              type: 'string'
            }
          }
        }
      }
    }
  }
} as const

interface Args {
  login: string
}

export const getUser = async (
  args: Args
): Promise<FromSchema<typeof UserSchema>> => {
  const result = await fetchGitHubGraphQL(
    `query ($login: String!) {
       user(login: $login) {
         id
       }
     }`,
    {...args}
  )
  return buildValidator(UserSchema)(result)
}
