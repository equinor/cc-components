import { ColDef, GridConfig, ICellRendererProps } from '@equinor/workspace-fusion/grid';
import {
  Pipetest,
  PipetestWorkflowStep,
  mapWorkflowStepsToStep,
} from '@cc-components/pipingshared';
import { FilterState } from '@equinor/workspace-fusion/filter';
import {
  defaultGridOptions,
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
  }, columnDefinitions);
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
    columnDefinitions: colDefs as [ColDef<Pipetest>, ...ColDef<Pipetest>[]],
  };
};

const columnDefinitions: [ColDef<Pipetest>, ...ColDef<Pipetest>[]] = [
  {
    headerName: 'Pipetest',
    colId: 'pipetestNo',
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
    colId: 'description',
    valueGetter: (element) => element.data?.description,
    cellRenderer: (props: ICellRendererProps<Pipetest, string | null>) => (
      <DescriptionCell description={props.value} />
    ),
    width: 300,
  },
  {
    headerName: domainNames.commPriority1,
    colId: 'priority1',
    valueGetter: (element) => element.data?.priority1,
  },
  {
    headerName: domainNames.commPriority2,
    colId: 'priority2',
    valueGetter: (element) => element.data?.priority2,
  },
  {
    headerName: domainNames.commPriority3,
    colId: 'priority3',
    valueGetter: (element) => element.data?.priority3,
  },
  {
    headerName: domainNames.mcLocation,
    colId: 'location',
    valueGetter: (element) => element.data?.location,
  },
  {
    headerName: domainNames.checklistStatus,
    colId: 'workflow',
    valueGetter: (element) => element.data?.workflow,
    cellRenderer: (props: ICellRendererProps<Pipetest, PipetestWorkflowStep[]>) => {
      if (!props.value) return;

      return <WorkflowVisual workflowSteps={mapWorkflowStepsToStep(props.value)} />;
    },
  },
  {
    headerName: domainNames.mcStatus,
    colId: 'mechanicalCompletionStatus',
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
    colId: 'currentStep',
    valueGetter: (element) => element.data?.checklistStep,
  },
  {
    headerName: 'RFC',
    colId: 'rfCPlannedForecastDate',
    valueGetter: (element) => element.data?.rfCPlannedForecastDate,
    cellRenderer: (props: ICellRendererProps<Pipetest, string | null | undefined>) => {
      return props.value ? <DateCell dateString={props.value} /> : null;
    },
  },
  {
    headerName: domainNames.commIdentifier,
    colId: 'commissioningIdentifierCode',
    valueGetter: (element) => element.data?.commissioningIdentifierCode,
  },
  {
    headerName: 'MC Handover Status',
    colId: 'mechanicalCompletionHandoverStatus',
    valueGetter: (element) => element.data?.mechanicalCompletionHandoverStatus,
  },
  {
    headerName: domainNames.mcResponsible,
    colId: 'mechanicalCompletionResponsible',
    valueGetter: (element) => element.data?.mechanicalCompletionResponsible,
  },
  {
    headerName: domainNames.mcPhase,
    colId: 'mechanicalCompletionPhase',
    valueGetter: (element) => element.data?.mechanicalCompletionPhase,
  },
  {
    headerName: 'HT cables',
    colId: 'heatTraceCableNos',
    valueGetter: (element) => element.data?.heatTraceCableNos,
    cellRenderer: (props: ICellRendererProps<Pipetest, string | null>) => {
      const values = generateCommaSeperatedString(props.data?.heatTraceCableNos ?? []);
      return <DescriptionCell description={values} />;
    },
  },
];
