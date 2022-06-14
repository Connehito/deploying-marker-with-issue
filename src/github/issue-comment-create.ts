import {fetchGitHubGraphQL} from './common'

interface Args {
  issueId: string
  body: string
}

export const createIssueComment = async (args: Args): Promise<void> => {
  await fetchGitHubGraphQL(
    `mutation ($issueId: ID!, $labelIds: [ID!]) {
       updateIssue(input: {id: $issueId, labelIds: $labelIds}) {
         clientMutationId
       }
     }`,
    {...args}
  )
}
