import {Input} from '../common/input'
import {getIssue} from '../github/issue-get'
import {updateIssue} from '../github/issue-update'
import {attachedMarkerOnIssue, LabelName} from '../common/label'
import {onError} from '../common/error'
import {getMessage, updateIssueBody} from '../common/messages'
import {createIssueComment} from '../github/issue-comment-create'

export const detachMarker = async (input: Input): Promise<void> => {
  const {repoOwner, repoName, issueNumber, exitWithError, refLink, actor} =
    input

  const attached = await attachedMarkerOnIssue(repoOwner, repoName, issueNumber)
  if (!attached) {
    if (exitWithError) {
      onError(getMessage('error:label_already_detached'))
    }
    return
  }

  const issue = await getIssue({repoOwner, repoName, issueNumber})
  const {id: issueId, body, labels} = issue.data.organization.repository.issue
  const labelIds = labels.nodes
    .filter(({name}) => name !== LabelName)
    .map(({id}) => id)

  await updateIssue({issueId, body, assigneeIds: [], labelIds})
  const detachedMessage = getMessage('issue_comment:detached', {refLink, actor})
  const comment = await createIssueComment({issueId, body: detachedMessage})
  await updateIssue({
    issueId,
    body: updateIssueBody(body, comment.data.addComment.commentEdge.node.url),
    assigneeIds: [],
    labelIds
  })
}
