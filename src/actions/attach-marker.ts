import {Input} from '../common/input'
import {getIssue} from '../github/issue-get'
import {updateIssue} from '../github/issue-update'
import {getLabels} from '../github/label-get'
import {attachedMarkerOnIssue, LabelName} from '../common/label'
import {createLabel} from '../github/label-create'
import {onError} from '../common/error'
import {getMessage} from '../common/messages'
import {createIssueComment} from '../github/issue-comment-create'
import {warning} from '@actions/core'

export const attachMarker = async (input: Input): Promise<void> => {
  const {repoOwner, repoName, issueNumber, exitWithError, commitHash, actor} =
    input

  const attached = await attachedMarkerOnIssue(repoOwner, repoName, issueNumber)
  if (attached) {
    if (exitWithError) {
      onError(getMessage('error:label_already_attached'))
    }
    return
  }

  const issue = await getIssue({repoOwner, repoName, issueNumber})
  const labels = (await getLabels({repoOwner, repoName, labelName: LabelName}))
    .data.organization.repository.labels.nodes
  const label = labels.find(({name}) => name === LabelName)

  const labelId =
    label != null
      ? label.id
      : (
          await createLabel({
            repoOwner,
            repoName,
            labelName: LabelName
          })
        ).node_id

  const issueId = issue.data.organization.repository.issue.id
  await updateIssue({issueId, labelIds: [labelId]})
  const comment = await createIssueComment({
    issueId,
    body: `Attached \`${LabelName}\` label by ${commitHash}, initiated this workflow by @${actor}`
  })
  warning(
    `DEBUG: Comment URL is ${comment.data.addComment.commentEdge.node.url}`
  )
}
