import { useCallback, useEffect, useRef, useState } from 'react';
import { from, switchMap } from 'rxjs';
import { useAppModule } from '@equinor/fusion-framework-react-app';
import { useFramework } from '@equinor/fusion-framework-react-app/framework';
import type { AllowedValue, IStateProvider } from '@equinor/fusion-framework-react-app/state';

const MIGRATION_MARKER_PREFIX = 'cc.appState.migrated.';

export type PersistedStateOptions<T> = {
  /** localStorage key that held this value before the move to Fusion App State. */
  legacyKey?: string;
  /** Converts the raw legacy localStorage string to the new value. Defaults to JSON.parse. Return undefined to skip. */
  parseLegacy?: (raw: string) => T | undefined;
};

const parseJson = <T>(raw: string): T | undefined => {
  try {
    return JSON.parse(raw) as T;
  } catch {
    return undefined;
  }
};

const pendingMigrations = new WeakMap<IStateProvider, Map<string, Promise<void>>>();

/** Key of the running Fusion app, used to scope per-browser migration bookkeeping. */
export function useCurrentAppKey(): string | undefined {
  const modules = useFramework().modules as {
    app?: { current?: { appKey: string } | null };
  };
  return modules.app?.current?.appKey;
}

/**
 * Copies a legacy localStorage value into Fusion App State once per app and browser.
 * Legacy keys are left in place because several were shared by every app on the portal origin.
 * The "migrated" marker lives in this browser's localStorage, not in App State, so resetting
 * App State does not re-import old values here, and other browsers can still import their own.
 * Explicit resets are stored as `null` in App State, so they are never overwritten by a migration.
 * The returned promise never rejects; failed attempts are retried on the next call.
 */
export function migrateLegacyLocalStorage<T extends AllowedValue>(
  stateProvider: IStateProvider,
  appKey: string | undefined,
  key: string,
  legacyKey: string,
  parseLegacy: (raw: string) => T | undefined = parseJson
): Promise<void> {
  const markerKey = `${MIGRATION_MARKER_PREFIX}${appKey ?? 'unknown'}.${key}`;
  if (localStorage.getItem(markerKey)) return Promise.resolve();

  let pending = pendingMigrations.get(stateProvider);
  if (!pending) {
    pending = new Map();
    pendingMigrations.set(stateProvider, pending);
  }
  const cache = pending;
  const existing = cache.get(key);
  if (existing) return existing;

  const migration: Promise<void> = (async () => {
    if ((await stateProvider.getItem(key)) === null) {
      const raw = localStorage.getItem(legacyKey);
      let value: T | undefined;
      try {
        value = raw === null ? undefined : parseLegacy(raw);
      } catch {
        value = undefined;
      }
      if (value !== undefined) {
        await stateProvider.storeItem({ key, value });
      }
    }
    localStorage.setItem(markerKey, 'true');
  })().catch((error) => {
    if (cache.get(key) === migration) cache.delete(key);
    console.error(`Failed to migrate localStorage "${legacyKey}" to app state "${key}":`, error);
  });

  cache.set(key, migration);
  return migration;
}

type Snapshot<T> = { key: string | undefined; value: T | undefined; isLoaded: boolean };

/**
 * Persists a value in Fusion App State (scoped to the current app), migrating any legacy
 * localStorage value on first use. Unlike `useAppState`, the key may change between renders,
 * and `isLoaded` reports when the stored value has been read.
 */
export function usePersistedState<T extends AllowedValue>(
  key: string | undefined,
  options: PersistedStateOptions<T> = {}
) {
  const stateProvider = useAppModule('state') as IStateProvider;
  const appKey = useCurrentAppKey();
  const { legacyKey } = options;
  const parseLegacyRef = useRef(options.parseLegacy);
  parseLegacyRef.current = options.parseLegacy;

  const [snapshot, setSnapshot] = useState<Snapshot<T>>({ key, value: undefined, isLoaded: !key });
  const current = snapshot.key === key ? snapshot : { key, value: undefined, isLoaded: !key };
  const valueRef = useRef(current.value);
  valueRef.current = current.value;

  const migrate = useCallback(
    (forKey: string) =>
      legacyKey
        ? migrateLegacyLocalStorage(stateProvider, appKey, forKey, legacyKey, parseLegacyRef.current)
        : Promise.resolve(),
    [stateProvider, appKey, legacyKey]
  );

  useEffect(() => {
    if (!key) return;
    const subscription = from(migrate(key))
      .pipe(switchMap(() => from(stateProvider.observeItem<T>(key))))
      .subscribe({
        next: (item) => setSnapshot({ key, value: item?.value ?? undefined, isLoaded: true }),
        error: (error) => {
          console.error(`Failed to read app state "${key}":`, error);
          setSnapshot((s) => (s.key === key ? { ...s, isLoaded: true } : { key, value: undefined, isLoaded: true }));
        },
      });
    return () => subscription.unsubscribe();
  }, [stateProvider, key, migrate]);

  const setValue = useCallback(
    (next: T | undefined | ((prev: T | undefined) => T | undefined)) => {
      const value =
        typeof next === 'function' ? (next as (prev: T | undefined) => T | undefined)(valueRef.current) : next;
      valueRef.current = value;
      setSnapshot({ key, value, isLoaded: true });
      if (!key) return;
      // Wait for migration so it cannot overwrite this newer value; store resets as null so
      // migration treats them as an existing value.
      migrate(key)
        .then(() => stateProvider.storeItem({ key, value: value ?? null }))
        .catch((error) => console.error(`Failed to persist app state "${key}":`, error));
    },
    [stateProvider, key, migrate]
  );

  return { value: current.value, setValue, isLoaded: current.isLoaded };
}
