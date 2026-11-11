# Browser authentication mocks

## Authentication (MSAL, browser)

```typescript
import { enableMsalMock } from '@equinor/fusion-framework-module-msal/mock';

enableMsalMock(configurator, (builder) => {
  builder.setAccount({ name: 'Ada Lovelace', username: 'ada@equinor.com' });
});
```

Only `IMsalClient` is substituted — `MsalConfigurator`, `MsalProvider`, and schema validation all
run for real, so scope resolution and silent-first token acquisition behave as they do in
production.

**Defaults:** a user named `Test User` is signed in; tokens are real JWTs minted in-process with a
fixed issue time (deterministic, snapshot-safe). When no client configuration is declared, a
stand-in one is used so the app boots without real credentials.

| Option | Default | Purpose |
| --- | --- | --- |
| `name` | `Test User` | Display name |
| `username` | `test.user@equinor.com` | UPN / email |
| `userId` | `fusion-mock-user` | Object ID |
| `tenantId` | the client's configured tenant | Tenant |
| `scopes` | `fusion-mock-scope` | Granted when a request specifies none |
| `signedOut` | `false` | Start without a signed-in user |

The user is signed in **before** `MsalProvider.initialize()` runs — so `setRequiresAuth(true)`
combined with a `signedOut` account exercises the real automatic-login path, not a state assigned
after the fact:

```typescript
enableMsalMock(configurator, (builder) => builder.setAccount(null)); // nobody signed in
enableMsalMock(configurator, (builder) => builder.setAccount({ signedOut: true })); // identity kept, not signed in
```

`null` forgets the identity (a subsequent login produces the default user); `signedOut: true`
keeps it (a subsequent login produces the named user) — reach for the latter when the assertion
is about *who* signs in.

Return an exact token when a backend mock validates claims itself:

```typescript
enableMsalMock(configurator, (builder) => builder.setToken(token)); // also signs in the token's claims
enableMsalMock(configurator, (builder) => builder.setAccount({ name: 'Ada Lovelace' }).setToken(token, true)); // keep the account
```

Mint a token directly, without a client, for code that only needs one (e.g. an HTTP interceptor
test):

```typescript
import { createMockToken } from '@equinor/fusion-framework-module-msal/mock';

const token = createMockToken({ oid: 'fusion-mock-user' });
```

When a suite shares one framework instance but needs a different user per test:

```typescript
beforeEach(() => {
  fusion.modules.auth.client.setActiveAccount(account);
});
```

Spy on the client directly for individual-call assertions:

```typescript
vi.spyOn(fusion.modules.auth.client, 'acquireToken').mockResolvedValue(result);
afterEach(() => vi.restoreAllMocks());
```
