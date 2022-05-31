import {fetchGitHubGraphQL} from './common'

interface Args {
  issueId: string
  labelIds: string[]
}

export const updateIssue = async (args: Args): Promise<void> => {
  await fetchGitHubGraphQL(
    `mutation ($issueId: ID!, $labelIds: [ID!]) {
       updateIssue(input: {id: $issueId, labelIds: $labelIds}) {
         clientMutationId
       }
     }`,
    {...args}
  )
}
