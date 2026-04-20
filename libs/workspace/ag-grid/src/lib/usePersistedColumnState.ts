import { ColDef, ColumnState, GridApi, GridReadyEvent, GridState } from '@equinor/fusion-framework-react-ag-grid/community';
import { useCallback, useMemo, useRef } from 'react';

type PersistedState = { fingerprint: string; state: ColumnState[] };

function computeFingerprint(columnDefs: ColDef[]): string {
  return JSON.stringify(columnDefs);
}

function readFromStorage(key: string): PersistedState | null {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as PersistedState) : null;
  } catch {
    return null;
  }
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

export function clearPersistedColumnState(storageKey: string, api: GridApi): void {
  localStorage.removeItem(storageKey);
  api.resetColumnState();
}

export function hasPersistedColumnState(storageKey: string | undefined, columnDefs: ColDef[]): boolean {
  if (!storageKey) return false;
  const persisted = readFromStorage(storageKey);
  return persisted?.fingerprint === computeFingerprint(columnDefs);
}

export function getPersistedColumnOrder(storageKey: string | undefined, columnDefs: ColDef[]): string[] | null {
  if (!storageKey) return null;
  const persisted = readFromStorage(storageKey);
  if (persisted?.fingerprint !== computeFingerprint(columnDefs)) return null;
  return persisted.state.map((s) => s.colId);
}

export function usePersistedColumnState(storageKey: string | undefined, columnDefs: ColDef[]) {
  const fingerprint = useMemo(
    () => (storageKey ? computeFingerprint(columnDefs) : ''),
    [storageKey],
  );

  const persistedRef = useRef<PersistedState | null>(
    storageKey ? readFromStorage(storageKey) : null,
  );

  const hasPersistedState = storageKey
    ? persistedRef.current?.fingerprint === fingerprint
    : false;

  const initialGridState = useMemo((): GridState | null => {
    if (!storageKey || !persistedRef.current || persistedRef.current.fingerprint !== fingerprint) {
      return null;
    }
    return columnStateToGridState(persistedRef.current.state);
  }, [storageKey, fingerprint]);

  const onGridReady = useCallback(
    (_event: GridReadyEvent) => {
      if (!storageKey) return;
    },
    [storageKey, fingerprint],
  );

  const saveColumnState = useCallback(
    (api: GridApi, source?: string) => {
      if (!storageKey) return;
      if (source && (PROGRAMMATIC_SOURCES as readonly string[]).includes(source)) return;
      const next: PersistedState = { fingerprint, state: api.getColumnState() };
      persistedRef.current = next;
      localStorage.setItem(storageKey, JSON.stringify(next));
    },
    [storageKey, fingerprint],
  );

  return { onGridReady, saveColumnState, hasPersistedState, initialGridState };
}
