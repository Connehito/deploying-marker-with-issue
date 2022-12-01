import https from 'https'
import {getEnvVar} from '../common/env'

const request = async (
  method: string,
  url: string,
  body: unknown
): Promise<unknown /* Parsed JSON Data */> =>
  new Promise((resolve, reject) => {
    const req = https.request(url, {
      method,
      headers: {
        Authorization: `token ${getEnvVar('GITHUB_TOKEN')}`,
        Accept: 'application/json',
        'User-Agent': 'Connehito/deploying-marker-with-issue'
      },
      timeout: 10000
    })
    req.on('response', res => {
      if (res.statusCode !== 200) {
        throw new Error(`Invalid status code: ${res.statusCode}`)
      }
      try {
        const chunks: Buffer[] = []
        res.on('data', chunk => {
          chunks.push(chunk)
        })
        res.on('end', () => {
          resolve(JSON.parse(Buffer.concat(chunks).toString('utf-8')))
        })
        res.on('error', reject)
      } catch (err) {
        reject(err)
      }
    })
    req.on('error', reject)
    req.write(body)
    req.end()
  })

export const fetchGitHubGraphQL = async (
  query: string,
  variables: Record<string, unknown> = {}
): Promise<unknown> =>
  request(
    'POST',
    'https://api.github.com/graphql',
    JSON.stringify({query, variables})
  )

export const fetchGitHubApiV3 = async (
  method: string,
  path: string,
  body = ''
): Promise<unknown> => request(method, `https://api.github.com${path}`, body)
