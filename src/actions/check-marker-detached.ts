import {Input} from '../common/input'
import {attachedMarkerOnIssue} from '../common/label'
import {onError, onWarning} from '../common/error'
import {getMessage} from '../common/messages'

export const checkMarkerDetached = async (input: Input): Promise<void> => {
  const {repoOwner, repoName, issueNumber, exitWithError} = input
  const attached = await attachedMarkerOnIssue(repoOwner, repoName, issueNumber)

  if (attached) {
    if (exitWithError) {
      onError(getMessage('error:label_already_attached'))
    } else {
      onWarning(getMessage('warning:label_already_attached'))
    }
  }
}
