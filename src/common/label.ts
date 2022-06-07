import {getIssue} from '../github/issue-get'

export const LabelName = 'Deploying'
export const DefaultLabelColor = 'FF0000'
export const DefaultLabelDescription =
  'This label indicates that deployment is in progress.'

export const attachedMarkerOnIssue = async (
  repoOwner: string,
  repoName: string,
  issueNumber: number
): Promise<boolean> => {
  const issueData = await getIssue({repoOwner, repoName, issueNumber})
  const labels = issueData.data.organization.repository.issue.labels.nodes
  const label = labels.find(({name}) => name === LabelName)
  return label != null
}
