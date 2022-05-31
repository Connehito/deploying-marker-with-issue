import fetch, {Response} from 'node-fetch'
import {getEnvVar} from '../common/env'

export const fetchGitHubGraphQL = async (
  query: string,
  variables: Record<string, unknown> = {}
): Promise<unknown> => {
  const response = await fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: {
      Authorization: `token ${getEnvVar('GITHUB_TOKEN')}`
    },
    body: JSON.stringify({query, variables})
  })
  if (response.status !== 200)
    throw new Error(`Invalid status code: ${response.status}`)
  const body = await response.json()
  if (typeof body === 'object' && body != null && 'errors' in body) {
    throw new Error(`Response has error: ${JSON.stringify(body)}`)
  }
  return body
}

export const fetchGitHubApiV3 = async (
  method: string,
  path: string,
  body = ''
): Promise<Response> => {
  const response = await fetch(`https://api.github.com${path}`, {
    method,
    headers: {
      Accept: 'application/vnd.github.v3+json',
      Authorization: `token ${getEnvVar('GITHUB_TOKEN')}`
    },
    body
  })
  if (!response.ok)
    throw new Error(
      `Invalid status code: ${response.status} => ${
        (await response.text()) ?? '(Empty body)'
      }`
    )
  return response
}
