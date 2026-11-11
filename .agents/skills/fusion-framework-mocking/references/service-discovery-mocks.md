# Service discovery mocks

## Service discovery

```typescript
import { enableServiceDiscoveryMock } from '@equinor/fusion-framework-module-service-discovery/mock';

enableServiceDiscoveryMock(configurator, (builder) => {
  builder.setBaseUri('http://localhost:6669');
  builder.addService({ key: 'my-api' });
  builder.removeService('bookmarks');
});
```

Only `IServiceDiscoveryClient` is substituted — the real configurator, provider, and validation
run.

**Defaults** — baseline services resolve without declaring anything:

| Key | Resolves to |
| --- | --- |
| `apps` | `https://apps.fusion.test` |
| `people` | `https://people.fusion.test` |
| `context` | `https://context.fusion.test` |
| `bookmarks` | `https://bookmarks.fusion.test` |
| `notification` | `https://notification.fusion.test` |

An **undeclared** key resolves to a synthesized entry rather than throwing. Call
`setResolveUnknownServices(false)` to assert the opposite.

> [!WARNING]
> Built-in modules resolve services **while the framework starts** (the context module resolves
> `context`, for example). Combining `setResolveUnknownServices(false)` with a `setServices`
> registry that omits them fails initialization, not the assertion being written. Either keep
> synthesis on, or declare every service the framework itself needs.

| Method | Purpose |
| --- | --- |
| `setBaseUri(uri)` | Resolve every service without an explicit `uri` against this host |
| `addService(service)` / `addServices(services)` | Register services, replacing by `key` |
| `removeService(key)` | Drop a service, including a baseline one |
| `setServices(services)` | **Replace** the registry outright (baseline is dropped) |
| `setResolveUnknownServices(boolean)` | Throw instead of synthesizing unknown services |

Point `setBaseUri` at a locally running mock server (Mockoon, Prism, `ffc mock-server`) to make
**real HTTP calls to a real local server** — nothing intercepts the transport.

`mockServiceDiscovery(configurator, options?, configure?)` is a one-call shorthand:
`mockServiceDiscovery(configurator, { baseUri: 'http://localhost:6669' })`.
