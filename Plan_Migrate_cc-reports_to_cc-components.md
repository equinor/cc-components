# Migration Plan: CC-Reports to CC-Components

## Overview

This document outlines the steps to migrate the CC-Reports repository into the CC-Components monorepo. The reports and shared libraries will be integrated as internal packages within the monorepo, consolidating all Completion Components under a single repository.

## Current State

### CC-Components Repository
- **Location**: `/Users/edward.brunton/repos/cc-components`
- **Structure**: Monorepo using pnpm workspaces and Turbo
- **Contains**: 
  - Applications in `apps/` (loop, punch, handover, etc.)
  - Libraries in `libs/` (shared components, sidesheets, etc.)
  - Portal apps in `portal/` and `fusion-portal/`
  - GitHub actions in `github-action/`

### CC-Reports Repository
- **Location**: `/Users/edward.brunton/repos/cc-reports`
- **Structure**: Monorepo using pnpm workspaces and Turbo
- **Contains**:
  - **24 Report Applications** in `src/reports/`:
    - `activities`
    - `ads-commercial-meeting`
    - `ads-engineering-meeting`
    - `ads-monthly-meeting`
    - `ads-offshore-installation`
    - `ads-schedule-viewer`
    - `ads-weekly-meeting`
    - `atex-inspection`
    - `cc-overview-analytics3`
    - `ccoverview`
    - `checklist`
    - `commissioning-task`
    - `completion-analytics`
    - `jca-installation`
    - `jca-job-analytics`
    - `jca-progress-summary`
    - `jca-spools`
    - `jca-work-preparation`
    - `preservation-workspace`
    - `projectsafetybarriers`
    - `query-workspace`
    - `schedule-viewer`
    - `tags`
    - `workorder-area-overview`
  - **1 Shared Library** in `src/libs/`:
    - `@cc-reports/powerbi` - PowerBI wrapper component
  - **GitHub Action Scripts** in `src/github-action/`:
    - Deploy scripts
    - App creation utilities
    - Link utilities
  - **GitHub Actions** in `.github/actions/`:
    - `build-monorepo`
    - `checkout-build-install`
    - `create-report-wrapper`
    - `get-fusion-token`
    - `pnpm-setup`
  - **GitHub Workflows** in `.github/workflows/`:
    - `ci.yml`
    - `create-fusion-report.yml`
    - `deploy-on-merge.yml`
    - `manual-deploy-ci.yml`
    - `manual-deploy-fprd.yml`
    - `trufflehog.yml`

## Migration Goals

1. Move all report applications into `cc-components/reports/`
2. Move the powerbi-wrapper library to `cc-components/libs/reportshared/`
3. Merge GitHub action scripts into existing `cc-components/github-action/`
4. Consolidate GitHub workflows and actions
5. Update import references and dependencies
6. Maintain logical separation between apps, reports, and libraries

## Migration Steps

### Phase 1: Preparation

#### 1.1 Create Reports Directory Structure
```bash
mkdir -p reports
mkdir -p libs/reportshared
```

#### 1.2 Backup (Optional)
Since cc-reports is a separate repository, create a backup branch if needed:
```bash
cd /Users/edward.brunton/repos/cc-reports
git checkout -b backup-before-migration
git push origin backup-before-migration
```

### Phase 2: Move Report Applications

#### 2.1 Copy Report Applications
Move all reports from cc-reports to cc-components:

```bash
# Copy all report applications
cp -r /Users/edward.brunton/repos/cc-reports/src/reports/* reports/
```

This will create:
```
reports/
├── activities/
├── ads-commercial-meeting/
├── ads-engineering-meeting/
├── ads-monthly-meeting/
├── ads-offshore-installation/
├── ads-schedule-viewer/
├── ads-weekly-meeting/
├── atex-inspection/
├── cc-overview-analytics3/
├── ccoverview/
├── checklist/
├── commissioning-task/
├── completion-analytics/
├── jca-installation/
├── jca-job-analytics/
├── jca-progress-summary/
├── jca-spools/
├── jca-work-preparation/
├── preservation-workspace/
├── projectsafetybarriers/
├── query-workspace/
├── schedule-viewer/
├── tags/
└── workorder-area-overview/
```

#### 2.2 Copy PowerBI Wrapper Library
```bash
cp -r /Users/edward.brunton/repos/cc-reports/src/libs/powerbi-wrapper libs/reportshared
```

### Phase 3: Update Package Configuration

#### 3.1 Update PowerBI Wrapper package.json
Update `libs/reportshared/package.json`:

```json
{
  "name": "@cc-components/reportshared",
  "version": "0.0.0",
  "type": "module",
  "private": true,
  "module": "./dist/src/index.js",
  "main": "./dist/src/index.js",
  "types": "./dist/src/index.d.ts",
  "scripts": {
    "build": "tsc -b -f"
  },
  "dependencies": {
    "@equinor/eds-core-react": "catalog:",
    "@equinor/eds-tokens": "catalog:",
    "@equinor/fusion-react-person": "^0.8.0",
    "@tanstack/react-query": "catalog:",
    "markdown-to-jsx": "catalog:",
    "odata-query": "^7.0.4",
    "styled-components": "catalog:"
  }
}
```

#### 3.2 Update Each Report's package.json
For each report application, update the package.json to:
- Use the new `@cc-components/reportshared` dependency
- Update deploy script path
- Add consistent scripts

**Example for reports/activities/package.json:**
```json
{
  "name": "activities",
  "displayName": "Activities",
  "shortName": "activities",
  "version": "0.0.1",
  "main": "./src/main.tsx",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "fusion-framework-cli app dev",
    "build": "tsc -b -f",
    "deploy": "tsx ../../github-action/src/deploy/deployReport.ts deploy",
    "fprd:deploy": "tsx ../../github-action/src/deploy/deployReport.ts deploy"
  },
  "dependencies": {
    "@cc-components/reportshared": "workspace:*"
  }
}
```

#### 3.3 Update Root pnpm-workspace.yaml
Add reports packages to the workspace configuration:

```yaml
packages:
  - 'libs/**'
  - 'libs/workspace/*'
  - 'apps/*'
  - 'reports/*'
  - 'portal/*'
  - 'fusion-portal/**'
  - 'cli'
  - 'github-action'
```

#### 3.4 Update Root package.json Scripts
Add report-specific build scripts:

```json
{
  "scripts": {
    "build:reports": "turbo run build --filter ./reports/** --parallel --output-logs errors-only",
    "new:report": "nx generate @cc-components/plugins:fusion-report-generator"
  }
}
```

### Phase 4: Merge GitHub Action Scripts

#### 4.1 Copy Deploy Script
Copy the report deploy script to the existing github-action folder:

```bash
cp -r /Users/edward.brunton/repos/cc-reports/src/github-action/src/deploy github-action/src/deploy-reports
```

Or create a new `deployReport.ts` in the existing structure:
```bash
cp /Users/edward.brunton/repos/cc-reports/src/github-action/src/deploy/deploy.ts github-action/src/deployReport.ts
```

#### 4.2 Merge Utility Functions
Review and merge any unique utilities from cc-reports:
- `src/github-action/src/utils/link-ff.ts` - May already exist in cc-components
- `src/github-action/src/createFusionApp/` - Merge with existing createFusionApp
- `src/github-action/src/createNewAppPr/` - Add report creation capability

### Phase 5: Update TypeScript Configuration

#### 5.1 Update tsconfig.base.json
Add path mapping for the new report shared library:

```json
{
  "compilerOptions": {
    "paths": {
      "@cc-components/plugins": ["libs/plugins/src/index.ts"],
      "@cc-components/reportshared": ["libs/reportshared/src/index.ts"]
    }
  }
}
```

#### 5.2 Create Report-Specific tsconfig (if needed)
Each report should reference the base config. Update existing tsconfig.json files:

```json
{
  "extends": "../../tsconfig.base.json",
  "compilerOptions": {
    "outDir": "./dist",
    "rootDir": "./src"
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

### Phase 6: Update Import References

#### 6.1 Update All Report Imports
Replace `@cc-reports/powerbi` with `@cc-components/reportshared`:

```bash
# Find and replace in all report files
find reports -name "*.ts" -o -name "*.tsx" | xargs sed -i '' 's/@cc-reports\/powerbi/@cc-components\/reportshared/g'
```

**Before:**
```typescript
import { PowerBIWrapper } from '@cc-reports/powerbi';
```

**After:**
```typescript
import { PowerBIWrapper } from '@cc-components/reportshared';
```

### Phase 7: Consolidate GitHub Workflows

#### 7.1 Update CI Workflow
Modify `cc-components/.github/workflows/ci.yml` to include reports:

The existing CI should already handle reports if the workspace is configured correctly. Verify it builds `./reports/**`.

#### 7.2 Update Deploy Workflow
Modify `cc-components/.github/workflows/fprd-deploy.yml` to include reports:

```yaml
- name: 'Deploy affected reports to Fusion PROD'
  shell: bash
  env:
    NODE_OPTIONS: "--max_old_space_size=12288"
  run: npx turbo run fprd:deploy --filter='./reports/**[HEAD^]' --concurrency 4 -- --token ${{ steps.get-fusion-token.outputs.token }}
```

Or add to the existing deploy command by expanding the filter.

#### 7.3 Add Manual Report Deploy Workflow (Optional)
Create `.github/workflows/manual-deploy-report.yml` for manual report deployments:

```yaml
name: 'Manual Deploy Report'
on:
  workflow_dispatch:
    inputs:
      report:
        description: 'Report to deploy'
        required: true
        type: string
      environment:
        description: 'Environment to deploy to'
        required: true
        type: choice
        options:
          - ci
          - fprd

permissions:
  actions: read
  contents: read
  deployments: write
  id-token: write

jobs:
  deploy-report:
    runs-on: ubuntu-latest
    environment: ${{ github.event.inputs.environment }}
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Get fusion token
        id: 'get-fusion-token'
        uses: ./.github/actions/get-fusion-token
        with:
          client-id: ${{ secrets.AZURE_PROD_CLIENT_ID }}
          tenant-id: ${{ secrets.AZURE_TENANT_ID }}
          resource-id: ${{ secrets.AZURE_RESOURCE_PROD_ID }}

      - name: PNPM setup
        uses: ./.github/actions/pnpm-setup

      - name: Build monorepo
        run: pnpm ci:build

      - name: Deploy report
        run: npx turbo run fprd:deploy --filter=${{ github.event.inputs.report }} -- --token ${{ steps.get-fusion-token.outputs.token }}
```

### Phase 8: Copy Additional GitHub Actions (If Needed)

Review cc-reports actions and merge any that don't exist in cc-components:

#### Actions to Review:
- `build-monorepo/` - May be handled differently in cc-components
- `checkout-build-install/` - Likely redundant with existing setup
- `create-report-wrapper/` - Merge into existing app creation workflow
- `get-fusion-token/` - Already exists in cc-components
- `pnpm-setup/` - Already exists in cc-components

### Phase 9: Testing and Validation

#### 9.1 Clean Install
```bash
pnpm clean
pnpm install
```

#### 9.2 Build All Packages
```bash
pnpm ci:build
```

#### 9.3 Build Reports Specifically
```bash
pnpm build:reports
```

#### 9.4 Test Individual Reports
```bash
# Test a few key reports
pnpm serve --filter activities
pnpm serve --filter ccoverview
pnpm serve --filter schedule-viewer
```

### Phase 10: Update Documentation

#### 10.1 Update README.md
Add section about reports structure:

```markdown
## Project Structure

- `apps/` - Application packages (loop, punch, handover, etc.)
- `reports/` - Power BI report applications
- `libs/` - Shared libraries
  - `reportshared/` - Shared components for reports (PowerBI wrapper)
  - `workspace/` - Workspace packages
  - `shared/` - Common utilities
- `portal/` - Portal applications
- `fusion-portal/` - Fusion portal integration
```

#### 10.2 Update CONTRIBUTING.md
Add guidance for creating new reports.

## Post-Migration Checklist

- [ ] Reports directory created with all 24 reports
- [ ] PowerBI wrapper moved to `libs/reportshared/`
- [ ] All package.json files updated
- [ ] pnpm-workspace.yaml updated
- [ ] tsconfig.base.json updated with path mappings
- [ ] All imports updated from `@cc-reports/powerbi` to `@cc-components/reportshared`
- [ ] GitHub action scripts merged
- [ ] Deploy scripts updated with correct paths
- [ ] CI/CD workflows updated to include reports
- [ ] All packages build successfully
- [ ] Reports run correctly in dev mode
- [ ] Documentation updated
- [ ] Team notified of changes

## Directory Structure After Migration

```
cc-components/
├── apps/
│   ├── docs/
│   ├── electricalconsumers/
│   ├── handover/
│   ├── heattrace/
│   ├── loop/
│   ├── mechanicalcompletion/
│   ├── modelviewer/
│   ├── piping/
│   ├── punch/
│   ├── swcr/
│   └── workorder/
├── reports/                          # NEW
│   ├── activities/
│   ├── ads-commercial-meeting/
│   ├── ads-engineering-meeting/
│   ├── ads-monthly-meeting/
│   ├── ads-offshore-installation/
│   ├── ads-schedule-viewer/
│   ├── ads-weekly-meeting/
│   ├── atex-inspection/
│   ├── cc-overview-analytics3/
│   ├── ccoverview/
│   ├── checklist/
│   ├── commissioning-task/
│   ├── completion-analytics/
│   ├── jca-installation/
│   ├── jca-job-analytics/
│   ├── jca-progress-summary/
│   ├── jca-spools/
│   ├── jca-work-preparation/
│   ├── preservation-workspace/
│   ├── projectsafetybarriers/
│   ├── query-workspace/
│   ├── schedule-viewer/
│   ├── tags/
│   └── workorder-area-overview/
├── libs/
│   ├── reportshared/                 # NEW (from powerbi-wrapper)
│   ├── workspace/
│   ├── shared/
│   ├── sharedcomponents/
│   └── ... (other libs)
├── portal/
├── fusion-portal/
├── github-action/
│   └── src/
│       ├── deployReport.ts           # NEW or merged
│       └── ... (existing)
└── ... (config files)
```

## Benefits of Migration

1. **Single Source of Truth**: All Completion Components code in one repository
2. **Unified CI/CD**: Single build and deploy pipeline
3. **Shared Dependencies**: Common dependency management and version control
4. **Easier Refactoring**: Can update shared components across apps and reports
5. **Reduced Maintenance**: One repository to maintain instead of two
6. **Consistent Tooling**: Same build tools, linting, and formatting
7. **Improved Developer Experience**: Easier onboarding and development workflow

## Rollback Plan

If issues arise:

1. Git reset to previous commit: `git reset --hard HEAD~1`
2. The cc-reports repository remains intact
3. Reinstall dependencies: `pnpm install`

## Notes

- Report applications keep their original names (e.g., `activities`, `ccoverview`)
- The shared library is renamed from `@cc-reports/powerbi` to `@cc-components/reportshared`
- All packages are marked as `private: true` to prevent accidental publishing
- Deploy scripts need to be updated to use the correct paths in the new structure
- The workspace subdirectory in cc-reports is ignored as it's the same workspace being migrated separately
