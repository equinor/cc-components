import { useCurrentApp } from '@equinor/fusion-framework-react/app';
import { useEffect, useState } from 'react';

type InformationOverrides = {
  title?: string;
  dataSource?: string;
  dataRefreshRate?: string;
  access?: string;
};

/**
 * Returns the given information, with any values set under `environment.information`
 * in the app config (Fusion App Admin) taking precedence over the defaults.
 */
export function useWorkspaceInformation<T extends Required<InformationOverrides>>(
  defaults: T
): T {
  const { currentApp } = useCurrentApp();
  const [overrides, setOverrides] = useState<InformationOverrides>({});

  useEffect(() => {
    let cancelled = false;
    currentApp
      ?.getConfigAsync()
      .then((config) => {
        if (!cancelled) {
          setOverrides(
            (config?.environment as { information?: InformationOverrides } | undefined)
              ?.information ?? {}
          );
        }
      })
      .catch(() => undefined);
    return () => {
      cancelled = true;
    };
  }, [currentApp]);

  const result = { ...defaults };
  for (const key of ['title', 'dataSource', 'dataRefreshRate', 'access'] as const) {
    const value = overrides[key];
    if (typeof value === 'string' && value.trim()) {
      result[key] = value as T[typeof key];
    }
  }
  return result;
}
