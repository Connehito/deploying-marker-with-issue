import {fetchGitHubGraphQL} from './common'

interface Args {
  issueId: string
  body: string
  assigneeIds: string[]
  labelIds: string[]
}

export const updateIssue = async (args: Args): Promise<void> => {
  const response = await fetchGitHubGraphQL(
    `mutation ($issueId: ID!, $body: String!, $assigneeIds: [ID!] $labelIds: [ID!]) {
        updateIssue(input: {id: $issueId, body: $body, assigneeIds: $assigneeIds, labelIds: $labelIds}) {
          clientMutationId
        }
     }`,
    {...args}
  )
}
