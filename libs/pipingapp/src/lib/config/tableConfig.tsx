import { ColDef, GridConfig, ICellRendererProps } from '@equinor/workspace-fusion/grid';
import { Checklist, Pipetest } from '@cc-components/pipingshared';
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
    valueGetter: (element) => element.data?.id,
    cellRenderer: (props: ICellRendererProps<Pipetest, string>) => {
      return <StyledMonospace>{props.value}</StyledMonospace>;
    },
  },
  {
    headerName: 'Description',
    colId: 'description',
    valueGetter: (pkg) => "TODO",
    cellRenderer: (props: ICellRendererProps<Pipetest, string | null>) => {
      return <DescriptionCell description={props.value} />;
    },
    width: 300,
  },
  { headerName: 'Priority1', valueGetter: (pkg) => pkg.data?.priority1 },
  {
    headerName: 'Location',
    valueGetter: (pkg) => pkg.data?.mechanicalCompletionArea,
    cellRenderer: (props: ICellRendererProps<Pipetest, string>) => {
      return <StyledMonospace>{props.value}</StyledMonospace>;
    },
  },
  { headerName: 'Checklist status', valueGetter: (item) => "TODO" },
  { headerName: 'Current step', valueGetter: (item) => "TODO" },
  {
    headerName: 'RFC',
    valueGetter: (pkg) => pkg.data?.rfCPlannedForecastDate,
    cellRenderer: (props: ICellRendererProps<Pipetest, string | null | undefined>) => {
      return props.value ? <DateCell dateString={props.value} /> : null;
    },
  },
  {
    headerName: 'HT cables',
    valueGetter: (pkg) => "TODO",
    cellRenderer: (props: ICellRendererProps<Pipetest, string | null>) => {
      return <DescriptionCell description={props.value} />;
    },
  },
];

// {generateCommaSeperatedStringArrayColumn(getHTList(props.value))}