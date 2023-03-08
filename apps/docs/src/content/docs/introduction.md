---
title: "Introduction"
description: "Docs intro"
---
## Getting started
CC Components is a collection of Construction and Commissioning applications, UI components and utilities. Applications are heavily based on [Fusion Workspace](https://github.com/equinor/fusion-workspace) and [Fusion Framework](https://github.com/equinor/fusion-framework). It is recommended to read their documentation [here](https://equinor.github.io/fusion-workspace/introduction/) and [here](https://equinor.github.io/fusion-framework/).
To view some of the common components used in the different applications, go to the [storybook](https://equinor.github.io/cc-components/).
CC applications that belong in this repository are:
* [Activities](https://github.com/equinor/cc-components/tree/main/apps/activities)
* [CCOverview](https://github.com/equinor/cc-components/tree/main/apps/ccoverview)
* [Checklist](https://github.com/equinor/cc-components/tree/main/apps/checklist)
* [Commissioning Task](https://github.com/equinor/cc-components/tree/main/apps/commissioningtask)
* [Handover](https://github.com/equinor/cc-components/tree/main/apps/handover)
* [JCA Installation](https://github.com/equinor/cc-components/tree/main/apps/jcainstallation)
* [JCA Spools](https://github.com/equinor/cc-components/tree/main/apps/jcaspools)
* [JCA Work preparation](https://github.com/equinor/cc-components/tree/main/apps/jcaworkpreparation)
* [Loop](https://github.com/equinor/cc-components/tree/main/apps/loop)
* [Mechanical Completion](https://github.com/equinor/cc-components/tree/main/apps/mechanicalcompletion)
* [Preservation Analytics](https://github.com/equinor/cc-components/tree/main/apps/preservationanalytics)
* [Punch](https://github.com/equinor/cc-components/tree/main/apps/punch)
* [Query](https://github.com/equinor/cc-components/tree/main/apps/query)
* [SWCR](https://github.com/equinor/cc-components/tree/main/apps/swcr)
* [Workorder](https://github.com/equinor/cc-components/tree/main/apps/workorder)

## Installation
To get started using CC components, clone the repo, `git clone https://github.com/equinor/cc-components.git`, and install [Node](https://nodejs.org/en/) (Storybook and Node 18 has some issues, so version 16.x of Node is recommended) and use npm for this project. After cloning the repo, install the project's dependencies and required tooling with `npm run install:init`. This will install all the project's dependencies as well as NX and fusion-framework-cli globally.
