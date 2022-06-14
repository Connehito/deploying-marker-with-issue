import {fetchGitHubGraphQL} from './common'

interface Args {
  issueId: string
  body: string
  labelIds: string[]
}

export const updateIssue = async (args: Args): Promise<void> => {
  await fetchGitHubGraphQL(
    `mutation ($issueId: ID!, $body: String!, $labelIds: [ID!]) {
       updateIssue(input: {id: $issueId, body: $body, labelIds: $labelIds}) {
         clientMutationId
       }
     }`,
    {...args}
  )
}
