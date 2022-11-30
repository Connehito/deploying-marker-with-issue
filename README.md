# deploying-marker-with-issue

[![Check dist/](https://github.com/Connehito/deploying-marker-with-issue/actions/workflows/check-dist.yml/badge.svg)](https://github.com/Connehito/deploying-marker-with-issue/actions/workflows/check-dist.yml)
[![CodeQL](https://github.com/Connehito/deploying-marker-with-issue/actions/workflows/codeql-analysis.yml/badge.svg)](https://github.com/Connehito/deploying-marker-with-issue/actions/workflows/codeql-analysis.yml)
[![example](https://github.com/Connehito/deploying-marker-with-issue/actions/workflows/example.yml/badge.svg)](https://github.com/Connehito/deploying-marker-with-issue/actions/workflows/example.yml)

This action checks, attaches and detaches the "Deploying" label of GitHub Issue that indicating the deployment status.

## How to Use

### Example workflow and issue

- Workflow: [.github/workflows/example.yml](https://github.com/Connehito/deploying-marker-with-issue/blob/main/.github/workflows/example.yml)
- Issue: [#28](https://github.com/Connehito/deploying-marker-with-issue/issues/28)

### Permission

`deploying-marker-with-issue` needs `issue: write` permission.

```yaml
permissions:
  issues: write
```

Ref: [Assigning permissions to jobs - GitHub Docs](https://docs.github.com/en/actions/using-jobs/assigning-permissions-to-jobs)

### 1. Check marker detached

Checks the Issue has not `Deploying` label.
If the Issue already has `Deploying` label and specified `exit-with-error: true`, an error is raised.
For example, you want to check another deployment is not in progress.

```yaml
- uses: Connehito/deploying-marker-with-issue@v2
  env:
    GITHUB_TOKEN: ${{ github.token }}
  with:
    action: "check-marker-detached"
    issue-number: ${{ env.DEPLOYMENT_RECORD_ISSUE_NUMBER }}
    exit-with-error: true # true = exit with error when the marker is already exists
```

### 2. Attach marker

Attach `Deploying` label to the Issue.
If the Issue already has `Deploying` label and specified `exit-with-error: true`, an error is raised.
It is intended to be used at the start of a deployment.

```yaml
- uses: Connehito/deploying-marker-with-issue@v2
  env:
    GITHUB_TOKEN: ${{ github.token }}
  with:
    action: "attach-marker"
    issue-number: ${{ env.DEPLOYMENT_RECORD_ISSUE_NUMBER }}
    exit-with-error: true # true = exit with error when the marker is already exists
```

### 3. Check marker attached

Checks the Issue has `Deploying` label.
If the Issue has not `Deploying` label and specified `exit-with-error: true`, an error is raised.
For example, you can use to check `Deployment` label has not detached.

```yaml
- uses: Connehito/deploying-marker-with-issue@v2
  env:
    GITHUB_TOKEN: ${{ github.token }}
  with:
    action: "check-marker-attached"
    issue-number: ${{ env.DEPLOYMENT_RECORD_ISSUE_NUMBER }}
    exit-with-error: false # true = exit with error when the marker is not exists
```

### 4. Detach marker

Detach `Deploying` label to the Issue.
If the Issue has not `Deploying` label and specified `exit-with-error: true`, an error is raised.
It is intended to be used at the end of a deployment.

```yaml
- uses: Connehito/deploying-marker-with-issue@v2
  env:
    GITHUB_TOKEN: ${{ github.token }}
  with:
    action: "detach-marker"
    issue-number: ${{ env.DEPLOYMENT_RECORD_ISSUE_NUMBER }}
    exit-with-error: false # true = exit with error when the marker is not exists
```
