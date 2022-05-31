import * as core from '@actions/core'

export interface Input {
  action: string
  issueNumber: number
}

export const getInput = (): Input => {
  const action = core.getInput('action', {required: true})
  const issueNumber = parseInt(
    core.getInput('issue-number', {required: true}),
    10
  )
  return {action, issueNumber}
}
