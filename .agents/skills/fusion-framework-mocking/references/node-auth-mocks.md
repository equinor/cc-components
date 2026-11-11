# Node authentication mocks

## Authentication (Node — Azure Identity / MSAL Node)

Both `@equinor/fusion-framework-module-azure-identity/mock` and
`@equinor/fusion-framework-module-msal-node/mock` export the same shape:
`enableAuthMock(configurator, configure?)` and `MockAuthProvider`. Use these instead of
`token_only` mode when a test must exercise login/logout or token-refresh/expiry logic, not just a
single fixed token:

```typescript
import { enableAuthMock } from '@equinor/fusion-framework-module-azure-identity/mock';

const auth = enableAuthMock(configurator, (auth) => {
  auth.setAccount({ username: 'ada@equinor.com', signedOut: true });
});

await auth.login({ request: { scopes: ['User.Read'] } });
const token = await auth.acquireAccessToken({ request: { scopes: ['User.Read'] } });

// simulate an expired token, to exercise a consuming application's refresh path
auth.setExpiresOn(new Date(Date.now() - 1000));
```

`MockAuthProvider` registers exactly like any other `IAuthProvider` implementation — no
special-cased wiring — and makes no real network calls.
