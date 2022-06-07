import * as core from '@actions/core'

export const onError = (message: string): void => {
  core.setFailed(message)
}

export const onWarning = (message: string): void => {
  core.warning(message)
}
