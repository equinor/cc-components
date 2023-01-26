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
This project uses NX as its build tool. Download the NX extension (called Nx Console) in VSCode to get some better support for when creating new libraries and apps.
To build a library or app download the nx npm package globally (npm i nx -g), and use the command `nx run <name>:build`, to serve an app use the command `nx run <name>:serve`.


# Contributing
For project structure and development we use NX' recommendations. In general, we want to place every util, component, business logic in a library, and keep the application clean. Read more about it [here](https://nx.dev/more-concepts/monorepo-nx-enterprise#using-nx-at-enterpriseshere): Download the NX extension in VSCode to get some better support for when creating a new library or app.

## Creating a new application
If you want to create a new application, use the NX extension and select `generate`. You will be prompted with a menu of different choices of what to create. Choose `@nrwl/react - application`. There will be different inputs where you decide the name of the application, the bundler and compiler to use, if you want testing etc.
The usual inputs that are given are:
* name
* style (styled-component)
* bundler (doesn't matter for application, we will use fusion-framework later on)
* compiler (babel)
* e2eTestRunner (none)
* linter (eslint)
* unitTestRunner (none.. at the moment)
After everything is setup, press "Run", and the files and folders will be generated for you. Take a look at already existing applications for the fusion-framework setup.
At the root level of the newly created application, create a `app-manifest.json` file where you specify the name, short name, key and version of the application (this is based on what you named your application in Fusion). For example:
```json
{
  "name": "Workorder",
  "shortName": "workorder",
  "key": "workorder",
  "version": {
    "major": "0",
    "minor": "0",
    "patch": "4"
  }
}
```

You want to edit your project.json file so it uses fusion-framework CLI tool for serving the application. For example: 
```json
 "targets": {
    "serve": {
      "executor": "nx:run-commands",
      "options": {
        "cwd": "apps/workorder",
        "commands": [
          {
            "command": "fusion-framework-cli app dev"
          }
        ]
      }
    },
    "build": {
      "executor": "nx:run-commands",
      "options": {
        "cwd": "apps/workorder",
        "commands": [
          {
            "command": "tsc --noEmit"
          }
        ]
      }
    },
```

## Library
Each application will have a corresponding library placed under the `libs` folder. In addition, common code should be put inside the `shared` library.
The naming convention for a app library should be `<appname>app` i.e. `handoverapp`. An app library contains specific utilities, components and configuration for the application. An app library cannot import modules from other app libraries and an app cannot import modules from a different app library than its own.
If there are common modules across libraries/apps, then it should probably be put under the `shared` library where everyone can consume from.

### Creating a new library
To create a new library, follow the same steps as mentioned in the section about creating a new application, but this time you want to choose `@nrwl/react - library`. Choose styled-components for styling and  rollup as the bundler. 
