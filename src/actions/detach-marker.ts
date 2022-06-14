import {Input} from '../common/input'
import {getIssue} from '../github/issue-get'
import {updateIssue} from '../github/issue-update'
import {attachedMarkerOnIssue, LabelName} from '../common/label'
import {onError} from '../common/error'
import {getMessage} from '../common/messages'
import {warning} from '@actions/core'
import {createIssueComment} from '../github/issue-comment-create'

export const detachMarker = async (input: Input): Promise<void> => {
  const {repoOwner, repoName, issueNumber, exitWithError, commitHash} = input

  const attached = await attachedMarkerOnIssue(repoOwner, repoName, issueNumber)
  if (!attached) {
    if (exitWithError) {
      onError(getMessage('error:label_already_detached'))
    }
    return
  }

  const issue = await getIssue({repoOwner, repoName, issueNumber})
  const {id: issueId, labels} = issue.data.organization.repository.issue
  const labelIds = labels.nodes
    .filter(({name}) => name !== LabelName)
    .map(({id}) => id)

  await updateIssue({issueId, labelIds})
  const comment = await createIssueComment({
    issueId,
    body: `Detached \`${LabelName}\` label by ${commitHash}`
  })
  warning(
    `DEBUG: Comment URL is ${comment.data.addComment.commentEdge.node.url}`
  )
}
