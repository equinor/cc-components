# Context mocks and fixtures

## Context

```typescript
import { enableContextMock } from '@equinor/fusion-framework-module-context/mock';

enableContextMock(configurator, (mock) => {
  mock.setCurrentContext({ id: 'my-ctx', type: { id: 'ProjectMaster' }, value: {} });
});
```

Only the data source is substituted — real `ContextProvider` behavior (`validateContext`,
`resolveContext`, parent-context propagation) still runs against the seeded pool.

- **Friendly layer** — `setCurrentContext`, `setContexts`, `addContext`, `setRelatedContexts` —
  seed a known item, get it back.
- **Escape hatch** — `setResolver` — a custom `resolveContext` strategy the friendly layer doesn't cover.

Defaults: the pool starts empty, no current context is selected, and looking up an unseeded id
throws an error naming the id and the seeding methods.

This is one of two ways to fake context data. The other is mocking the context API's HTTP
responses directly (`.http`, optionally with `createOpenApiMockMiddleware`), which exercises the
real `ContextModuleConfigurator`/services/HTTP pipeline — reach for that when the test needs to
cover that pipeline itself.

Generate deterministic fixtures with `@faker-js/faker` from the optional `/mock/fixtures` entry
point (install Faker only when importing this):

```typescript
import { createContextItems } from '@equinor/fusion-framework-module-context/mock/fixtures';

const [project, contract] = createContextItems([
  { type: 'ProjectMaster' },
  { type: 'Contract', parentTypeIds: ['ProjectMaster'] },
]);
```
