---
title: TLDR
description: Collection of common commands
---

## Commands

- Run an application: `nx run <app-name>:serve`
- Create a new Fusion workspace app: `nx g @cc-components/plugins:fusion-app-generator --name=foo --tags=ws`
- Create a new app library: `nx g @cc-components/plugins:app-library --name=fooapp`
- Bundle a fusion app (be inside the actual app folder when running this): `npm run build:spa`
- Deploy a fusion app (be inside the actual app folder when running this): `npm run deploy:spa`
- Bump the version and changelog of a specific app: `nx run handover:version --reason="This will be in changelog" --type="major"`
- Bump the version and changelog of all Workspace apps: `npm run bump-ws-apps -- --reason="This will be in changelog" --type="minor"`
- Bump the version and changelog of all PBI apps: `npm run bump-pbi-apps -- --reason="This will be in changelog" --type="patch"`
- Bump the version and changelog of all apps: `npm run bump-all-apps -- --reason="This will be in changelog"`
- Bump the version and changelog (with new lines) of an app: `npm run handover:version --reason=$'Line one\nLine two'`
