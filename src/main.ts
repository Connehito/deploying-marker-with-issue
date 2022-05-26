import * as core from '@actions/core'

async function run(): Promise<void> {
  try {
    const action = core.getInput('action')
    const issueNumber = parseInt(core.getInput('issue-number'), 10)

    core.debug(`DEBUG: ${JSON.stringify({action, issueNumber})}`)
  } catch (error) {
    if (error instanceof Error) {
      core.setFailed(error.message)
    }
  }
}

run()
