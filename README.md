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

# NX
This project uses NX as its build tool. Download the NX extension in VSCode to get some better support for when creating new libraries and apps.
To build a library or app use the command `nx run <name>:build`, to serve an app use the command `nx run <name>:serve`.


# Contributing
For project structure and development we use NX' recommendations. In general, we want to place every util, component, business logic in a library, and keep the application clean. Read more about it [here](https://nx.dev/more-concepts/monorepo-nx-enterprise#using-nx-at-enterpriseshere): Download the NX extension in VSCode to get some better support for when creating a new library or app.
## Library
Each application will have a corresponding library placed under the `libs` folder. In addition, common code should be put inside the `shared` library.
The naming convention for a app library should be `<appname>app` i.e. `handoverapp`. An app library contains specific utilities, components and configuration for the application. An app library cannot import modules from other app libraries and an app cannot import modules from a different app library than its own.
If there are common modules across libraries/apps, then it should probably be put under the `shared` library where everyone can consume from.
