# Bookmark and feature flag mocks

## Bookmarks

```typescript
import { enableBookmarkMock } from '@equinor/fusion-framework-module-bookmark/mock';

enableBookmarkMock(configurator, (builder) => {
  builder.setBookmarks([{ id: 'bookmark-1', name: 'My Bookmark', appKey: 'my-app', payload: {}, created: new Date(), createdBy: { id: 'mock-user', name: 'Mock User' } }]);
  builder.setCurrentBookmark('bookmark-1');
  builder.setFavorite('bookmark-1', true);
});
```

Only `IBookmarkClient` is substituted with an in-memory implementation. Create/update/delete/
favorite operations mutate that client through the real provider flows — nothing is stubbed out.
Without a real `app`/`context` module registered alongside, `resolve.application`/`resolve.context`
fall back to trivial resolvers automatically (registering a real one still wins).

## Feature flags

```typescript
import { enableFeatureFlagMock } from '@equinor/fusion-framework-module-feature-flag/mock';

enableFeatureFlagMock(configurator, (mock) => {
  mock.addFeature({ key: 'new-search', enabled: true });
});
```

No flags are assumed by default — an empty `features` object, matching the real module's
zero-plugin behavior. `setFeatures` seeds several flags; `addFeature` adds or replaces one by key.
Toggling still runs through the real `FeatureFlagProvider`; only the initial flag source is
substituted.
