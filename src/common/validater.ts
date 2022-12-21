import Ajv from 'ajv'
import {FromSchema, JSONSchema} from 'json-schema-to-ts'
import {onWarning} from './error'

const ajv = new Ajv({allErrors: true})
export const buildValidator = <T extends JSONSchema>(
  schema: T
): ((params: unknown) => FromSchema<T>) => {
  const validate = ajv.compile(schema)
  return (params: unknown): FromSchema<T> => {
    if (validate(params)) {
      return params as FromSchema<T>
    }
    onWarning(JSON.stringify(params))
    throw new Error(`Schema Error: ${JSON.stringify(validate.errors)}`)
  }
}
