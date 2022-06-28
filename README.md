# deploying-marker-with-issue

[![Check dist/](https://github.com/Connehito/deploying-marker-with-issue/actions/workflows/check-dist.yml/badge.svg)](https://github.com/Connehito/deploying-marker-with-issue/actions/workflows/check-dist.yml)
[![CodeQL](https://github.com/Connehito/deploying-marker-with-issue/actions/workflows/codeql-analysis.yml/badge.svg)](https://github.com/Connehito/deploying-marker-with-issue/actions/workflows/codeql-analysis.yml)
[![example](https://github.com/Connehito/deploying-marker-with-issue/actions/workflows/example.yml/badge.svg)](https://github.com/Connehito/deploying-marker-with-issue/actions/workflows/example.yml)

This action checks, attaches and detaches the "Deploying" label of GitHub Issue that indicating the deployment status.

## How to Use

### Example workflow and issue

- Workflow: [.github/workflows/example.yml](https://github.com/Connehito/deploying-marker-with-issue/blob/main/.github/workflows/example.yml)
- Issue: [#21](https://github.com/Connehito/deploying-marker-with-issue/issues/21)

### 1. Check marker detached

Checks the Issue has not `Deploying` label.
If the Issue already has `Deploying` label and specified `exit-with-error: true`, an error is raised.
For example, you want to check another deployment is not in progress.

```yaml
- uses: Connehito/deploying-marker-with-issue@v1
  env:
    GITHUB_TOKEN: ${{ github.token }}
  with:
    action: "check-marker-detached"
    issue-number: 21
    exit-with-error: true # true = exit with error when the marker is not found
```

### 2. Attach marker

Attach `Deploying` label to the Issue.
If the Issue already has `Deploying` label and specified `exit-with-error: true`, an error is raised.
It is intended to be used at the start of a deployment.

```yaml
- uses: Connehito/deploying-marker-with-issue@v1
  env:
    GITHUB_TOKEN: ${{ github.token }}
  with:
    action: "attach-marker"
    issue-number: 21
    exit-with-error: true # true = exit with error when the marker is already exists
```

### 3. Check marker attached

Checks the Issue has `Deploying` label.
If the Issue has not `Deploying` label and specified `exit-with-error: true`, an error is raised.
For example, you can use to check `Deployment` label has not detached.

```yaml
- uses: Connehito/deploying-marker-with-issue@v1
  env:
    GITHUB_TOKEN: ${{ github.token }}
  with:
    action: "check-marker-attached"
    issue-number: 21
    exit-with-error: true # true = exit with error when the marker is found
```

### 4. Detach marker

Detach `Deploying` label to the Issue.
If the Issue has not `Deploying` label and specified `exit-with-error: true`, an error is raised.
It is intended to be used at the end of a deployment.

```yaml
- uses: Connehito/deploying-marker-with-issue@v1
  env:
    GITHUB_TOKEN: ${{ github.token }}
  with:
    action: "detach-marker"
    issue-number: 21
    exit-with-error: false # true = exit with error when the marker is not exists
```

<!--

---

# Create a JavaScript Action using TypeScript

Use this template to bootstrap the creation of a TypeScript action.:rocket:

This template includes compilation support, tests, a validation workflow, publishing, and versioning guidance.  

If you are new, there's also a simpler introduction.  See the [Hello World JavaScript Action](https://github.com/actions/hello-world-javascript-action)

## Create an action from this template

Click the `Use this Template` and provide the new repo details for your action

## Code in Main

> First, you'll need to have a reasonably modern version of `node` handy. This won't work with versions older than 9, for instance.

Install the dependencies  
```bash
$ npm install
```

Build the typescript and package it for distribution
```bash
$ npm run build && npm run package
```

Run the tests :heavy_check_mark:  
```bash
$ npm test

 PASS  ./index.test.js
  ✓ throws invalid number (3ms)
  ✓ wait 500 ms (504ms)
  ✓ test runs (95ms)

...
```

## Change action.yml

The action.yml defines the inputs and output for your action.

Update the action.yml with your name, description, inputs and outputs for your action.

See the [documentation](https://help.github.com/en/articles/metadata-syntax-for-github-actions)

## Change the Code

Most toolkit and CI/CD operations involve async operations so the action is run in an async function.

```javascript
import * as core from '@actions/core';
...

async function run() {
  try { 
      ...
  } 
  catch (error) {
    core.setFailed(error.message);
  }
}

run()
```

See the [toolkit documentation](https://github.com/actions/toolkit/blob/master/README.md#packages) for the various packages.

## Publish to a distribution branch

Actions are run from GitHub repos so we will checkin the packed dist folder. 

Then run [ncc](https://github.com/zeit/ncc) and push the results:
```bash
$ npm run package
$ git add dist
$ git commit -a -m "prod dependencies"
$ git push origin releases/v1
```

Note: We recommend using the `--license` option for ncc, which will create a license file for all of the production node modules used in your project.

Your action is now published! :rocket: 

See the [versioning documentation](https://github.com/actions/toolkit/blob/master/docs/action-versioning.md)

## Validate

You can now validate the action by referencing `./` in a workflow in your repo (see [test.yml](.github/workflows/test.yml))

```yaml
uses: ./
with:
  milliseconds: 1000
```

See the [actions tab](https://github.com/actions/typescript-action/actions) for runs of this action! :rocket:

## Usage:

After testing you can [create a v1 tag](https://github.com/actions/toolkit/blob/master/docs/action-versioning.md) to reference the stable and latest V1 action

-->
