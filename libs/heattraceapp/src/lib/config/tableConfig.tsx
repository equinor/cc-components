import { ColDef, GridConfig, ICellRendererProps } from '@equinor/workspace-fusion/grid';
import { HeatTrace } from '@cc-components/heattraceshared';
import { FilterState } from '@equinor/workspace-fusion/filter';
import {
  defaultGridOptions,
  useGridDataSource,
} from '@cc-components/shared/workspace-config';
import {
  DateCell,
  DescriptionCell,
  LinkCell,
  StatusCircle,
  StyledMonospace,
  statusColorMap,
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
    headerName: 'Tag',
    valueGetter: (pkg) => pkg.data?.heatTraceCableNo,
    cellRenderer: (props: ICellRendererProps<HeatTrace, string>) => {
      return (
        <LinkCell url={props.data?.heatTraceCableUrl ?? ''} urlText={props.value ?? ''} />
      );
    },
  },
  {
    colId: 'HeatTraceCableDescription',
    headerName: 'Description',
    valueGetter: (pkg) => pkg.data?.heatTraceCableDescription,
    cellRenderer: (props: ICellRendererProps<HeatTrace, string | null>) => {
      return <DescriptionCell description={props.value} />;
    },
    width: 300,
  },
  {
    colId: '',
    headerName: 'MC Handover Status',
    valueGetter: (pkg) => 'todo',
  },
  {
    colId: 'Priority1',
    headerName: 'Comm Priority 1',
    valueGetter: (pkg) => pkg.data?.priority1,
  },
  {
    colId: 'Priority2',
    headerName: 'Comm Priority 2',
    valueGetter: (pkg) => pkg.data?.priority2,
  },
  {
    colId: 'Priority3',
    headerName: 'Comm Priority 3',
    valueGetter: (pkg) => pkg.data?.priority3,
  },
  {
    colId: 'CommissioningIdentifier',
    headerName: 'MC responsible',
    valueGetter: (pkg) => 'todo',
  },
  {
    colId: 'MechanicalCompletionResponsible',
    headerName: 'MC responsible',
    valueGetter: (pkg) => pkg.data?.mechanicalCompletionResponsible,
  },
  {
    colId: 'MechanicalCompletionPhase',
    headerName: 'MC phase',
    valueGetter: (pkg) => 'todo',
  },
  {
    colId: 'Location',
    headerName: 'Location',
    valueGetter: (pkg) => pkg.data?.location,
    cellRenderer: (props: ICellRendererProps<HeatTrace, string>) => {
      return <StyledMonospace>{props.value}</StyledMonospace>;
    },
  },
  // Need to implement the visual checklistStatus
  { headerName: 'Checklist status', valueGetter: (pkg) => pkg.data?.formStatus },
  { headerName: 'Current step', valueGetter: (pkg) => pkg.data?.checklistStep },
  {
    headerName: 'RFC',
    valueGetter: (pkg) => pkg.data?.rfCPlannedForecastDate,
    cellRenderer: (props: ICellRendererProps<HeatTrace, string | null | undefined>) => {
      return props.value ? <DateCell dateString={props.value} /> : null;
    },
  },
  {
    headerName: 'Pipetests',
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
