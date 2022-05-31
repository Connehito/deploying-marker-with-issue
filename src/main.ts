import * as core from '@actions/core'

async function run(): Promise<void> {
  try {
    const action = core.getInput('action', {required: true})
    const issueNumber = parseInt(
      core.getInput('issue-number', {required: true}),
      10
    )

    core.info(`DEBUG: ${JSON.stringify({action, issueNumber})}`)
  } catch (error) {
    if (error instanceof Error) {
      core.setFailed(error.message)
    }
  }
}

run()
