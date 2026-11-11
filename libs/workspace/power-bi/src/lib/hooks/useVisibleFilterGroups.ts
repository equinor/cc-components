import { SetStateAction, useCallback } from 'react';
import { Report } from 'powerbi-client';
import { usePersistedState } from '@equinor/workspace-core';

const EMPTY: string[] = [];

const parseLegacyVisibleFilters = (raw: string): string[] | undefined => {
  const parsedValue = JSON.parse(raw);
  if (Array.isArray(parsedValue) && parsedValue.every((s) => typeof s === 'string')) {
    return parsedValue as string[];
  }
  return undefined;
};

export const useVisibleFilters = (report: Report) => {
  const reportId = report.getId();
  const { value, setValue, isLoaded } = usePersistedState<string[]>(
    reportId ? `workspace.powerbi.${reportId}.visibleFilters` : undefined,
    {
      legacyKey: reportId ? `${reportId}-filters` : undefined,
      parseLegacy: parseLegacyVisibleFilters,
    }
  );

  const setVisibleFilters = useCallback(
    (next: SetStateAction<string[]>) =>
      setValue((prev) => (typeof next === 'function' ? next(prev ?? EMPTY) : next)),
    [setValue]
  );

  return [value ?? EMPTY, setVisibleFilters, { storedValue: value, isLoaded }] as const;
};
