import * as core from '@actions/core'
import {Input} from '../common/input'

export const checkMarkerExists = async (input: Input): Promise<void> => {
  core.info(`DEBUG: ${JSON.stringify(input)}`)
}
