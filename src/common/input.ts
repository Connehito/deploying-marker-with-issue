import * as core from '@actions/core'

export interface Input {
  action: string
  issueNumber: number
  exitWithError: boolean
}

export const getInput = (): Input => {
  const action = core.getInput('action', {required: true})
  const issueNumber = parseInt(
    core.getInput('issue-number', {required: true}),
    10
  )
  const exitWithError = core.getBooleanInput('exit-with-error', {
    required: false
  })

  return {action, issueNumber, exitWithError}
}
