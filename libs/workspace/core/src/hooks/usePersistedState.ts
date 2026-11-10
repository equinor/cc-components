import { useCallback, useEffect, useRef, useState } from 'react';
import { from, switchMap } from 'rxjs';
import { useAppModule } from '@equinor/fusion-framework-react-app';
import type { AllowedValue, IStateProvider } from '@equinor/fusion-framework-react-app/state';

const MIGRATION_MARKER_PREFIX = 'cc.migrations.localStorage.';

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

/**
 * Copies a legacy localStorage value into Fusion App State once per app.
 * Legacy keys are left in place because several were shared by every app on the portal origin,
 * so a marker item prevents re-importing them after the user resets their settings.
 */
export function migrateLegacyLocalStorage<T extends AllowedValue>(
  stateProvider: IStateProvider,
  key: string,
  legacyKey: string,
  parseLegacy: (raw: string) => T | undefined = parseJson
): Promise<void> {
  let pending = pendingMigrations.get(stateProvider);
  if (!pending) {
    pending = new Map();
    pendingMigrations.set(stateProvider, pending);
  }
  const existing = pending.get(key);
  if (existing) return existing;

  const migration = (async () => {
    const markerKey = `${MIGRATION_MARKER_PREFIX}${key}`;
    if (await stateProvider.getItem(markerKey)) return;
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
    await stateProvider.storeItem({ key: markerKey, value: true });
  })().catch((error) => {
    console.error(`Failed to migrate localStorage "${legacyKey}" to app state "${key}":`, error);
  });

  pending.set(key, migration);
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
  const { legacyKey } = options;
  const parseLegacyRef = useRef(options.parseLegacy);
  parseLegacyRef.current = options.parseLegacy;

  const [snapshot, setSnapshot] = useState<Snapshot<T>>({ key, value: undefined, isLoaded: !key });
  const current = snapshot.key === key ? snapshot : { key, value: undefined, isLoaded: !key };
  const valueRef = useRef(current.value);
  valueRef.current = current.value;

  useEffect(() => {
    if (!key) return;
    const migration = legacyKey
      ? migrateLegacyLocalStorage(stateProvider, key, legacyKey, parseLegacyRef.current)
      : Promise.resolve();

    const subscription = from(migration)
      .pipe(switchMap(() => from(stateProvider.observeItem<T>(key))))
      .subscribe({
        next: (item) => setSnapshot({ key, value: item?.value ?? undefined, isLoaded: true }),
        error: (error) => {
          console.error(`Failed to read app state "${key}":`, error);
          setSnapshot((s) => (s.key === key ? { ...s, isLoaded: true } : { key, value: undefined, isLoaded: true }));
        },
      });
    return () => subscription.unsubscribe();
  }, [stateProvider, key, legacyKey]);

  const setValue = useCallback(
    (next: T | undefined | ((prev: T | undefined) => T | undefined)) => {
      const value =
        typeof next === 'function' ? (next as (prev: T | undefined) => T | undefined)(valueRef.current) : next;
      valueRef.current = value;
      setSnapshot({ key, value, isLoaded: true });
      if (!key) return;
      const write =
        value === undefined ? stateProvider.removeItem(key) : stateProvider.storeItem({ key, value });
      write.catch((error) => console.error(`Failed to persist app state "${key}":`, error));
    },
    [stateProvider, key]
  );

  return { value: current.value, setValue, isLoaded: current.isLoaded };
}
