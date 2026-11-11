# Analytics, telemetry and event observation

## Analytics

```typescript
import { enableAnalytics } from '@equinor/fusion-framework-module-analytics';
import { MockAnalyticsAdapter } from '@equinor/fusion-framework-module-analytics/mock';

const recorder = new MockAnalyticsAdapter();

enableAnalytics(configurator, (builder) => {
  builder.setAdapter('mock', async () => recorder);
});

const event = await recorder.waitForAnalytic('button-click');
expect(event.attributes?.section).toBe('header');

recorder.getAnalytics('page-view'); // synchronous, filtered by name/array/predicate
```

`MockAnalyticsAdapter` is a genuine `IAnalyticsAdapter` — registering it works through the real
`enableAnalytics` pipeline like any other adapter. `waitForAnalytic(matcher, options?)` accepts
`timeout`/`signal` and rejects if the adapter is disposed (`[Symbol.dispose]()`) before a match.

## Telemetry

```typescript
import { enableTelemetryMock } from '@equinor/fusion-framework-module-telemetry/mock';

let recorder;
enableTelemetryMock(configurator, (builder) => {
  recorder = builder.adapter;
});

const item = await recorder.waitForItem('button-click');
expect(item.properties?.section).toBe('header');
```

`TelemetryMockConfigurator` registers one fresh, empty `MockTelemetryAdapter` under the `mock`
adapter id per configurator instance — recorded items are not shared across test instances.
`getItems(matcher?)` reads synchronously; `waitForItem` waits for an existing or future match with
an optional `timeout`/`signal`.

## Events (observation only, no mock)

```typescript
import { waitForEvent, watchEvents } from '@equinor/fusion-framework-module-event/utils';

const event = await waitForEvent(modules.event, 'myFeature.saved', { timeout: 1000 });

const handle = watchEvents(modules.event, ['myFeature.saved', 'myFeature.deleted']);
// ... exercise the code under test ...
expect(handle.events).toHaveLength(2);
handle.dispose();
```

`matcher` accepts a type string, an array of types, or a predicate over the payload. Both work
against the real event provider — a mocked host framework, an app test fixture, or a hand-rolled
`ModulesConfigurator` — with no mock, no test-runner dependency. They **observe** dispatched
events only; to intercept or cancel one before dispatch, configure the module's `onDispatch` hook
instead.
