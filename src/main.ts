import * as core from '@actions/core'
import {getInput} from './common/input'
import {addMarker} from './actions/add_marker'
import {checkMarker} from './actions/check_marker'
import {removeMarker} from './actions/remove_marker'

const run = async (): Promise<void> => {
  try {
    const input = getInput()
    switch (input.action) {
      case 'check-marker':
        await checkMarker(input)
        break
      case 'add-marker':
        await addMarker(input)
        break
      case 'remove-marker':
        await removeMarker(input)
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
