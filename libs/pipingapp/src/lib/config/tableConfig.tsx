import { ColDef, CsvExportColumn, GridConfig, ICellRendererProps } from '@equinor/workspace-fusion/grid';
import {
  Pipetest,
  PipetestWorkflowStep,
  mapWorkflowStepsToStep,
} from '@cc-components/pipingshared';
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
  WorkflowVisual,
  domainNames,
  pipetestStatusColormap,
  useHttpClient,
} from '@cc-components/shared';
import { generateCommaSeperatedString } from '../utils-table/tableHelpers';

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
  }, columnDefinitions, 'cc.piping.grid.columnState');

  async function fetchCsvExport(
    filterState: FilterState,
    columns: CsvExportColumn[],
    sort?: { colId: string; descending: boolean }
  ) {
    await downloadCsv(
      (url, init) => client.fetch(url, init),
      `/api/contexts/${contextId}/pipetest/csv-export`,
      { filter: filterState, columns, orderBy: sort?.colId, descending: sort?.descending },
      'piping-export.csv',
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
            .filter((column) => column.getColId() !== 'Description')
        );
      },
    },
    getRows: getRows,
    columnDefinitions: colDefs as [ColDef<Pipetest>, ...ColDef<Pipetest>[]],
    modules: defaultModules,
    csvExport: fetchCsvExport,
    storageKey: 'cc.piping.grid.columnState',
  };
};

const columnDefinitions: [ColDef<Pipetest>, ...ColDef<Pipetest>[]] = [
  {
    headerName: 'Pipetest',
    colId: 'PipetestNo',
    valueGetter: (element) => element.data?.pipetestNo,
    cellRenderer: (props: ICellRendererProps<Pipetest, string>) => (
      <LinkCell
        url={props.data?.mechanicalCompletionUrl}
        urlText={props.value ?? ''}
        aiLinkLocation="pipetest grid"
        aiLinktype="PipetestNo"
      />
    ),
  },
  {
    headerName: 'Description',
    colId: 'Description',
    valueGetter: (element) => element.data?.description,
    cellRenderer: (props: ICellRendererProps<Pipetest, string | null>) => (
      <DescriptionCell description={props.value} />
    ),
    width: 300,
  },
  {
    headerName: domainNames.commPriority1,
    colId: 'Priority1',
    valueGetter: (element) => element.data?.priority1,
  },
  {
    headerName: domainNames.commPriority2,
    colId: 'Priority2',
    valueGetter: (element) => element.data?.priority2,
  },
  {
    headerName: domainNames.commPriority3,
    colId: 'Priority3',
    valueGetter: (element) => element.data?.priority3,
  },
  {
    headerName: domainNames.mcLocation,
    colId: 'Location',
    valueGetter: (element) => element.data?.location,
  },
  {
    headerName: domainNames.checklistStatus,
    colId: 'Workflow',
    valueGetter: (element) => element.data?.workflow,
    cellRenderer: (props: ICellRendererProps<Pipetest, PipetestWorkflowStep[]>) => {
      if (!props.value) return;

      return <WorkflowVisual workflowSteps={mapWorkflowStepsToStep(props.value)} />;
    },
  },
  {
    headerName: domainNames.mcStatus,
    colId: 'MechanicalCompletionStatus',
    valueGetter: (element) => element.data?.mechanicalCompletionStatus,
    cellRenderer: (props: ICellRendererProps<Pipetest, string | null>) => {
      if (!props.value) return;
      return (
        <StatusCircle
          content={props.value}
          statusColor={pipetestStatusColormap[props.value as BaseStatus]}
        />
      );
    },
  },
  {
    headerName: domainNames.currentStep,
    colId: 'ChecklistStep',
    valueGetter: (element) => element.data?.checklistStep,
  },
  {
    headerName: 'RFC',
    colId: 'RfCPlannedForecastDate',
    valueGetter: (element) => element.data?.rfCPlannedForecastDate,
    cellRenderer: (props: ICellRendererProps<Pipetest, string | null | undefined>) => {
      return props.value ? <DateCell dateString={props.value} /> : null;
    },
  },
  {
    headerName: domainNames.commIdentifier,
    colId: 'CommissioningIdentifierCode',
    valueGetter: (element) => element.data?.commissioningIdentifierCode,
  },
  {
    headerName: 'MC Handover Status',
    colId: 'MechanicalCompletionHandoverStatus',
    valueGetter: (element) => element.data?.mechanicalCompletionHandoverStatus,
  },
  {
    headerName: domainNames.mcResponsible,
    colId: 'MechanicalCompletionResponsible',
    valueGetter: (element) => element.data?.mechanicalCompletionResponsible,
  },
  {
    headerName: domainNames.mcPhase,
    colId: 'MechanicalCompletionPhase',
    valueGetter: (element) => element.data?.mechanicalCompletionPhase,
  },
  {
    headerName: 'HT cables',
    colId: 'HeatTraceCableNos',
    valueGetter: (element) => element.data?.heatTraceCableNos,
    cellRenderer: (props: ICellRendererProps<Pipetest, string | null>) => {
      const values = generateCommaSeperatedString(props.data?.heatTraceCableNos ?? []);
      return <DescriptionCell description={values} />;
    },
  },
];
