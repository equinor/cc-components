---
title: Getting started
description: Getting started developing your own applications and components
---

## Prerequisite
Before starting developing your own applications and components you should have an understanding of some NX functionalities. 

### Generator plugins
With NX as a development and build tool, it is possible to easily scaffold different projects based on your needs. If you want to scaffold a simple react application, you can write `nx g @nrwl/react:app <app-name>`. This will create a new folder in the `apps`-folder and add the basic files needed for a react application. The same goes for a new react library: `nx g @nrwl/react:lib <lib-name>`.
Since CC applications are heavily based on fusion-workspace and fusion-framework, there will be similarities and some boilerplate code between the different applications. To be efficient, we have created a custom plugin to generate what we call a "Fusion app". You can use the NX Console extension to see it (Open NX Console in the sidebar, click on "generate" inside the "GENERATE & RUN TARGET" section, search for "Fusion app generator") or you can use the terminal: `nx g @cc-components/plugins:fusion-app-generator --name=<app-name> --tags=<pbi or ws>`. This will scaffold a new application for you with a structure similar to this:
```
📦app-name
 ┣ 📂src
 ┃ ┗ 📜main.tsx
 ┣ 📜.eslintrc.json
 ┣ 📜CHANGELOG.md
 ┣ 📜README.md
 ┣ 📜app-manifest.json
 ┣ 📜package.json
 ┣ 📜project.json
 ┣ 📜tsconfig.app.json
 ┣ 📜tsconfig.json
 ┗ 📜vite.config.ts
```
You can also generate a library meant to support the newly created application with the command `nx g @cc-components/plugins:app-library --name=<app-lib-name>`. You can also use the UI from NX Console to generate this, like with the app generator. This will scaffold a new library for you with a structure similar to this:
```
📦app-library-name
 ┣ 📂src
 ┃ ┣ 📂lib
 ┃ ┃ ┣ 📂config
 ┃ ┃ ┃ ┣ 📜frameworkConfig.ts
 ┃ ┃ ┃ ┣ 📜index.ts
 ┃ ┃ ┃ ┗ 📜workspaceConfig.tsx
 ┃ ┃ ┗ 📜index.ts
 ┃ ┗ 📜index.ts
 ┣ 📜.eslintrc.json
 ┣ 📜README.md
 ┣ 📜package.json
 ┣ 📜project.json
 ┣ 📜tsconfig.json
 ┣ 📜tsconfig.lib.json
 ┗ 📜vite.config.ts
```

### Executor plugins
Executors are used to run commands for projects made with NX. They can be configured inside the project's `project.json` file. An executor can be called like this: `nx run <project-name>:<executor-name>`. Common use cases for executors are building, serving, linting and testing projects. For example: `nx run workorder:serve` will look into the workorder project, find the corresponding executor name inside `project.json` and run it.
