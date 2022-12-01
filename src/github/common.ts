import axios, {AxiosResponse} from 'axios'
import {getEnvVar} from '../common/env'

export const fetchGitHubGraphQL = async (
  query: string,
  variables: Record<string, unknown> = {}
): Promise<unknown> => {
  const {status, data} = await axios.post(
    'https://api.github.com/graphql',
    {query, variables},
    {
      headers: {
        Authorization: `token ${getEnvVar('GITHUB_TOKEN')}`
      }
    }
  )
  if (status !== 200) throw new Error(`Invalid status code: ${status}`)
  if (typeof data === 'object' && data != null && 'errors' in data) {
    throw new Error(`Response has error: ${JSON.stringify(data)}`)
  }
  return data
}

export const fetchGitHubApiV3 = async (
  method: string,
  path: string,
  body = ''
): Promise<AxiosResponse> => {
  const response = await axios.request({
    url: `https://api.github.com${path}`,
    method,
    headers: {
      Accept: 'application/vnd.github.v3+json',
      Authorization: `token ${getEnvVar('GITHUB_TOKEN')}`
    },
    data: body
  })
  if (response.status < 200 || 206 < response.status)
    throw new Error(
      `Invalid status code: ${response.status} => ${JSON.stringify(
        response.data ?? '(Empty body)'
      )}`
    )
  return response
}
