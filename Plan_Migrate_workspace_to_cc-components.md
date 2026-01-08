# Migration Plan: Workspace to CC-Components

## Overview

This document outlines the steps to migrate the Workspace repository into the CC-Components monorepo while maintaining logical separation. The workspace packages will no longer be separate npm packages but will be integrated as internal libraries within the monorepo.

## Current State

### CC-Components Repository
- **Location**: Current repository
- **Structure**: Monorepo using pnpm workspaces and Turbo
- **Contains**: Application-specific logic in `libs/` and `apps/`
- **Workspace Packages**: Currently linked via `@equinor/workspace-fusion` using `link:workspace/packages/workspace-fusion`

### Workspace Repository
- **Location**: Stored in the workspace folder
- **Structure**: Standalone monorepo with 8 packages
- **Packages**:
  - `@equinor/workspace-core`
  - `@equinor/workspace-react`
  - `@equinor/workspace-fusion`
  - `@equinor/workspace-ag-grid`
  - `@equinor/workspace-garden`
  - `@equinor/workspace-powerbi`
  - `@equinor/workspace-filter`
  - `@equinor/workspace-fusion-integration-test`

## Migration Goals

1. Move all workspace packages into `cc-components/libs/workspace/`
2. Remove npm publishing configuration
3. Update import references throughout the codebase
4. Maintain logical separation between workspace and application code
5. Preserve git history for the workspace packages

## Migration Steps

### Phase 1: Preparation

#### 1.1 Create Workspace Directory Structure
```bash
mkdir -p libs/workspace
```

#### 1.2 Backup Current State
```bash
# Create a backup branch
git checkout main
git checkout -b backup/pre-workspace-migration
git push origin backup/pre-workspace-migration
git checkout feat/merge-workspace-into-cc-components
```

### Phase 2: Move Workspace Packages

#### 2.1 Copy Workspace Packages
Move each package from the workspace repository to the cc-components repository:

```bash
# For each workspace package
cp -r workspace/packages/core libs/workspace/core
cp -r workspace/packages/react libs/workspace/react
cp -r workspace/packages/workspace-fusion libs/workspace/fusion
cp -r workspace/packages/ag-grid libs/workspace/ag-grid
cp -r workspace/packages/garden libs/workspace/garden
cp -r workspace/packages/power-bi libs/workspace/power-bi
cp -r workspace/packages/filter libs/workspace/filter
cp -r workspace/packages/workspace-fusion-integration-test libs/workspace/integration-test
```

#### 2.2 Preserve Git History
```bash
# Use git subtree or git filter-branch
git subtree add --prefix=libs/workspace https://github.com/equinor/fusion-workspace.git main --squash
```

### Phase 3: Update Package Configuration

#### 3.1 Update Each Package's package.json
For each workspace package, remove publishing configuration:

**Remove:**
- `publishConfig` section
- `repository` section (optional)
- `gitHead` field

**Update:**
- `name`: Keep as `@equinor/workspace-*` for consistency
- `version`: Can simplify to match monorepo versioning strategy

**Example for libs/workspace/fusion/package.json:**
```json
{
  "name": "@equinor/workspace-fusion",
  "version": "0.0.0",
  "type": "module",
  "private": true,
  "dependencies": {
    "@equinor/workspace-ag-grid": "workspace:*",
    "@equinor/workspace-filter": "workspace:*",
    "@equinor/workspace-garden": "workspace:*",
    "@equinor/workspace-powerbi": "workspace:*",
    "@equinor/workspace-react": "workspace:*",
    "@equinor/workspace-core": "workspace:*"
  }
}
```

#### 3.2 Update Root pnpm-workspace.yaml
Add workspace packages to the root configuration:

```yaml
packages:
  - 'libs/**'
  - 'libs/workspace/*'
  - 'apps/*'
  - 'portal/*'
  - 'fusion-portal/**'
  - 'cli'
  - 'github-action'
```

#### 3.3 Update Root package.json
Remove the link dependency:

**Remove:**
```json
"@equinor/workspace-fusion": "link:workspace/packages/workspace-fusion"
```

The package will now be resolved via pnpm workspace protocol.

### Phase 4: Update TypeScript Configuration

#### 4.1 Update tsconfig.base.json
Add path mappings for workspace packages:

```json
{
  "compilerOptions": {
    "paths": {
      "@cc-components/plugins": ["libs/plugins/src/index.ts"],
      "@equinor/workspace-core": ["libs/workspace/core/src/index.ts"],
      "@equinor/workspace-react": ["libs/workspace/react/src/index.ts"],
      "@equinor/workspace-fusion": ["libs/workspace/fusion/src/index.tsx"],
      "@equinor/workspace-fusion/*": ["libs/workspace/fusion/src/*"],
      "@equinor/workspace-ag-grid": ["libs/workspace/ag-grid/src/index.ts"],
      "@equinor/workspace-garden": ["libs/workspace/garden/src/index.ts"],
      "@equinor/workspace-powerbi": ["libs/workspace/power-bi/src/index.ts"],
      "@equinor/workspace-filter": ["libs/workspace/filter/src/index.ts"]
    }
  }
}
```

#### 4.2 Create Workspace-Specific tsconfig
Create `libs/workspace/tsconfig.json`:

```json
{
  "extends": "../../tsconfig.base.json",
  "compilerOptions": {
    "composite": true,
    "outDir": "../../dist/workspace"
  },
  "references": [
    { "path": "./core" },
    { "path": "./react" },
    { "path": "./ag-grid" },
    { "path": "./garden" },
    { "path": "./power-bi" },
    { "path": "./filter" },
    { "path": "./fusion" }
  ]
}
```

### Phase 5: Update Build Configuration

#### 5.1 Update turbo.json
Add workspace packages to the build pipeline:

```json
{
  "pipeline": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": ["dist/**"]
    }
  }
}
```

#### 5.2 Update Each Package's Build Script
Ensure each workspace package has consistent build scripts:

```json
{
  "scripts": {
    "build": "tsup",
    "build:prod": "tsup"
  }
}
```

### Phase 6: Remove Old Workspace Directory

#### 6.1 Clean Up
Remove the old workspace directory that was linked:

```bash
rm -rf workspace/
```

#### 6.2 Remove Link Scripts
Remove or update the link scripts in package.json:

```json
// Remove these:
"link:workspace": "tsx ./github-action/src/link-ff.ts link",
"unlink:workspace": "tsx ./github-action/src/link-ff.ts unlink"
```

### Phase 7: Update Import References

#### 7.1 Update All Imports
All existing imports should continue to work as-is since the package names remain the same:

```typescript
// These imports remain unchanged
import { Workspace } from '@equinor/workspace-fusion';
import { useFilterConfig } from '@equinor/workspace-filter';
```

#### 7.2 Verify Import Resolution
```bash
# Build all packages to verify imports resolve correctly
pnpm ci:build
```

### Phase 8: Testing and Validation

#### 8.1 Clean Install
```bash
pnpm clean
pnpm install
```

#### 8.2 Build All Packages
```bash
pnpm ci:build
```

#### 8.3 Run Tests
```bash
# Run workspace integration tests
pnpm --filter @equinor/workspace-fusion-integration-test test

# Run all tests
pnpm test
```

#### 8.4 Test Applications
```bash
# Test a few key applications
pnpm serve --filter @cc-components/loopapp
pnpm serve --filter @cc-components/punchapp
```

### Phase 9: CI/CD Updates

#### 9.1 Update Build Workflows
Ensure CI builds include workspace packages:

```yaml
- name: Build workspace packages
  run: pnpm turbo run build --filter './libs/workspace/**'
```

## Post-Migration Checklist

- [ ] All workspace packages moved to `libs/workspace/`
- [ ] Package.json files updated (removed publish config)
- [ ] pnpm-workspace.yaml updated
- [ ] tsconfig.base.json updated with path mappings
- [ ] All packages build successfully
- [ ] All tests pass
- [ ] Applications run correctly
- [ ] Old workspace directory removed
- [ ] Link scripts removed/updated
- [ ] Documentation updated
- [ ] CI/CD workflows updated
- [ ] Team notified of changes

## Benefits of Migration

1. **Simplified Development**: Single repository for all code
2. **Easier Refactoring**: Can update workspace and apps together
3. **Faster Iteration**: No need to publish/update package versions
4. **Better Type Safety**: Direct TypeScript references
5. **Unified Tooling**: Single build system, testing framework, and CI/CD pipeline
6. **Logical Separation**: Maintained through directory structure

## Rollback Plan

If issues arise:

1. Restore from backup branch: `git checkout backup/pre-workspace-migration`
2. Re-link workspace: `pnpm link:workspace`
3. Reinstall dependencies: `pnpm install`

## Notes

- The workspace packages remain namespaced as `@equinor/workspace-*` for clarity
- All packages are marked as `private: true` to prevent accidental publishing
- pnpm workspace protocol (`workspace:*`) ensures packages always use local versions
- The logical separation between workspace and application code is maintained through directory structure
