---
title: Creating an application
description: Documentation about creating a new application
---
This section will walk you through generating an example Fusion application.

> **__TLDR__**: The workflow in general will be: Bump version and changelog with `nx run <app-name>:version --reason=Reason for bumping`, bundle and zip the application with: `npm run build:spa`, deploy the app with `npm run deploy:spa`. 

## App generation
Our app will be called "Foo", it is going to use functionality from `fusion-workspace` and `fusion-framework` so we will use the custom NX plugins to scaffold new projects to do it as efficient as possible.
We start with creating the new application: `nx g @cc-components/plugins:fusion-app-generator --name=foo --tags=ws`. This will generate the following structure in our `apps`-folder:
```
📦foo
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
If we look inside `main.tsx` we find the following code:
```tsx
import { configure, WorkspaceWrapper } from '@cc-components/fooapp';
import { ComponentRenderArgs, makeComponent } from '@equinor/fusion-framework-react-app';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { NoContext } from '@cc-components/shared/common';
import { useContextId } from '@cc-components/shared/hooks';

const queryClient = new QueryClient();

const MyApp = () => {
  const contextId = useContextId();

  return (
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <div style={{ height: '100%', width: '100%', overflow: 'hidden' }}>
          {contextId ? <WorkspaceWrapper contextId={contextId} /> : <NoContext />}
        </div>
      </QueryClientProvider>
    </StrictMode>
  );
};

export default function render(el: HTMLElement, args: ComponentRenderArgs) {
  /** Create root from provided element */
  const root = createRoot(el);

  /** Make the app component
   * First argument is the main React component
   * Second argu is the the render args (framework and env variables)
   * Third argument is the configuration callback
   */
  const AppComponent = makeComponent(<MyApp />, args, configure);

  root.render(<AppComponent />);

  /** Teardown */
  return () => root.unmount();
}
```
Here we will encounter an import error from `@cc-components/fooapp`. This will be our app library we generate next. The app library will contain all of our business logic and setup for the new application to use. The application itself contains minimal logic and components because they will all come from either a shared project or the app library.

## Library generation
With our application created, it's time to generate the corresponding app library. We do this with the following command: `nx g @cc-components/plugins:app-library --name=fooapp`. This will generate the following structure:
```
📦fooapp
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
We now need to edit the `workspaceConfig.tsx` file to configure our Workspace for our new application. After giving it the correct configuration, we are ready to run the application by using the executor: `nx run foo:serve`.

## Releasing our application
When the application is ready to be released, we will use `fusion-framework-cli` to bundle it. Before doing so, make sure the application has the correct values in its `app-manifest.json` file. The `key` is especially important to correspond with the key you chose in Fusion App Store when you created a new application. If everything is ready to go, `cd` into the `apps/foo` folder and run `npm run build:spa`. This will bundle the application and make a zip file with the bundled app together with the app-manifest file. The zip-file is what you want to upload to the Fusion App Store. We will be using `fdev` to upload it and publish it. To do so, run `npm run deploy:spa`. The application "Foo" is now bundles, uploaded and published in the Fusion App Store.

## Updating our application (WIP)
Our application "Foo" is in production, but there is a bug we need to fix. After fixing the bug, we want to publish the fixed version in the Fusion App Store as well. In addition to git version control, we also want a comprised version of the changes that has been made in the app. A possible solution to this is to use the custom executor `version`. This executor will bump the versions inside `app-manifest.json` and `package.json`. It will also add some text inside `CHANGELOG.md` as well as the version. Let's try it out. Before running the executor, our changelog, package.json and app-manifest look like this:
```
CHANGELOG.md:
## Version 0.0.1

Init app
```
```
package.json:
{
  "name": "foo",
  "version": "0.0.1",
  "main": "src/main.tsx",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "fusion-framework-cli app dev",
    "build": "tsc --noEmit",
    "build:spa": "fusion-framework-cli app build",
    "postbuild:spa": "zip dist/bundle.zip -Dj dist/app-bundle.js app-manifest.json",
    "deploy:spa": "fdev portal upload -e ci -k foo dist/bundle.zip",
    "postdeploy:spa": "fdev portal publish -e ci -k foo"
  }
}
```

```
app-manifest.json:
{
  "name": "foo",
  "shortName": "foo",
  "key": "foo",
  "version": {
    "major": "0",
    "minor": "0",
    "patch": "1"
  }
}
```

To run the version executor for our "Foo"-app, use the following command: `nx run foo:version reason=Fix bug in table column XYZ`

> *📝* If you want to add new lines to the changelog do: `nx run foo:version reason=$'First line\nThis will be on a new line'` 
