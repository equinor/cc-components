# CC components and workspaces
Repository for CC applications/workspaces and common components and utilities.
CC applications that belong in this repository are:
* Handover
* Mechanical Completion
* Workorder
* SWCR
* Loop
* Punch
* Heat Trace
* Release Control

Each application will have its own library where every component, util and config is placed under. Common components and utilities should be placed in the `shared` library.

# TLDR
* `nx generate @cc-components/plugins:fusion-app-generator <name>` For generating new applications
* `nx generate @cc-components/plugins:app-library <name>` For generating new libraries

# Setup
Install Node LTS and use npm for this project. After cloning the repo, install the project's dependencies and required tooling with `npm run install:init`. This will install all the project's dependencies as well as NX and fusion-framework-cli globally.
# NX
This project uses NX as its build tool. Download the NX extension (called Nx Console) in VSCode to get some better support for when creating new libraries and apps.
To build a library or app download the nx npm package globally (npm i nx -g), and use the command `nx run <name>:build`, to serve an app use the command `nx run <name>:serve`. `<name>` can be loop, handover, swcr etc..


# Contributing
For project structure and development we use NX' recommendations. In general, we want to place every util, component, business logic in a library, and keep the application clean. Read more about it [here](https://nx.dev/more-concepts/monorepo-nx-enterprise#using-nx-at-enterpriseshere): Download the NX extension in VSCode to get some better support for when creating a new library or app.

## Creating a new application
If you want to create a new application, use the NX extension and select `generate`. You will be prompted with a menu of different choices of what to create. Choose `@cc-components/plugins - fusion-app-generator`. The only input you usually want to edit is the "Name" input. Choose an appropriate name for the application and press "Run". This will generate a template of how fusion apps are setup. 

If you need to specify more inputs, you should be using `@nrwl/react - application` instead of `@cc-components/plugins - fusion-app-generator`.
There will be different inputs where you decide the name of the application, the bundler and compiler to use, if you want testing etc.
The usual inputs that are given are:
* name
* style (styled-component)
* bundler (doesn't matter for application, we will use fusion-framework later on)
* compiler (babel)
* e2eTestRunner (none)
* linter (eslint)
* unitTestRunner (none.. at the moment)

## Library
Each application will have a corresponding library placed under the `libs` folder. In addition, common code should be put inside the `shared` library.
The naming convention for an app library should be `<appname>app` i.e. `handoverapp`. An app library contains specific utilities, components and configuration for the application. An app library cannot import modules from other app libraries and an app cannot import modules from a different app library than its own.
If there are common modules across libraries/apps, then it should probably be put under the `shared` library where everyone can consume from.

### Creating a new library
To create a new library, follow the same steps as mentioned in the section about creating a new application, but this time you want to choose `@cc-components/plugins - app-library`. Choose an appropriate name for the library (see naming convention). 
