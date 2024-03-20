# CC Applications
![GitHub Workflow Status (with event)](https://img.shields.io/github/actions/workflow/status/equinor/cc-components/fprd-deploy.yml?label=Prod%20deployment)
![GitHub Workflow Status (with event)](https://img.shields.io/github/actions/workflow/status/equinor/cc-components/pr-deploy.yml?label=PR%20deployment)
![SCM Compliance](https://scm-compliance-api.radix.equinor.com/repos/equinor/cc-components/badge)

Construction and Commisioning (CC) web applications developed for the Project Portal. This repo is a monorepo using [Turbo](https://turbo.build/) and [PNPM](https://pnpm.io/). Applications are developed using [React](https://react.dev/), [Typescript](https://www.typescriptlang.org/) and [Vite](https://vitejs.dev/).

> For a overview over status on planned and implemented applications, check out the overview [here 🚀](https://github.com/equinor/cc-components/issues/693)

## Getting started 🚀

To install the dependencies required to run the project, run `pnpm first-time-setup`. You can then run one of the apps using one of the following commands:

```bash
pnpm serve <appname> # run app
pnpm serve:local <appname> # run app pointing to local api
pnpm build # Build monorepo in parallel 🚨 NB: Sometimes fails due to internal package dependencies
pnpm ci:build # Build sequentially
```

⚠️ [Hot module replacement](https://webpack.js.org/guides/hot-module-replacement/) is disabled due to an error in dependency resolution resulting in massive bundle sizes. To apply changes stop the server and run `pnpm serve <app>`.

🛡️ In order to login to the apps you need to authenticate using an Equinor account with access to a valid context/project in ProCoSys.

## Contributing ⚒️

Check out our the [contributing guide](./CONTRIBUTING.md) for details on how to contribute.

## Issues ✨

To submit an issue, use one of the predefined issue types in Github Issues.
Be sure to give good explanation and context in the issue description.

Submitted issues will be prioritized and followed up in our Github Projects.

## CI/CD ⚙️

Check out our development workflow [here](TODO://provide-link-to-diagram)

> [!IMPORTANT]  
> Changes merged with main will be built and deployed to production without any additional approval steps.

We continously build, test and verify all PRs submitted to GitHub. (Using TruffleHog and Snyk)

**The following environments are availible:**

- [🧪 Test environment](https://webserver-fusion-project-portal-test.radix.equinor.com/)
- [🏭 Production environment](https://project.fusion.equinor.com/)

**The following manual deployment actions are availible:**

- [Manual deployment to test](https://github.com/equinor/cc-components/actions/workflows/manual-deploy.yml)
- [Manual deployment to production](https://github.com/equinor/cc-components/actions/workflows/manual-deploy-prod.yml)

## Project structure

For project structure and development we use NX' recommendations. In general, we want to place every util, component, business logic in a library, and keep the application clean. Read more about it [here](https://nx.dev/more-concepts/monorepo-nx-enterprise#using-nx-at-enterpriseshere).

> [!TIP]
> Download the NX extension in VSCode to get some better support for when creating a new library or app.

The following snippet provides a brief overview of how application code is structured within the repo.

```js
...
+-- github-action // Scripts for Github Actions
+-- apps // Configs for the different apps
|    +-- <appname>
|        +-- app.config.js // Configuration for (remote) test env
|        +-- app.config.local.js // Configuration for local env
+-- libs
|    +-- shared // Components and functionality shared between apps
|    +-- <appname>app // The code for the application
|    +-- <appname>shared // Code shared between the app and sidesheet
|    +-- <appname>sidesheet // The code for the sidesheet
+-- widgets // Code for stand-alone widgets used in the apps
...
```

## Creating new apps

1. Run the following [action](https://github.com/equinor/cc-components/actions/workflows/create-fusion-app.yml) to create and register the app with the fusion portal.
2. Create the app locally in CC-components. Run the following command `pnpm new:app` or `pnpm new:report`
3. To deploy the app to test, run this [action](https://github.com/equinor/cc-components/actions/workflows/manual-deploy.yml)
4. Follow the [guide](https://github.com/equinor/lighthouse/blob/main/docs/project-portal/administration.md) to onboard the app to the project portal.
