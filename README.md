# CC Applications

![GitHub Workflow Status (with event)](https://img.shields.io/github/actions/workflow/status/equinor/cc-components/fprd-deploy.yml?label=Prod%20deployment)
![GitHub Workflow Status (with event)](https://img.shields.io/github/actions/workflow/status/equinor/cc-components/pr-deploy.yml?label=PR%20deployment)
![GitHub issues](https://img.shields.io/github/issues/equinor/cc-components)
![GitHub pull requests](https://img.shields.io/github/issues-pr-raw/equinor/cc-components)
![SCM Compliance](https://scm-compliance-api.radix.equinor.com/repos/equinor/cc-components/badge)
![Known Vulnerabilities](https://snyk.io/test/github/equinor/cc-components/badge.svg)

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

Contributing, check out our [contributing guide](./CONTRIBUTING.md)

## Issues ✨

To submit an issue, use one of the predefined issue types in Github Issues.
Be sure to give good explanation and context in the issue description.

Submitted issues will be prioritized and followed up in our Github Projects.

## Project structure

For project structure and development we use NX' recommendations. In general, we want to place every util, component, business logic in a library, and keep the application clean. Read more about it [here](https://nx.dev/more-concepts/monorepo-nx-enterprise#using-nx-at-enterpriseshere).

> [!TIP]
> Download the NX extension in VSCode to get some better support for when creating a new library or app.

The following snippet provides a brief overview of how application code is structured within the repo.

```py
...
+-- github-action # Scripts for Github Actions
+-- apps # Configs for the different apps
|    +-- <appname>
|        +-- app.config.js # Configuration for (remote) test env
|        +-- app.config.local.js # Configuration for local env
+-- libs
|    +-- shared # Components and functionality shared between apps
|    +-- <appname>app # The code for the application
|    +-- <appname>shared # Code shared between the app and sidesheet
|    +-- <appname>sidesheet # The code for the sidesheet
+-- widgets # Code for stand-alone widgets used in the apps
...
```

### Project organization

This project contains different apps, all related to Construction and Commission, except Scope Change Request. All the code that belongs to the apps can be found in the folders `apps` and `libs`. All the apps are located in both `apps` and `libs`.

Each app in `apps` only contains one file in `src`, main.tsx. This is the root-file for the app and contains the minimum of code, and are linked to the corresponding app in `libs`.

`libs` contains all the configurations, business logic and UI to each app.

In addition, common code that are used across multiple apps should be put inside the `shared` or `sharedcomponents` library. If it's a shared function that is calculating something or anything similar, then put it in `shared`, but if it's a component that is beeing used in multiple apps then put it in `sharedcomponents`, e.g. SidesheetSkeleton that is beeing used in multiple apps when loading the sidesheet.

Note: `sharedcomponents` was created a long time after `shared`, so `sharedcomponents` is not well updated and does only contain a few shared components at this time. Please keep placing shared resources in the correct folders.

### App structure

This chapter only refers to the `libs` folder.

Each app has three different folders. The naming convention for the three folders are `<appname>app`, `<appname>shared` and `<appname>sidesheet`, e.g. handoverapp, handovershared and handoversidesheet.

The `app` folder contains all the configurations, business logic and UI to the app, except the things that are related to the sidesheet.

The `shared` folder contains all shared code/resources that are used in both `app` and `sidesheet`. This will typically be different types and maybe some styling.

The `sidesheet` folder contains all the business logic and UI for the sidesheet.

### App config

All the apps are build up by the same components and configuration options. These options can be found in `\libs\<appname>app\src\lib\config\workspaceConfig.tsx`.

All the configuration options every app uses is filterOptions, gridOptions, gardenOptions, statusBarOptions, sidesheetOptions, powerBiOptions and workspaceOptions. Without the filterOptions you won't see any filters, without gridOptions you won't see any table, etc.

## CI/CD ⚙️

Check out our development workflow [here](./CONTRIBUTING.md)

> [!IMPORTANT]  
> Changes merged with main will be built and deployed to production without any additional approval steps.

We continously build, test and verify all PRs submitted to GitHub.

Our applications are hosted in Fusion. Most of our apps are bootstrapped into the [Fusion Project Portal](https://project.fusion.equinor.com). We have configured CI/CD pipelines to automatically deploy our app bundles to the [Fusion app management api](https://fusion-s-portal-fprd.azurewebsites.net/swagger) whenever there is a change in the code.

We have made github actions pipelines relying on TS code written in our repository. This code is being transpiled on the fly to avoid the hassle of uploading bundled js.
The pipelines are located in the `./github/workflows` folder

**The following environments are availible:**

- [🧪 Test environment](https://webserver-fusion-project-portal-test.radix.equinor.com/)
- [🏭 Production environment](https://project.fusion.equinor.com/)

**The following manual deployment actions are availible:**

- [Manual deployment to test](https://github.com/equinor/cc-components/actions/workflows/manual-deploy.yml)
- [Manual deployment to production](https://github.com/equinor/cc-components/actions/workflows/manual-deploy-prod.yml)

## Creating new apps 🚀

1. Run the following [action](https://github.com/equinor/cc-components/actions/workflows/create-fusion-app.yml) to create and register the app with the fusion portal.
2. Create the app locally in CC-components. Run the following command `pnpm new:app` or `pnpm new:report`
3. To deploy the app to test, run this [action](https://github.com/equinor/cc-components/actions/workflows/manual-deploy.yml)
4. Follow the [guide](https://github.com/equinor/lighthouse/blob/main/docs/project-portal/administration.md) to onboard the app to the project portal.
   [HMR](https://webpack.js.org/guides/hot-module-replacement/) does not work. To apply changes stop the server and run `pnpm serve <app>`
   HMR is disabled due to an error in dependency resolution resulting in massive bundle sizes

## Environment variables

We have some app configuration files in the `apps/**` folder. These are for local development.
The permissions for modifying environment variables are given to personal accounts or service principals. We do have a service principal for deployment, but editing environment variables are done manually by developers.

- [CI](https://admin.ci.fusion-dev.net/apps)
- ~[FQA](https://admin.fqa.fusion-dev.net/apps)~ (Not in use for us)
- [FPRD](https://admin.fprd.fusion-dev.net/apps)

## Onboarding new apps 🔩

Apps has to be *onboarded* onto a context in order to be availible for end users. Use the [Onboard app to Fusion Project Portal](https://github.com/equinor/cc-components/actions/workflows/onboard-app-fpp.yml) to onboard an app to a new context. Context ids can be found by selecting the context in the portal, then copying the GUID in the url or by using the Fusion API.

> [!NOTE]  
> Context ids vary from different environments (they are different in test and prod)

## Hosting environments (subject to change)

- [Fusion Project Portal](https://project.fusion.equinor.com)
- [Fusion Classic](https://fusion.equinor.com) (Not here yet)
- [Johan Castberg portal](https://jc.fusion.equinor.com)

## Fusion framework

They way we bundle our applications makes it so that they can be used in any Fusion Portal. By utilzing the [Fusion Framework](https://github.com/equinor/fusion-framework) we allow for communication between the portal and the application. Our applications do not have an index.html but rather exposes a mount function that the portal can call when dynamically importing our bundle.
You can read more about the fusion framework [here](https://equinor.github.io/fusion-framework)
