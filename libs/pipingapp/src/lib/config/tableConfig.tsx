import { GridConfig, ICellRendererProps } from '@equinor/workspace-fusion/grid';
import { CheckList, Pipetest } from '@cc-components/pipingshared';
import { FilterState } from '@equinor/workspace-fusion/filter';
import {
  defaultGridOptions,
  useGridDataSource,
} from '@cc-components/shared/workspace-config';
import { DateCell, DescriptionCell, StyledMonospace } from '@cc-components/shared';
import { generateCommaSeperatedStringArrayColumn } from '../utils-table/generateCommaSeperatedStringArrayColumn';
import { getHTList } from '../utils-table/tableHelpers';
import { useHttpClient } from '@equinor/fusion-framework-react-app/http';

const pipetests: Pipetest[] = [];

export const useTableConfig = (contextId: string): GridConfig<Pipetest, FilterState> => {
  // const client = useHttpClient('cc-api');
  // const { getRows } = useGridDataSource(async (req) => {
  //   const res = await client.fetch(`/api/contexts/${contextId}/pipetest/grid`, req);
  //   const meta = (await res.json()) as { items: any[]; rowCount: number };
  //   return {
  //     rowCount: meta.rowCount,
  //     rowData: meta.items,
  //   };
  // });

  //Temp solution while waiting on api
  const getRows = async (args: any) => {
    const { request, success } = args;
    success({
      rowCount: pipetests.length,
      rowData: pipetests.slice(request.startRow, (request.endRow ?? 0) + 1),
    });
  };
  return {
    gridOptions: {
      ...defaultGridOptions,
      onFirstDataRendered: (e) => {
        e.columnApi.autoSizeColumns(
          e.columnApi
            .getAllDisplayedColumns()
            .filter((column) => column.getColId() !== 'description')
        );
      },
    },
    getRows: getRows,
    columnDefinitions: [
      {
        field: 'Pipetest',
        valueGetter: (pkg) => pkg.data?.name,
        cellRenderer: (props: ICellRendererProps<Pipetest, string>) => {
          return <StyledMonospace>{props.value}</StyledMonospace>;
        },
      },
      {
        field: 'Description',
        colId: 'description',
        valueGetter: (pkg) => pkg.data?.description,
        cellRenderer: (props: ICellRendererProps<Pipetest, string | null>) => {
          return <DescriptionCell description={props.value} />;
        },
        width: 300,
      },
      { field: 'Priority', valueGetter: (pkg) => pkg.data?.commPkPriority1 },
      {
        field: 'Location',
        valueGetter: (pkg) => pkg.data?.location,
        cellRenderer: (props: ICellRendererProps<Pipetest, string>) => {
          return <StyledMonospace>{props.value}</StyledMonospace>;
        },
      },
      { field: 'Checklist status', valueGetter: (pkg) => 't.b.d :D' },
      { field: 'Current step', valueGetter: (pkg) => 't.b.d :D' },
      {
        field: 'RFC',
        valueGetter: (pkg) => pkg.data?.rfccPlanned,
        cellRenderer: (
          props: ICellRendererProps<Pipetest, string | null | undefined>
        ) => {
          return props.value ? <DateCell dateString={props.value} /> : null;
        },
      },
      {
        field: 'HT cables',
        valueGetter: (pkg) => pkg.data?.checkLists,
        cellRenderer: (props: ICellRendererProps<Pipetest, CheckList[]>) => {
          if (!props.value) return null;
          return (
            <StyledMonospace>
              {generateCommaSeperatedStringArrayColumn(getHTList(props.value))}
            </StyledMonospace>
          );
        },
      },
    ],
  };
};
