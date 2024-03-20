# CC Applications
![GitHub Workflow Status (with event)](https://img.shields.io/github/actions/workflow/status/equinor/cc-components/fprd-deploy.yml?label=Prod%20deployment)
![GitHub Workflow Status (with event)](https://img.shields.io/github/actions/workflow/status/equinor/cc-components/pr-deploy.yml?label=PR%20deployment)
![SCM Compliance](https://scm-compliance-api.radix.equinor.com/repos/equinor/cc-components/badge)

Construction and Commisioning (CC) web applications developed for the project portal. 

We maintain a overview over planned and implemented applications [here 🚀](https://github.com/equinor/cc-components/issues/693)


This repo is a monorepo using [Turbo](https://turbo.build/). Applications are developed using [React](https://react.dev/), [Typescript](https://www.typescriptlang.org/) and [Vite](https://vitejs.dev/). We use [PNPM](https://pnpm.io/) as package manager.

## CI/CD

how to install and run, link to documentation, status badges, code samples, citations.

## Issues

To submit an issue, use one of the predefined issue types [here](https://github.com/equinor/cc-components/issues/new/choose). Be sure to fill

If the repository contains functional code, is there an issue handling system? (Github-issues, jira, trello, azure devops-board or similar?) If the issue handling is not in Github-issues (A good choice as it keeps issues close to the repo), README.md should link to where the issue-handling is managed.

Transparent processes are good. Keep the issue list and your Scrum- or Kanban board just as accessible and open for your colleagues as your repository.

## Contributing

Check out our the [contributing guide](./CONTRIBUTING.md) for details on how to contribute.


## Strategy

[Trunk based development](https://trunkbaseddevelopment.com/)

[Conventional commits](https://www.conventionalcommits.org/en/v1.0.0/)

## Getting started

```bash
pnpm first-time-setup # install pnpm, fusion-framework, vite and build repo
pnpm serve <appname> # run app
pnpm serve:local <appname> # run app pointing to local api
pnpm build # Build monorepo in parallel NBNB: Sometimes fails due to internal package dependencies
pnpm ci:build # Build sequentially
```
To run an app run the following command `pnpm serve <appname>`
Run the following command `npm run first-time-setup`


## Deployment

[Deploy PR to test env](https://github.com/equinor/cc-components/actions/workflows/manual-deploy.yml)

`PROD -> Automatically when merging to main`

[Manual prod deployment](https://github.com/equinor/cc-components/actions/workflows/manual-deploy-prod.yml)




## Creating a new Fusion app

1. Run the following [action](https://github.com/equinor/cc-components/actions/workflows/create-fusion-app.yml)
2. Create the app locally in CC-components, run the following command `pnpm new:app` or `pnpm new:report`
3. Run this [action](https://github.com/equinor/cc-components/actions/workflows/manual-deploy.yml) to deploy it to test
4. Onboard the app to the project portal [HowTo](https://github.com/equinor/lighthouse/blob/main/docs/project-portal/administration.md)

## Development

[HMR](https://webpack.js.org/guides/hot-module-replacement/) does not work. To apply changes stop the server and run `pnpm serve <app>`
HMR is disabled due to an error in dependency resolution resulting in massive bundle sizes
