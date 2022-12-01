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
  actorId: string
}

export const getInput = async (): Promise<Input> => {
  const action = 'attach-marker' //core.getInput('action', {required: true})
  const issueNumber = 28 //parseInt( core.getInput('issue-number', {required: true}), 10 )
  const exitWithError = false // core.getBooleanInput('exit-with-error', { required: false })

  // https://docs.github.com/en/actions/learn-github-actions/environment-variables
  const [repoOwner, repoName] = ['Connehito', 'deploying-marker-with-issue'] // getEnvVar('GITHUB_REPOSITORY').split('/')
  const actor = 'mryhryki' // getEnvVar('GITHUB_ACTOR')
  const {id: actorId} = (await getUser({login: actor})).data.user

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
