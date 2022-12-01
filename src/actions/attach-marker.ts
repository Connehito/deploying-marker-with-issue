import {Input} from '../common/input'
import {getIssue} from '../github/issue-get'
import {updateIssue} from '../github/issue-update'
import {getLabels} from '../github/label-get'
import {attachedMarkerOnIssue, LabelName} from '../common/label'
import {createLabel} from '../github/label-create'
import {onError} from '../common/error'
import {getMessage} from '../common/messages'

export const attachMarker = async (input: Input): Promise<void> => {
  const {repoOwner, repoName, issueNumber, exitWithError, actorId} = input

  // const attached = await attachedMarkerOnIssue(repoOwner, repoName, issueNumber)
  // if (attached) {
  //   if (exitWithError) {
  //     onError(getMessage('error:label_already_attached'))
  //   }
  //   return
  // }

  const beforeIssueData = await getIssue({repoOwner, repoName, issueNumber})
  const {issue} = beforeIssueData.data.organization.repository
  const labels = (await getLabels({repoOwner, repoName, labelName: LabelName}))
    .data.organization.repository.labels.nodes
  const label = labels.find(({name}) => name === LabelName)

  let labelId = label?.id
  if (labelId == null) {
    const createLabelResult = await createLabel({
      repoOwner,
      repoName,
      labelName: LabelName
    })
    labelId = createLabelResult.node_id
  }

  for (let i = 0; i < 100; i++) {
    console.debug('###', i)
    await updateIssue({
      issueId: issue.id,
      body: issue.body,
      assigneeIds: [actorId],
      labelIds: [labelId]
    })
  }
}
