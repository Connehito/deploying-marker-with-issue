import * as core from '@actions/core'

export interface Input {
  action: string
  issueNumber: number
  exitWithError: boolean
  repoOwner: string
  repoName: string
  commitHash: string
  actor: string
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

  // https://docs.github.com/en/actions/learn-github-actions/environment-variables
  const [repoOwner, repoName] = (process.env.GITHUB_REPOSITORY ?? '').split('/')
  const commitHash = process.env.GITHUB_SHA ?? ''
  const actor = process.env.GITHUB_ACTOR ?? ''

  return {
    action,
    issueNumber,
    exitWithError,
    repoOwner,
    repoName,
    commitHash,
    actor
  }
}
