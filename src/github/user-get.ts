import Ajv, {JSONSchemaType} from 'ajv'
import {onWarning} from '../common/error'
import {fetchGitHubGraphQL} from './common'

interface UserType {
  data: {
    user: {
      id: string
    }
  }
}

const UserSchema: JSONSchemaType<UserType> = {
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
}
const validateUserType = new Ajv().compile(UserSchema)

interface Args {
  login: string
}

export const getUser = async (args: Args): Promise<UserType> => {
  const result = await fetchGitHubGraphQL(
    `query ($login: String!) {
       user(login: $login) {
         id
       }
     }`,
    {...args}
  )
  if (validateUserType(result)) {
    return result
  }
  onWarning(`GitHub APIv4 Result: ${JSON.stringify(result)}`)
  throw new Error(`Schema Error: ${JSON.stringify(validateUserType.errors)}`)
}
