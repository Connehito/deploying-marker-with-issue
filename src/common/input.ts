import * as core from '@actions/core'
import {getUser} from '../github/user-get'
import {getEnvVar} from './env'

export interface Input {
  action: string
  issueNumber: number
  exitWithError: boolean
  repoOwner: string
  repoName: string
  actor: string
  actorId: string | null
}

const IgnoreActors = ['dependabot[bot]']

export const getInput = async (): Promise<Input> => {
  const action = core.getInput('action', {required: true})
  const issueNumber = parseInt(
    core.getInput('issue-number', {required: true}),
    10
  )
  const exitWithError = core.getBooleanInput('exit-with-error', {
    required: false
  })

  // https://docs.github.com/en/actions/learn-github-actions/environment-variables
  const [repoOwner, repoName] = getEnvVar('GITHUB_REPOSITORY').split('/')
  const actor = getEnvVar('GITHUB_ACTOR')
  const actorId = IgnoreActors.includes(actor)
    ? null
    : (await getUser({login: actor})).data.user.id

  return {
    action,
    issueNumber,
    exitWithError,
    repoOwner,
    repoName,
    actor,
    actorId
  }
}
