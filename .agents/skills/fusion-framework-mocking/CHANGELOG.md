# Changelog

## 0.1.2 - 2026-11-01

### patch

- [#390](https://github.com/equinor/fusion-skills/pull/390) [`8242e54`](https://github.com/equinor/fusion-skills/commit/8242e546e0375039b6f211913e2caa40b80d2f98) - Load module and OpenAPI mock recipes only for the requested boundary while retaining client-only substitution and explicit network warnings before setup. Preserve deterministic state, real lifecycle and runner-owned spies.


  resolves equinor/fusion-core-tasks#2688

## 0.1.1 - 2026-11-01

### patch

- [#363](https://github.com/equinor/fusion-skills/pull/363) [`f34c0d9`](https://github.com/equinor/fusion-skills/commit/f34c0d9dc7de15e59ec643407914e98ad8288245) - Shorten module-mocking description while naming deterministic test state explicitly. Retain real providers and lifecycle, auth/context/HTTP boundaries and test-render/dev-server exclusions.


  resolves equinor/fusion-core-tasks#2672

## 0.1.0 - 2026-08-31

### minor

- [#221](https://github.com/equinor/fusion-skills/pull/221) [`df40bbc`](https://github.com/equinor/fusion-skills/commit/df40bbc28a8d9134ad433fe43d7110996e3e6143) - Add fusion-framework-mocking skill for test-time module and HTTP mocking in Fusion Framework apps


  Covers `mockFramework`/`FrameworkMockConfigurator`, `mockAppModules`/`enableAppManifestMock`, each module's own `/mock` entry point (MSAL, Node auth, service discovery, context, bookmarks, feature flags, analytics, telemetry), HTTP middleware mocking with `createRouterMiddleware`/`createOpenApiMockMiddleware`, `@equinor/fusion-openapi-mock`, and registering mocks for custom modules.
