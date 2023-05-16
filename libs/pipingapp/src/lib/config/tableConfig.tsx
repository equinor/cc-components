import { GridConfig } from '@equinor/workspace-fusion/grid';
import { Pipetest } from '@cc-components/pipingshared';
import { FilterStateGroup } from '@equinor/workspace-fusion/filter';
import { defaultGridOptions } from '@cc-components/shared/workspace-config';
import data from '../../responsePiping.json' assert { type: 'json' };

const pipetests: Pipetest[] = data as any;

export const tableConfig: GridConfig<Pipetest, FilterStateGroup[]> = {
  getRows: async (args) => {
    const { request, success } = args;
    success({
      rowCount: pipetests.length,
      rowData: pipetests.slice(request.startRow, (request.endRow ?? 0) + 1),
    });
  },
  gridOptions: {
    ...defaultGridOptions,
    onFirstDataRendered: (e) => {
      e.columnApi.autoSizeColumns(
        e.columnApi.getAllDisplayedColumns().filter((s) => s.getColId() !== 'description')
      );
    },
  },
  columnDefinitions: [{ field: 'Pipetest', valueGetter: (pkg) => pkg.data?.name }],
};
