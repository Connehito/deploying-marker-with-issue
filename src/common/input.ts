import * as core from '@actions/core'

export interface Input {
  action: string
  issueNumber: number
  exitWithError: boolean
  repoOwner: string
  repoName: string
  ref: string
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
  const ref = getRef()
  const actor = process.env.GITHUB_ACTOR ?? ''

  return {
    action,
    issueNumber,
    exitWithError,
    repoOwner,
    repoName,
    ref,
    actor
  }
}

const getRef = (): string => {
  // https://docs.github.com/en/actions/learn-github-actions/environment-variables
  const refType = process.env.GITHUB_REF_TYPE
  switch (refType) {
    case 'branch':
      return process.env.GITHUB_SHA ?? ''
    case 'tag':
      return (process.env.GITHUB_REF ?? '').replace('refs/tags/', '')
    default:
      throw new Error(`Unknown ref type: ${refType}`)
  }
}
