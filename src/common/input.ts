import * as core from '@actions/core'

export interface Input {
  action: string
  issueNumber: number
  exitWithError: boolean
  repoOwner: string
  repoName: string
  refLink: string
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
  const refLink = getRefLink(repoOwner, repoName)
  const actor = process.env.GITHUB_ACTOR ?? ''

  return {
    action,
    issueNumber,
    exitWithError,
    repoOwner,
    repoName,
    refLink,
    actor
  }
}

const getRefLink = (repoOwner: string, repoName: string): string => {
  // https://docs.github.com/en/actions/learn-github-actions/environment-variables
  const refType = process.env.GITHUB_REF_TYPE
  const commitHash = process.env.GITHUB_SHA ?? ''
  const shortHash = commitHash.slice(0, 8)
  const tagName = (process.env.GITHUB_REF ?? '').replace('refs/tags/', '')
  switch (refType) {
    case 'branch':
      return `[${shortHash}](https://github.com/${repoOwner}/${repoName}/commit/${commitHash})`
    case 'tag':
      return `[${tagName}](https://github.com/${repoOwner}/${repoName}/releases/tag/${tagName})`
    default:
      throw new Error(`Unknown ref type: ${refType}`)
  }
}
