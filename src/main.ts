import * as core from '@actions/core'
import {getInput} from './common/input'
import {attachMarker} from './actions/attach-marker'
import {checkMarkerAttached} from './actions/check-marker-attached'
import {checkMarkerDetached} from './actions/check-marker-detached'
import {detachMarker} from './actions/detach-marker'
import {Messages} from './common/messages'

const run = async (): Promise<void> => {
  try {
    const input = getInput()
    switch (input.action) {
      case 'check-marker-attached':
        if (!(await checkMarkerAttached(input)) && input.exitWithError) {
          core.setFailed(Messages['error:label_already_attached'])
        }
        break
      case 'check-marker-detached':
        if (!(await checkMarkerDetached(input)) && input.exitWithError) {
          core.setFailed(Messages['error:label_already_detached'])
        }
        break
      case 'attach-marker':
        await attachMarker(input)
        break
      case 'detach-marker':
        await detachMarker(input)
        break
      default:
        core.setFailed(`Undefined action: ${input.action}`)
    }
  } catch (error) {
    if (error instanceof Error) {
      core.setFailed(error.message)
    } else {
      core.setFailed(`ERROR: ${error}`)
    }
  }
}

run()
