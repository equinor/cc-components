# CC Applications

## Strategy

[Trunk based development](https://trunkbaseddevelopment.com/)

[Conventional commits](https://www.conventionalcommits.org/en/v1.0.0/)

[Continous Integration](https://trunkbaseddevelopment.com/continuous-integration/)

[Continous Delivery](https://trunkbaseddevelopment.com/continuous-delivery/)

## Getting started

Run the following command `npm run first-time-setup`
To run an app run the following command `pnpm serve <appname>`

## Deployment

CI -> (Create) PR with label QA/UAT

PROD -> Merge on main

## Creating a new Fusion app

1. Create the app in [Fusion CI](https://admin.ci.fusion-dev.net/apps) & [Fusion PROD](https://admin.fprd.fusion-dev.net/apps) NB!! enable the `hide` option
2. Add the Service principal as admin on the app for CI/CD to work [In both Fusion CI and Fusion PROD].
3. Create the app locally in CC-components, run the following command `pnpm new:app` or `pnpm new:report`
4. Create a PR and label it QA/UAT (Action will run and deploy the app to CI)
5. Onboard the app to the project portal

## Development

[HMR](https://webpack.js.org/guides/hot-module-replacement/) does not work. To apply changes stop the server and run `pnpm serve <app>`
HMR is disabled due to an error in dependency resolution resulting in massive bundle sizes

## Apps

| Key                                                                                                                         | Display name            | Production           | Halt reason                         |
| --------------------------------------------------------------------------------------------------------------------------- | ----------------------- | -------------------- | ----------------------------------- |
| [handover](https://github.com/equinor/cc-components/blob/main/apps/handover/README.md)                                      | handover                | Temporarily disabled | Paused due to serverside migration. |
| [loop](https://github.com/equinor/cc-components/blob/main/apps/loop/README.md)                                              | loop                    | Yes                  |                                     |
| [mechanical-completion](https://github.com/equinor/cc-components/blob/main/apps/mechanicalcompletion/README.md)             | Mechanical completion   | Yes                  |                                     |
| [punch](https://github.com/equinor/cc-components/blob/main/apps/punch/README.md)                                            | punch                   | Yes                  |                                     |
| [scopechangerequest](https://github.com/equinor/cc-components/blob/main/apps/scopechangerequest/README.md)                  | scopechangerequest      | Temporarily disabled |                                     |
| [swcr](https://github.com/equinor/cc-components/blob/main/apps/swcr/README.md)                                              | SWCR                    | Yes                  |                                     |
| [workorder](https://github.com/equinor/cc-components/blob/main/apps/workorder/README.md)                                    | workorder               | Yes                  |                                     |
| [activities](https://github.com/equinor/cc-components/blob/main/reports/activities/README.md)                               | activities              | Yes                  |                                     |
| [atexinspection](https://github.com/equinor/cc-components/blob/main/reports/atexinspection/README.md)                       | Atex inspection         | Yes                  |                                     |
| [ccoverview](https://github.com/equinor/cc-components/blob/main/reports/ccoverview/README.md)                               | CC overview             | Yes                  |                                     |
| [checklist](https://github.com/equinor/cc-components/blob/main/reports/checklist/README.md)                                 | checklist               | Yes                  |                                     |
| [commissioning-task](https://github.com/equinor/cc-components/blob/main/reports/commissioningtask/README.md)                | Commissioning task      | Yes                  |                                     |
| [jca-installation](https://github.com/equinor/cc-components/blob/main/reports/JCA-reports/jcainstallation/README.md)        | Installation            | Temporarily disabled |                                     |
| [jca-progress-summary](https://github.com/equinor/cc-components/blob/main/reports/JCA-reports/jcaprogresssummary/README.md) | Progress summary        | Temporarily disabled |                                     |
| [jca-spools](https://github.com/equinor/cc-components/blob/main/reports/JCA-reports/jcaspools/README.md)                    | Spools                  | Temporarily disabled |                                     |
| [jca-work-preparation](https://github.com/equinor/cc-components/blob/main/reports/JCA-reports/jcaworkpreparation/README.md) | Work Preparation        | Temporarily disabled |                                     |
| [preservation-workspace](https://github.com/equinor/cc-components/blob/main/reports/preservationanalytics/README.md)        | Preservation            | Temporarily disabled |                                     |
| [projectsafetybarriers](https://github.com/equinor/cc-components/blob/main/reports/projectsafetybarriers/README.md)         | Project Safety Barriers | Yes                  |                                     |
| [query-workspace](https://github.com/equinor/cc-components/blob/main/reports/query/README.md)                               | Query workspace         | Temporarily disabled |                                     |
| [schedule-viewer](https://github.com/equinor/cc-components/blob/main/reports/schedule-viewer/README.md)                     | Schedule viewer         | Temporarily disabled |                                     |
| [tags](https://github.com/equinor/cc-components/blob/main/reports/tags/README.md)                                           | tags                    | Yes                  |                                     |
