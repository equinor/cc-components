import { useSuspenseQuery, useQueryClient } from '@tanstack/react-query';
import { useAppModule } from '@equinor/fusion-framework-react-app';
import type { IStateProvider } from '@equinor/fusion-framework-react-app/state';
import { migrateLegacyLocalStorage, useCurrentAppKey } from '@equinor/workspace-core';

type DefaultsMap = Record<string, string>;

/**
 * Suspends until a persisted lowercase-code -> id map has been read from Fusion App State,
 * migrating the legacy localStorage value first. Saved defaults are optional, so a failed read
 * resolves as "no defaults" (data `null`) and is retried on the next mount instead of throwing.
 */
export const usePersistedDefaults = (key: string, legacyKey: string) => {
  const stateProvider = useAppModule('state') as IStateProvider;
  const appKey = useCurrentAppKey();
  const queryClient = useQueryClient();
  const queryKey = ['modelviewer', 'app-state', key];

  const { data } = useSuspenseQuery<DefaultsMap | null>({
    queryKey,
    queryFn: async () => {
      try {
        await migrateLegacyLocalStorage<DefaultsMap>(stateProvider, appKey, key, legacyKey);
        return (await stateProvider.getItem<DefaultsMap>(key))?.value ?? {};
      } catch (error) {
        console.error(`Failed to read app state "${key}":`, error);
        return null;
      }
    },
    staleTime: (query) => (query.state.data === null ? 0 : Infinity),
  });

  const getDefault = (code: string): string | undefined => data?.[code.toLowerCase()] || undefined;

  const setDefault = (code: string, value: string) => {
    const entry = { [code.toLowerCase()]: value };
    queryClient.setQueryData<DefaultsMap | null>(queryKey, (prev) => ({ ...prev, ...entry }));
    // Merge with the stored map so a failed initial read cannot wipe other saved defaults.
    stateProvider
      .getItem<DefaultsMap>(key)
      .then((stored) => stateProvider.storeItem({ key, value: { ...stored?.value, ...entry } }))
      .catch((error) => console.error(`Failed to persist app state "${key}":`, error));
  };

  return { getDefault, setDefault };
};
