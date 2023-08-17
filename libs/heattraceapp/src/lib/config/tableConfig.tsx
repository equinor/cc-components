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
    field: 'Heat Trace',
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
  //Think it should be priority1, but priority1 has no data
  { colId: 'Priority1', field: 'Priority', valueGetter: (pkg) => pkg.data?.priority2 },
  {
    colId: 'Location',
    field: 'Location',
    valueGetter: (pkg) => pkg.data?.location,
    cellRenderer: (props: ICellRendererProps<HeatTrace, string>) => {
      return <StyledMonospace>{props.value}</StyledMonospace>;
    },
  },
  { field: 'Checklist status', valueGetter: (pkg) => 't.b.d :D' },
  { field: 'Current step', valueGetter: (pkg) => 't.b.d :D' },
  // think this column only belongs to piptest
  {
    field: 'RFC',
    valueGetter: (pkg) => 'RFC',
    cellRenderer: (props: ICellRendererProps<HeatTrace, string | null | undefined>) => {
      return props.value ? <DateCell dateString={props.value} /> : null;
    },
  },
  {
    field: 'Pipetests',
    valueGetter: (pkg) => pkg.data?.pipetest,
    cellRenderer: (props: ICellRendererProps<HeatTrace, CheckList[]>) => {
      if (!props.value) return null;
      return props.value;
      // (
      //   <StyledMonospace>
      //     {generateCommaSeperatedStringArrayColumn(getHTList(props.value))}
      //   </StyledMonospace>
      // );
    },
  },
];
