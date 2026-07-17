import { ColDef, CsvExportColumn, GridConfig, ICellRendererProps } from '@equinor/workspace-fusion/grid';
import { HeatTrace } from '@cc-components/heattraceshared';
import { FilterState } from '@equinor/workspace-fusion/filter';
import {
  defaultGridOptions,
  defaultModules,
  downloadCsv,
  useGridDataSource,
} from '@cc-components/shared/workspace-config';
import {
  BaseStatus,
  DateCell,
  DescriptionCell,
  LinkCell,
  StatusCircle,
  StyledMonospace,
  domainNames,
  pipetestStatusColormap,
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
  }, columnDefinitions, 'cc.heattrace.grid.columnState');

  async function fetchCsvExport(
    filterState: FilterState,
    columns: CsvExportColumn[],
    sort?: { colId: string; descending: boolean }
  ) {
    await downloadCsv(
      (url, init) => client.fetch(url, init),
      `/api/contexts/${contextId}/heat-trace/csv-export`,
      { filter: filterState, columns, orderBy: sort?.colId, descending: sort?.descending },
      'heattrace-export.csv',
      contextId
    );
  }

  return {
    gridOptions: {
      ...defaultGridOptions,
      onFirstDataRendered: (e) => {
        e.api.autoSizeColumns(
          e.api
            .getAllDisplayedColumns()
            .filter((column) => column.getColId() !== 'description')
        );
      },
    },
    getRows: getRows,
    columnDefinitions: colDefs as [ColDef<HeatTrace>, ...ColDef<HeatTrace>[]],
    modules: defaultModules,
    csvExport: fetchCsvExport,
    storageKey: 'cc.heattrace.grid.columnState',
  };
};

const columnDefinitions: [ColDef<HeatTrace>, ...ColDef<HeatTrace>[]] = [
  {
    colId: 'HeatTraceCableNo',
    headerName: domainNames.tag,
    valueGetter: (pkg) => pkg.data?.heatTraceCableNo,
    cellRenderer: (props: ICellRendererProps<HeatTrace, string>) => {
      return (
        <LinkCell
          url={props.data?.heatTraceCableUrl ?? ''}
          urlText={props.value ?? ''}
          aiLinkLocation="heat-trace grid"
          aiLinktype="HeatTraceCableNo"
        />
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
    colId: 'Priority1',
    headerName: domainNames.commPriority1,
    valueGetter: (pkg) => pkg.data?.priority1,
  },
  {
    colId: 'Priority2',
    headerName: domainNames.commPriority2,
    valueGetter: (pkg) => pkg.data?.priority2,
  },
  {
    colId: 'Priority3',
    headerName: domainNames.commPriority3,
    valueGetter: (pkg) => pkg.data?.priority3,
  },
  {
    colId: 'Location',
    headerName: domainNames.mcLocation,
    valueGetter: (pkg) => pkg.data?.location,
    cellRenderer: (props: ICellRendererProps<HeatTrace, string>) => {
      return <StyledMonospace>{props.value}</StyledMonospace>;
    },
  },
  {
    colId: 'MechanicalCompletionStatus',
    headerName: domainNames.mcStatus,
    valueGetter: (pkg) => pkg.data?.mechanicalCompletionStatus,
    cellRenderer: (props: ICellRendererProps<HeatTrace, string>) => {
      if (!props.data?.mechanicalCompletionStatus) return null;
      return (
        <StatusCircle
          content={props.data.mechanicalCompletionStatus}
          statusColor={
            statusColorMap[props.data.mechanicalCompletionStatus as BaseStatus]
          }
        />
      );
    },
  },
  // Need to implement the visual checklistStatus
  {
    colId: 'FormStatus',
    headerName: domainNames.checklistStatus,
    valueGetter: (pkg) => pkg.data?.formStatus,
    cellRenderer: (props: ICellRendererProps<HeatTrace, string>) => {
      if (!props.data?.formStatus) return null;
      return (
        <StatusCircle
          content={props.data.formStatus}
          statusColor={pipetestStatusColormap[props.data.formStatus]}
        />
      );
    },
  },
  { colId: 'ChecklistStep', headerName: domainNames.currentStep, valueGetter: (pkg) => pkg.data?.checklistStep },
  {
    colId: 'RfCPlannedForecastDate',
    headerName: 'RFC',
    valueGetter: (pkg) => pkg.data?.rfCPlannedForecastDate,
    cellRenderer: (props: ICellRendererProps<HeatTrace, string | null | undefined>) => {
      return props.value ? <DateCell dateString={props.value} /> : null;
    },
  },
  {
    colId: 'CommissioningIdentifierDescription',
    headerName: domainNames.commIdentifier,
    valueGetter: (pkg) => pkg.data?.commissioningIdentifierDescription,
  },
  {
    colId: 'MechanicalCompletionHandoverStatus',
    headerName: domainNames.mcHandoverStatus,
    valueGetter: (pkg) => pkg.data?.mechanicalCompletionHandoverStatus,
  },
  {
    colId: 'MechanicalCompletionResponsible',
    headerName: domainNames.mcResponsible,
    valueGetter: (pkg) => pkg.data?.mechanicalCompletionResponsible,
  },
  {
    colId: 'MechanicalCompletionPhase',
    headerName: domainNames.mcPhase,
    valueGetter: (pkg) => pkg.data?.mechanicalCompletionPhase,
  },
  {
    colId: 'Pipetest',
    headerName: 'Pipetest',
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
