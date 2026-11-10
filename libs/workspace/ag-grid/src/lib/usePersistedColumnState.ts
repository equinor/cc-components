import { ColDef, ColumnState, GridApi, GridState } from '@equinor/fusion-framework-react-ag-grid/community';
import { usePersistedState } from '@equinor/workspace-core';
import { useCallback, useMemo, useRef } from 'react';

type PersistedState = { fingerprint: string; state: ColumnState[] };

function computeFingerprint(columnDefs: ColDef[]): string {
  return JSON.stringify(columnDefs);
}

function usePersistedColumnStateItem(storageKey: string | undefined) {
  return usePersistedState<PersistedState>(storageKey, { legacyKey: storageKey });
}

function columnStateToGridState(states: ColumnState[]): GridState {
  return {
    partialColumnState: true,
    columnSizing: {
      columnSizingModel: states
        .filter((s) => s.width != null || s.flex != null)
        .map((s) => ({
          colId: s.colId,
          ...(s.width != null ? { width: s.width } : {}),
          ...(s.flex != null ? { flex: s.flex } : {}),
        })),
    },
    columnOrder: {
      orderedColIds: states.map((s) => s.colId),
    },
    columnVisibility: {
      hiddenColIds: states.filter((s) => s.hide).map((s) => s.colId),
    },
    columnPinning: {
      leftColIds: states.filter((s) => s.pinned === 'left').map((s) => s.colId),
      rightColIds: states.filter((s) => s.pinned === 'right').map((s) => s.colId),
    },
    sort: {
      sortModel: states
        .filter((s): s is ColumnState & { sort: 'asc' | 'desc' } => s.sort != null)
        .sort((a, b) => (a.sortIndex ?? 0) - (b.sortIndex ?? 0))
        .map((s) => ({ colId: s.colId, sort: s.sort })),
    },
  };
}

const PROGRAMMATIC_SOURCES = [
  'sizeColumnsToFit',
  'autosizeColumns',
  'flex',
  'columnMoved',
  'columnSetMinWidth',
  'columnSetMaxWidth',
  'columnSetActualWidth',
] as const;

/** Latest persisted column order, or null when none matches the current column definitions. */
export function usePersistedColumnOrder(storageKey: string | undefined, columnDefs: ColDef[]): string[] | null {
  const { value: persisted } = usePersistedColumnStateItem(storageKey);
  const fingerprint = useMemo(() => computeFingerprint(columnDefs), [columnDefs]);
  return useMemo(
    () => (persisted?.fingerprint === fingerprint ? persisted.state.map((s) => s.colId) : null),
    [persisted, fingerprint]
  );
}

export function usePersistedColumnState(storageKey: string | undefined, columnDefs: ColDef[]) {
  const fingerprint = useMemo(
    () => (storageKey ? computeFingerprint(columnDefs) : ''),
    [storageKey, columnDefs],
  );

  const { value: persisted, setValue, isLoaded } = usePersistedColumnStateItem(storageKey);

  // AG Grid only reads initialState on creation, so keep the value that was loaded first.
  const loadedStateRef = useRef<{ value: PersistedState | undefined } | null>(null);
  if (isLoaded && !loadedStateRef.current) {
    loadedStateRef.current = { value: persisted };
  }
  const loadedState = loadedStateRef.current?.value;

  const hasPersistedState = storageKey ? persisted?.fingerprint === fingerprint : false;

  const initialGridState = useMemo((): GridState | null => {
    if (!storageKey || !loadedState || loadedState.fingerprint !== fingerprint) {
      return null;
    }
    return columnStateToGridState(loadedState.state);
  }, [storageKey, fingerprint, loadedState]);

  const saveColumnState = useCallback(
    (api: GridApi, source?: string) => {
      if (!storageKey) return;
      if (source && (PROGRAMMATIC_SOURCES as readonly string[]).includes(source)) return;
      setValue({ fingerprint, state: api.getColumnState() });
    },
    [storageKey, fingerprint, setValue],
  );

  const clearColumnState = useCallback(
    (api: GridApi) => {
      setValue(undefined);
      api.resetColumnState();
    },
    [setValue],
  );

  return { saveColumnState, clearColumnState, hasPersistedState, initialGridState, isLoaded };
}
