import * as core from '@actions/core'
import {getInput} from './common/input'
import {attachMarker} from './actions/attach-marker'
import {checkMarkerAttached} from './actions/check-marker-attached'
import {checkMarkerDetached} from './actions/check-marker-detached'
import {detachMarker} from './actions/detach-marker'

const run = async (): Promise<void> => {
  try {
    const input = getInput()
    switch (input.action) {
      case 'check-marker-attached':
        await checkMarkerAttached(input)
        break
      case 'check-marker-detached':
        await checkMarkerDetached(input)
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
      core.setFailed(`ERROR: ${JSON.stringify(error)}`)
    }
  }
}

run()
