import { ColDef, GridConfig, ICellRendererProps } from '@equinor/workspace-fusion/grid';
import { CheckList, HeatTrace } from '@cc-components/heattraceshared';
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

export const useTableConfig = (contextId: string): GridConfig<HeatTrace, FilterState> => {
  const client = useHttpClient();

  const { getRows, colDefs } = useGridDataSource<HeatTrace>(async (req) => {
    const res = await client.fetch(`/api/contexts/${contextId}/heat-trace/grid`, req);
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
    columnDefinitions: colDefs as [ColDef<HeatTrace>, ...ColDef<HeatTrace>[]],
  };
};

const columnDefinitions: [ColDef<HeatTrace>, ...ColDef<HeatTrace>[]] = [
  {
    colId: 'HeatTraceCableNo',
    field: 'Tag',
    valueGetter: (pkg) => pkg.data?.heatTraceCableNo,
    cellRenderer: (props: ICellRendererProps<HeatTrace, string>) => {
      return <StyledMonospace>{props.value}</StyledMonospace>;
    },
  },
  {
    colId: 'HeatTraceCableDescription',
    field: 'Description',
    valueGetter: (pkg) => pkg.data?.heatTraceCableDescription,
    cellRenderer: (props: ICellRendererProps<HeatTrace, string | null>) => {
      return <DescriptionCell description={props.value} />;
    },
    width: 300,
  },
  { colId: 'Priority1', field: 'Priority1', valueGetter: (pkg) => pkg.data?.priority1 },
  {
    colId: 'Location',
    field: 'Location',
    valueGetter: (pkg) => pkg.data?.location,
    cellRenderer: (props: ICellRendererProps<HeatTrace, string>) => {
      return <StyledMonospace>{props.value}</StyledMonospace>;
    },
  },
  // Need to implement the visual checklistStatus
  { field: 'Checklist status', valueGetter: (pkg) => pkg.data?.status },
  { field: 'Current step', valueGetter: (pkg) => 't.b.d :D' },
  {
    field: 'RFC',
    valueGetter: (pkg) => pkg.data?.rfC_Planned_Forecast_Date,
    cellRenderer: (props: ICellRendererProps<HeatTrace, string | null | undefined>) => {
      return props.value ? <DateCell dateString={props.value} /> : null;
    },
  },
  {
    field: 'Pipetests',
    valueGetter: (pkg) => pkg.data?.pipetest,
    cellRenderer: (props: ICellRendererProps<HeatTrace, string>) => {
      if (!props.value) return null;
      return <StyledMonospace>{props.value}</StyledMonospace>;
      // (
      //   <StyledMonospace>
      //     {generateCommaSeperatedStringArrayColumn(getHTList(props.value))}
      //   </StyledMonospace>
      // );
    },
  },
];
