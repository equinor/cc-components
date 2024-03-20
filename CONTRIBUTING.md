# Contributing

This repo uses [Trunk based development](https://trunkbaseddevelopment.com/) along with [Conventional commits](https://www.conventionalcommits.org/en/v1.0.0/). When making contributions follow this checklist:

- Ensure you have created an issue in Github Issues
- Create a new feature branch from the `main` branch
- Implement
- Submit a draft PR
- Perform a self-review of your code and ensure all CI is run before submitting the PR for approval.


## Structuring the code

Each application will have a corresponding library placed under the `libs` folder. In addition, common code should be put inside the `shared` library.

The naming convention for a app library should be `<appname>app` i.e. `handoverapp`. An app library contains specific utilities, components and configuration for the application.

An app library cannot import modules from other app libraries and an app cannot import modules from a different app library than its own.
If there are common modules across libraries/apps, then it should probably be put under the `shared` library where everyone can consume from.

## How we work

The following chart describes the development workflow for the lighouse team.

```mermaid
flowchart TB

    main[main]
    develop[Develop feature]
    create-draft-pr[\Create draft PR/]

    subgraph loop[Build, test & verify]
        improve[Make improvements]
        build[Build, test and verify]
        deploy-to-test[\Deploy to test/]
        uat{End user \n testing}
        update-pr[Set PR as ready]
        code-review{Request \n Code review}
    end

    merge[\Squash and merge with main/]
    deploy[Build & deploy]

    main -- Create new branch \n feature/branch-name --> develop
    develop -- Push to repo --> create-draft-pr
    create-draft-pr --> build
    build --> deploy-to-test
    deploy-to-test --> uat
    uat -- Not accepted --> improve
    uat -- Accepted / not required --> update-pr
    update-pr -- Request reviewers --> code-review
    code-review -- Not approved --> improve
    code-review -- Approved --> merge
    merge --> deploy
    improve --> build

    deploy-to-test -. Run via Github Actions .-> test-env
    deploy -. Run via Github Actions .-> prod-env


    test-env([Test environment])
    prod-env([Prod environment])
```
