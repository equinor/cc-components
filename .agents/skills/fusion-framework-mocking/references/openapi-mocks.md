# OpenAPI mock responses

## Faking an entire OpenAPI document

`createOpenApiMockMiddleware(openApiMock)` (`@equinor/fusion-framework-module-http/mock`) adapts an
`@equinor/fusion-openapi-mock` instance into an `HttpMiddleware`, so a real
`openapi.json`/`openapi.yaml` fakes every response until a specific operation needs overriding:

```typescript
import { createOpenApiMock } from '@equinor/fusion-openapi-mock';
import { createOpenApiMockMiddleware } from '@equinor/fusion-framework-module-http/mock';

const openApiMock = createOpenApiMock(openApiDocument, { seed: 42 });

configurator.configureHttpClient('catalog', { baseUri: 'https://api.example.com' });
configurator.http.addMiddleware(createOpenApiMockMiddleware(openApiMock));
```

A request that matches no operation in the document falls through to `next`, so this composes
with other middleware, or the real network call, registered around it.

### `@equinor/fusion-openapi-mock` itself

Fakes OpenAPI 3 responses straight from a spec document — no hand-written fixtures needed until a
specific edge case (a `404`, a boundary value) needs one. Has no opinion on how the fake is wired
into a transport (this module's HTTP middleware, `openapi-backend`, Express, or a hand-rolled
server).

```typescript
import { createOpenApiMock, fetchOpenApiDocument } from '@equinor/fusion-openapi-mock';

// Fetch the spec from wherever it's published, so the test mocks against the real,
// currently-published contract instead of a copy that can drift.
const openapi = await fetchOpenApiDocument('https://api.example.com/openapi.json');
const mock = createOpenApiMock(openapi);

const response = await mock.resolve({ method: 'GET', path: '/pets/1' });
// response.status -> the operation's declared success status
// response.mock   -> a value shaped like the operation's response schema
// response.params -> { petId: '1' }, extracted from the /pets/{petId} template
```

A document already available locally works the same way:

```typescript
import openapi from './openapi.json' with { type: 'json' };
const mock = createOpenApiMock(openapi);
```

**Zero-friction baseline:** every operation with an `operationId` is indexed. The first time it's
requested, its declared "success" response (lowest `2xx`, falling back to `default`) is faked from
that response's JSON schema (`$ref`s resolved against the same document). Operations without an
`operationId` are not routable or overridable.

**Override an edge case** at construction, or later with `.register`:

```typescript
const mock = createOpenApiMock(openapi, {
  overrides: {
    getPetById: ({ params }) => ({ status: 404, mock: { message: `Pet ${params.petId} not found` } }),
  },
});

// or start from the generated baseline and tweak one field
mock.register('getPetById', async ({ params, mockResponseForOperation }) => {
  const baseline = await mockResponseForOperation();
  return { ...baseline, mock: { ...baseline.mock, id: params.petId } };
});
```

**Repeatable tests with `seed`:** `createOpenApiMock(openapi, { seed: 42 })` — the same document
and seed always fake the same values, so a test can assert a concrete expected value instead of
`expect.any(...)`.

**Realistic fields with `@faker-js/faker`:** annotate a schema property with
`"faker": "module.method"` (this package's own OpenAPI extension), or supply an out-of-band
`fields` map keyed `"<ModelName>.<field>"` when the schema itself isn't yours to edit:

```typescript
const mock = createOpenApiMock(openapi, {
  seed: 42,
  fields: {
    'User.email': 'internet.email',
    'User.id': ({ faker, path }) => `usr_${path.join('-')}_${faker.string.uuid()}`,
  },
});
```

A function field faker receives `{ modelName, path, faker }` — the same seeded `faker` instance
generating the rest of the response, so it stays deterministic under `options.seed`. Load a
`fields` map from a sidecar file with `loadFakerMap` (from the Node-only
`@equinor/fusion-openapi-mock/node` entry point) when the mapping should live next to the tests
instead of inline.

**Notes:**
- A path parameter (`{petId}`) always matches exactly one path segment.
- A schema that (indirectly) references itself would recurse forever; the second time a `$ref` is
  seen along one branch, `dereferenceSchema` substitutes an empty (permissive) schema instead.
