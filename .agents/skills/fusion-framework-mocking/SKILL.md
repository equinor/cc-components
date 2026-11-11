---
name: fusion-framework-mocking
description: 'Seeds deterministic Fusion Framework test state with mockFramework, mockAppModules and module-owned mocks; keeps real providers and lifecycle. USE FOR: auth, context, bookmarks, feature flags, HTTP/OpenAPI, custom module mocks. DO NOT USE FOR: renders/Vitest/Browser Mode (use fusion-framework-testing), dev-server API mocks (use fusion-developer-app), backend mocking.'
license: MIT
compatibility: Requires a Fusion Framework app or module graph consuming @equinor/fusion-framework packages. Each module's mock lives at its own `/mock` subpath (e.g. @equinor/fusion-framework-module-msal/mock) and has no test-runner dependency; assertions and call-spying are the test runner's job (Vitest's `vi`, `bun:test`'s `spyOn`, or Node's `t.mock.method`).
metadata:
  version: "0.1.2"
  status: experimental
  owner: "@equinor/fusion-core"
  skills:
    - fusion-framework-testing
  tags:
    - fusion-framework
    - mocking
    - testing
    - vitest
    - msal
    - http
    - openapi
  mcp:
    suggested:
      - fusion
---

# Fusion Framework Mocking

## When to use

Seed deterministic test auth, service discovery, context, bookmarks, feature flags, HTTP,
analytics, telemetry, app manifests or custom module state. Includes signed-out/login/logout,
`useAccessToken`, `mockFramework`, `mockAppModules`, module-owned `/mock` imports and `*.mock.ts` configurators.

## When not to use

Rendering/hooks/components, Vitest or Browser Mode setup: `fusion-framework-testing`.
`dev-server.config.ts` API mocks/proxies for local `ffc app dev`: `fusion-developer-app`.
Call arguments/count/reset: runner spies (`vi.spyOn`, `vi.fn`), not Fusion state seeding.
Not backend/service-repo test doubles.

## Required inputs

- Boundary to fake; scope: parent (`mockFramework`), app (`mockAppModules`) or bespoke graph
  (module `enable*Mock`).
- When relevant: test identity/claims, fully offline requirement, available OpenAPI contract.

## Safety & constraints

- **Before mock setup:** `.services` being reachable on `FrameworkMockConfigurator` does not mean
  it is mocked. Requests through `.services` still hit real network; custom module mocks do not
  close this gap. Verify installed-version facts before relying on substitution.
- Unmatched HTTP falls through to `next(uri, init)` and real network. Fully offline tests must
  answer every expected request and reject unexpected ones; state intentionally allowed fallthrough.
- No real credentials/tenants/production services. Unsigned `createMockToken`/MSAL mock JWTs are
  test-only, never valid production authentication.
- Replace only client I/O boundary; providers, configurators, schema validation and `initialize`
  run for real. Never replace provider/configurator wholesale.
- No invented Fusion call-mocking API: plain clients use `vi.spyOn`, `bun:test`'s `spyOn`, or
  Node's `t.mock.method`. Cite actual package/export; use smallest sufficient boundary.
- `setResolveUnknownServices(false)` requires every startup service declared (e.g. `context`);
  do not assume it is safe with an incomplete registry.
- Seed deterministic identity, tokens, services, time and responses; no `Date.now()`-derived
  assertions without seeding. Contract fetching and fully offline execution are separate phases.

## Instructions

### Step 1 — Understand the mocking design

Module owns/version-aligns its `/mock` client. `@equinor/fusion-framework/mock` composes built-ins,
contains no mock logic or runner dependency. Real pipeline catches wiring mistakes.
When composing parent/app graph or diagnosing bootstrap/configurator behavior, read
`references/framework-and-app-mocks.md` for composition, defaults and seeded examples before setup.

### Step 2 — Pick the right layer

| Scope | Use | Import |
| --- | --- | --- |
| Parent/portal modules | `mockFramework` | `@equinor/fusion-framework/mock` |
| App modules, no React | `mockAppModules` | `@equinor/fusion-framework-app/mock` |
| One module/bespoke graph | module's `enable*Mock` | `@equinor/fusion-framework-module-*/mock` |
| React hooks/components | Render helpers | `fusion-framework-testing` |

`mockFramework` initializes `event`, `auth`, `http`, `serviceDiscovery`, `context`, `telemetry`
with zero config: signed-in `Test User` and offline service resolution, not blanket offline HTTP.

### Step 3 — Seed the module the test needs

When boundary matches a row, read its file for exact exports, defaults, builders and recipes.
For an unknown module/export, read `references/module-mocks.md` for import catalog first.
All paths are skill-root-relative; do not load unrelated module recipes.

| Boundary | Read |
| --- | --- |
| Browser MSAL auth, signed-out/exact tokens/spies | `references/auth-mocks.md` |
| Node Azure Identity/MSAL Node | `references/node-auth-mocks.md` |
| Service discovery registry/startup | `references/service-discovery-mocks.md` |
| Context/resolvers/deterministic fixtures | `references/context-mocks.md` |
| Bookmarks/feature flags | `references/bookmark-and-feature-mocks.md` |
| Analytics/telemetry/event observation | `references/observer-mocks.md` |
| App manifest/config | `references/framework-and-app-mocks.md` |

### Step 4 — Fake HTTP responses

When faking transport or asserting middleware calls, read `references/http-and-openapi-mocks.md`
for `configurator.http.addMiddleware(...)`, `createRouterMiddleware`, onion order and fallthrough.
When whole API has OpenAPI contract, read `references/openapi-mocks.md` for
`createOpenApiMockMiddleware`, `@equinor/fusion-openapi-mock`, operation overrides, seeds and Faker.

### Step 5 — Add a mock for a custom module (when needed)

When module is not built-in, read `references/custom-module-mocks.md` for client seam (`setClient`),
builder-owned configuration and `configurator.<yourModule>` accessors via
`FrameworkMockConfigurator`'s `_pin`/`_getConfig`.
Do not infer network substitution from accessor availability.

### Step 6 — Verify

Check client-only substitution, real pipeline, deterministic tokens/services, explicit offline
coverage or intentional fallthrough, and runner-owned spies.

## Expected output

Test code using correct `/mock` exports; chosen parent/app/module layer and rationale;
HTTP strategy (middleware/router/OpenAPI) and offline guarantees; custom wiring when applicable.
State limitations, especially `.services` network gap.
