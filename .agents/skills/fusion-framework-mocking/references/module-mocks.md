# Per-module mocks

Every mock lives at its owning module's own `/mock` entry point and has no test-runner
dependency. When used through `@equinor/fusion-framework/mock`'s `FrameworkMockConfigurator`,
the built-ins (`msal`, `serviceDiscovery`, `context`, `telemetry`) are reachable directly as
`configurator.<name>` — everything else is registered through its own `enable*Mock` helper.

| App dependency | Import path | Primary API |
| --- | --- | --- |
| Browser authentication (MSAL) | `@equinor/fusion-framework-module-msal/mock` | `enableMsalMock`, `MsalMockClient`, `createMockToken` |
| Node authentication (Azure Identity) | `@equinor/fusion-framework-module-azure-identity/mock` | `enableAuthMock`, `MockAuthProvider` |
| Node authentication (MSAL Node) | `@equinor/fusion-framework-module-msal-node/mock` | `enableAuthMock`, `MockAuthProvider` |
| Service discovery | `@equinor/fusion-framework-module-service-discovery/mock` | `enableServiceDiscoveryMock`, `mockServiceDiscovery`, `ServiceDiscoveryMockConfigurator` |
| Context | `@equinor/fusion-framework-module-context/mock` | `enableContextMock`, `ContextMockConfigurator` |
| Context fixtures | `@equinor/fusion-framework-module-context/mock/fixtures` | `createContextItemFactory`, `createContextItems` (uses `@faker-js/faker`) |
| Bookmarks | `@equinor/fusion-framework-module-bookmark/mock` | `enableBookmarkMock`, `BookmarkMockConfigurator` |
| Feature flags | `@equinor/fusion-framework-module-feature-flag/mock` | `enableFeatureFlagMock`, `FeatureFlagMockConfigurator` |
| Analytics | `@equinor/fusion-framework-module-analytics/mock` | `MockAnalyticsAdapter` |
| Telemetry | `@equinor/fusion-framework-module-telemetry/mock` | `enableTelemetryMock`, `MockTelemetryAdapter` |
| App manifest/config | `@equinor/fusion-framework-app/mock` | `mockAppModules`, `enableAppManifestMock`, `MockAppClient` |
| HTTP routes and OpenAPI | `@equinor/fusion-framework-module-http/mock` | see `http-and-openapi-mocks.md` (HTTP) and `openapi-mocks.md` (OpenAPI) |

The `event` module has **no** mock entry point — `waitForEvent`/`watchEvents` from
`@equinor/fusion-framework-module-event/utils` observe the real event provider directly; they are
plain observer functions, not test doubles, and work against any real `IEventModuleProvider`.

## Related

- `references/framework-and-app-mocks.md` — `mockFramework`, `mockAppModules`, design rules
- `references/http-and-openapi-mocks.md` — HTTP middleware and routes
- `references/openapi-mocks.md` — OpenAPI-backed responses: `createOpenApiMockMiddleware` and operation overrides
- `references/custom-module-mocks.md` — mocking a module that isn't a built-in
