import { useSuspenseQuery, useQueryClient } from '@tanstack/react-query';
import { useAppModule } from '@equinor/fusion-framework-react-app';
import type { IStateProvider } from '@equinor/fusion-framework-react-app/state';
import { migrateLegacyLocalStorage } from '@equinor/workspace-core';

type DefaultsMap = Record<string, string>;

/**
 * Suspends until a persisted lowercase-code -> id map has been read from Fusion App State,
 * migrating the legacy localStorage value first.
 */
export const usePersistedDefaults = (key: string, legacyKey: string) => {
  const stateProvider = useAppModule('state') as IStateProvider;
  const queryClient = useQueryClient();
  const queryKey = ['modelviewer', 'app-state', key];

  const { data } = useSuspenseQuery<DefaultsMap>({
    queryKey,
    queryFn: async () => {
      await migrateLegacyLocalStorage<DefaultsMap>(stateProvider, key, legacyKey);
      return (await stateProvider.getItem<DefaultsMap>(key))?.value ?? {};
    },
    staleTime: Infinity,
  });

  const getDefault = (code: string): string | undefined => data[code.toLowerCase()] || undefined;

  const setDefault = (code: string, value: string) => {
    const next = { ...(queryClient.getQueryData<DefaultsMap>(queryKey) ?? {}), [code.toLowerCase()]: value };
    queryClient.setQueryData(queryKey, next);
    stateProvider
      .storeItem({ key, value: next })
      .catch((error) => console.error(`Failed to persist app state "${key}":`, error));
  };

  return { getDefault, setDefault };
};
