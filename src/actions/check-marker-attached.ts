import {Input} from '../common/input'
import {getIssue} from '../github/issue-get'
import {LabelName} from '../common/label'

export const checkMarkerAttached = async (input: Input): Promise<boolean> => {
  const {repoName, repoOwner, issueNumber} = input

  const issue = await getIssue({owner: repoOwner, repo: repoName, issueNumber})
  const label = issue.data.organization.repository.issue.labels.nodes.find(
    ({name}) => name === LabelName
  )
  return label != null
}
