import * as core from '@actions/core'
import {getInput} from './common/input'
import {attachMarker} from './actions/attach-marker'
import {checkMarkerAttached} from './actions/check-marker-attached'
import {checkMarkerDetached} from './actions/check-marker-detached'
import {detachMarker} from './actions/detach-marker'
import {onError} from './common/error'

const run = async (): Promise<void> => {
  try {
    const input = await getInput()
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
      case 'check-marker-detached-or-assigned-actor':
        // TODO
        break
      default:
        onError(`Undefined action: ${input.action}`)
    }
  } catch (error) {
    if (error instanceof Error) {
      onError(error.message)
    } else {
      onError(`ERROR: ${JSON.stringify(error)}`)
    }
  }
}

run()
