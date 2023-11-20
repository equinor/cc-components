import { ColDef, GridConfig, ICellRendererProps } from '@equinor/workspace-fusion/grid';
import { CheckList, Pipetest } from '@cc-components/pipingshared';
import { FilterState } from '@equinor/workspace-fusion/filter';
import {
  defaultGridOptions,
  useGridDataSource,
} from '@cc-components/shared/workspace-config';
import {
  DateCell,
  DescriptionCell,
  StyledMonospace,
  useHttpClient,
} from '@cc-components/shared';
import { generateCommaSeperatedStringArrayColumn } from '../utils-table/generateCommaSeperatedStringArrayColumn';
import { getHTList } from '../utils-table/tableHelpers';

export const useTableConfig = (contextId: string): GridConfig<Pipetest, FilterState> => {
  const client = useHttpClient();

  const { getRows, colDefs } = useGridDataSource<Pipetest>(async (req) => {
    const res = await client.fetch(`/api/contexts/${contextId}/pipetest/grid`, req);
    const meta = await res.json();

    return {
      rowCount: meta.rowCount,
      items: meta.items,
      columnDefinitions: meta.columnDefinitions,
    };
  }, columnDefinitions);
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
    columnDefinitions: colDefs as [ColDef<Pipetest>, ...ColDef<Pipetest>[]],
  };
};

const columnDefinitions: [ColDef<Pipetest>, ...ColDef<Pipetest>[]] = [
  {
    headerName: 'Pipetest',
    valueGetter: (pkg) => pkg.data?.id,
    cellRenderer: (props: ICellRendererProps<Pipetest, string>) => {
      return <StyledMonospace>{props.value}</StyledMonospace>;
    },
  },
  {
    headerName: 'Description',
    colId: 'description',
    valueGetter: (pkg) => pkg.data?.description,
    cellRenderer: (props: ICellRendererProps<Pipetest, string | null>) => {
      return <DescriptionCell description={props.value} />;
    },
    width: 300,
  },
  { headerName: 'Priority', valueGetter: (pkg) => pkg.data?.commPkPriority1 },
  {
    headerName: 'Location',
    valueGetter: (pkg) => pkg.data?.location,
    cellRenderer: (props: ICellRendererProps<Pipetest, string>) => {
      return <StyledMonospace>{props.value}</StyledMonospace>;
    },
  },
  { headerName: 'Checklist status', valueGetter: (pkg) => 't.b.d :D' },
  { headerName: 'Current step', valueGetter: (pkg) => 't.b.d :D' },
  {
    headerName: 'RFC',
    valueGetter: (pkg) => pkg.data?.rfccPlanned,
    cellRenderer: (props: ICellRendererProps<Pipetest, string | null | undefined>) => {
      return props.value ? <DateCell dateString={props.value} /> : null;
    },
  },
  {
    headerName: 'HT cables',
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
];
