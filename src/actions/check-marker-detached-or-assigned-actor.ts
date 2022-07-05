import {Input} from '../common/input'
import {attachedMarkerOnIssue} from '../common/label'
import {onError, onWarning} from '../common/error'
import {getMessage} from '../common/messages'
import {getIssue} from '../github/issue-get'

export const checkMarkerDetachedOrAssignedActor = async (
  input: Input
): Promise<void> => {
  const {repoOwner, repoName, issueNumber, exitWithError, actorId} = input
  const attached = await attachedMarkerOnIssue(repoOwner, repoName, issueNumber)

  const {assignees} = (await getIssue({repoOwner, repoName, issueNumber})).data
    .organization.repository.issue
  const assigned = assignees.nodes.some(({id}) => id === actorId)

  if (!attached || assigned) {
    return
  } else if (exitWithError) {
    onError(getMessage('error:label_already_attached_and_not_assigned_actor'))
  } else {
    onWarning(
      getMessage('warning:label_already_attached_and_not_assigned_actor')
    )
  }
}
