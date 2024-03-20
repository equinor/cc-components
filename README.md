# CC Applications

![GitHub Workflow Status (with event)](https://img.shields.io/github/actions/workflow/status/equinor/cc-components/fprd-deploy.yml?label=Prod%20deployment)
![GitHub Workflow Status (with event)](https://img.shields.io/github/actions/workflow/status/equinor/cc-components/pr-deploy.yml?label=PR%20deployment)

[Fusion app status🚀](https://github.com/equinor/cc-components/issues/693)

## Technology stack

[React](https://react.dev/)

[Turbo](https://turbo.build/)

[Typescript](https://www.typescriptlang.org/)

[Vite](https://vitejs.dev/)

[PNPM](https://pnpm.io/)

## Strategy

[Trunk based development](https://trunkbaseddevelopment.com/)

[Conventional commits](https://www.conventionalcommits.org/en/v1.0.0/)

[Continous Integration](https://trunkbaseddevelopment.com/continuous-integration/)

[Continous Delivery](https://trunkbaseddevelopment.com/continuous-delivery/)

## Getting started

### tldr;

```
pnpm first-time-setup //install pnpm, fusion-framework, vite and build repo
pnpm serve <appname> //run app
pnpm serve:local <appname> //run app pointing to local api
pnpm build //Build monorepo in parallel NBNB: Sometimes fails due to internal package dependencies
pnpm ci:build //Build sequentially
```

Run the following command `npm run first-time-setup`
To run an app run the following command `pnpm serve <appname>`

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


## Fusion app management

Our applications are hosted in Fusion. Most of our apps are bootstrapped into the [Fusion Project Portal](https://project.fusion.equinor.com)

## Api
We have configured CI/CD pipelines to automatically deploy these bundles to the [Fusion app management api](https://fusion-s-portal-fprd.azurewebsites.net/swagger) whenever there is a change in the code.

## CI/CD 
We have made github actions pipelines relying on TS code written in our repository. This code is being transpiled on the fly to avoid the hassle of uploading bundled js.
They are located in the `./github/workflows` folder

## Environment variables
We have some app configuration files in the `apps/**` folder. These are for local development. 
The permissions for modifying environment variables are given to personal accounts or service principals. We do have a service principal for deployment, but editing environment variables are done manually by developers.
- [CI](https://admin.ci.fusion-dev.net/apps)
- ~[FQA](https://admin.fqa.fusion-dev.net/apps)~ (Not in use for us)
- [FPRD](https://admin.fprd.fusion-dev.net/apps)

## Hosting environments (subject to change) 
[Fusion Project Portal](https://project.fusion.equinor.com)

[Fusion Classic](https://fusion.equinor.com) (Not here yet)

[Johan Castberg portal](https://jc.fusion.equinor.com)

## Fusion framework
They way we bundle our applications makes it so that they can be used in any Fusion Portal. By utilzing the [Fusion Framework](https://github.com/equinor/fusion-framework) we allow for communication between the portal and the application. Our applications do not have an index.html but rather exposes a mount function that the portal can call when dynamically importing our bundle.
You can read more about the fusion framework [here](https://equinor.github.io/fusion-framework)
