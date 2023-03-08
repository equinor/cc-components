---
title: "Project structure"
description: "How this project is structured"
---
## General
This project uses NX as its build tool. Download the NX extension (called Nx Console) in VSCode to get some better support for when creating new libraries and apps.
To build a library or an app download the nx npm package globally (npm i nx -g), and use the command `nx run <name>:build`. To serve an app use the command `nx run <name>:serve`. `<name>` can be loop, handover, swcr etc..

For project structure and development we use NX' recommendations. In general, we want to place every util, component, business logic in a library, and keep the application clean. Read more about it [here](https://nx.dev/more-concepts/monorepo-nx-enterprise#using-nx-at-enterpriseshere).

Each application will have its own library where every component, util and config is placed under. Some applications might have a separate 'app' (i.e. sidesheet) that requires some of the same types and components as the main application. Common components and utilities used across many projects should be placed in the `shared` library. 

An app library contains specific utilities, components and configuration for the application. It cannot import modules from other app libraries and an app cannot import modules from a different app library than its own.
If there are common modules across libraries/apps, then it should probably be put under the `shared` library where everyone can consume from.

An example of how the different projects can depend on each other can be viewed on the picture below.
[ ![Workorder dependencies](/wographexample.png) ](/wographexample.png)

## Integrated Repo
An integrated repo has several projects that depend on each other via normal import statements and there is only **one** package.json with external dependencies that all projects use. The alternative to intergated repo is a package-based repo where each project has its own package.json file and nested node_modules. To be as efficient as possible and ease the maintenance work, we will be using the integrated repo style for this project. Read more about it [here](https://nx.dev/concepts/integrated-vs-package-based).