import { CsvExportColumn } from '@equinor/workspace-fusion/grid';
import { FilterState } from '@equinor/workspace-fusion/filter';

export type CsvExportRequest = {
  filter: FilterState;
  columns: CsvExportColumn[];
  orderBy?: string;
  descending?: boolean;
};

export async function downloadCsv(
  fetcher: (url: string, init: RequestInit) => Promise<Response>,
  url: string,
  body: CsvExportRequest,
  filename: string,
  contextId: string
): Promise<void> {
  const res = await fetcher(url, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'x-fusion-context-id': contextId,
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    throw new Error(`CSV export failed: ${res.status}`);
  }

  const blob = await res.blob();
  const a = document.createElement('a');
  a.href = URL.createObjectURL(new Blob([blob], { type: 'text/csv' }));
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(a.href);
}
