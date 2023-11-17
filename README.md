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

Run the following command `npm run first-time-setup`
To run an app run the following command `pnpm serve <appname>`

## Deployment

CI -> Comment on pr with 'deploy test', 

PROD -> Merge on main

## Creating a new Fusion app

1. Run the following [action](https://github.com/equinor/cc-components/actions/workflows/create-fusion-app.yml)
2. Create the app locally in CC-components, run the following command `pnpm new:app` or `pnpm new:report`
3. Run this [action](https://github.com/equinor/cc-components/actions/workflows/manual-deploy.yml) to deploy it to test 
4. Onboard the app to the project portal [HowTo](https://github.com/equinor/lighthouse/blob/main/docs/project-portal/administration.md)

## Development

[HMR](https://webpack.js.org/guides/hot-module-replacement/) does not work. To apply changes stop the server and run `pnpm serve <app>`
HMR is disabled due to an error in dependency resolution resulting in massive bundle sizes


