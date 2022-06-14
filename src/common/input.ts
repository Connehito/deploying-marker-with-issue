import * as core from '@actions/core'

export interface Input {
  action: string
  issueNumber: number
  exitWithError: boolean
  repoOwner: string
  repoName: string
  commitHash: string
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

  const [repoOwner, repoName] = (process.env.GITHUB_REPOSITORY ?? '').split('/')
  const commitHash = process.env.GITHUB_SHA ?? ''
  core.warning(JSON.stringify(process.env, null, 2))

  return {action, issueNumber, exitWithError, repoOwner, repoName, commitHash}
}
