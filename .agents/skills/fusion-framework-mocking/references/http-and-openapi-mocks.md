# HTTP and OpenAPI mocks

There is no separate HTTP mock client or configurator — register a short-circuiting middleware
through `configurator.http.addMiddleware(...)` on the **real** `IHttpClientConfigurator` instead.
`configureClient`, `baseUri`, `defaultScopes`, `requestHandler`, `onCreate` all still apply; a
middleware only wraps the network call itself.

## Quick start

```typescript
configurator.configureHttpClient('catalog', { baseUri: 'https://api.example.com' });
configurator.http.addMiddleware(async (uri, init, next) =>
  uri === 'https://api.example.com/items' ? Response.json([{ id: 1 }]) : next(uri, init),
);

const items = await fusion.modules.http.createClient('catalog').json('/items');
```

## The middleware contract

```typescript
type HttpMiddleware = (
  uri: string,
  init: RequestInit,
  next: (uri: string, init: RequestInit) => Promise<Response>,
) => Response | Promise<Response> | Observable<Response>;
```

- **A middleware decides for itself whether to answer or fall through** — return a `Response` to
  handle the request, or call and return `next(uri, init)` to continue to whichever middleware (or
  the real network call) is registered next. There is no separate "declined" return value; unlike
  a router, this is an onion-style chain, so a middleware can also inspect what `next(...)`
  resolves to and decide based on that (a retry, for example).
- **Registration order is outermost-first.** The first middleware registered wraps every other
  one, including the real network call — it sees the request first and the response last.
- **A test middleware composes with real app config unchanged** — `addMiddleware` wraps
  `_performFetch` rather than replacing it, so the exact same client and configuration a real app
  registers is what a test exercises; only the boundary that would reach the network is
  short-circuited.

An unmatched request eventually reaches the real network. A test that must stay fully offline
should register middleware for every expected request and fail deliberately on unexpected ones.

## Several routes with `createRouterMiddleware`

`createRouterMiddleware(baseUri, build)` (`@equinor/fusion-framework-module-http/mock`) is a
lightweight, Express-like router for a base URI with several routes — path templates (`:id`) and
per-method registration, without hand-rolling `RegExp` matching in every middleware:

```typescript
import { createRouterMiddleware } from '@equinor/fusion-framework-module-http/mock';

configurator.http.addMiddleware(
  createRouterMiddleware('https://context.example.com', (router) => {
    router.get('/contexts/:id/relations', () => Response.json([{ id: 'ctx-3' }]));
    router.get('/contexts', () => Response.json([{ id: 'ctx-2' }]));
    router.get('/contexts/:id', ({ params }) => Response.json({ id: params.id }));
  }),
);
```

A handler receives `{ params, url, request }`. A request outside `baseUri`, or matching no
registered route, falls through to `next` — routes are tried in registration order and the first
match wins. Deliberately not MSW-compatible: it stays inside `addMiddleware`'s own request
pipeline rather than intercepting the network boundary, so it has none of MSW's response
transformers, `onUnhandledRequest` diagnostics, or wildcard patterns.

## Asserting calls with `vi.fn`

A middleware is a plain function, so a `vi.fn` spy works as one directly:

```typescript
const middleware = vi.fn(async () => Response.json({ ok: true }));
configurator.http.addMiddleware(middleware);

await client.json('/items');

expect(middleware).toHaveBeenCalledOnce();
const [uri, init] = middleware.mock.calls[0];
expect(init.method ?? 'GET').toBe('GET');
```

## Choosing a strategy

| Need | Preferred boundary | Why |
| --- | --- | --- |
| One known context/domain item | a module's `enable*Mock` (see `module-mocks.md`) | Seeds domain data without transport setup |
| Service integration itself is under test | HTTP middleware | Exercises service discovery, HTTP, and client behavior together |
| One or two HTTP routes | hand-written `HttpMiddleware` | Keeps response behavior explicit |
| Several routes under one base URI | `createRouterMiddleware` | Path-template routing without hand-rolled `RegExp` |
| An API described by OpenAPI | `createOpenApiMockMiddleware` | Generates deterministic responses for the whole spec |
| An individual client call | `vi.spyOn`/`vi.fn` | Uses the test runner's own call assertions and reset semantics |

## Related

- `references/module-mocks.md` — per-module mocks, including context's own HTTP-vs-seed tradeoff
- `references/framework-and-app-mocks.md` — `mockFramework`/`mockAppModules` and design rules
