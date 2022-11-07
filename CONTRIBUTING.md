# Contributing
For project structure and development we use NX' recommendations. In general, we want to place every util, component, business logic in a library, and keep the application clean. Read more about it [here](https://nx.dev/more-concepts/monorepo-nx-enterprise#using-nx-at-enterpriseshere): Download the NX extension in VSCode to get some better support for when creating a new library or app.
## Library
Each application will have a corresponding library placed under the `libs` folder. In addition, common code should be put inside the `shared` library.
The naming convention for a app library should be `<appname>app` i.e. `handoverapp`. An app library contains specific utilities, components and configuration for the application. An app library cannot import modules from other app libraries and an app cannot import modules from a different app library than its own.
If there are common modules across libraries/apps, then it should probably be put under the `shared` library where everyone can consume from.
