import { ColDef, GridConfig, ICellRendererProps } from '@equinor/workspace-fusion/grid';
import { Pipetest } from '@cc-components/pipingshared';
import { FilterState } from '@equinor/workspace-fusion/filter';
import {
  defaultGridOptions,
  useGridDataSource,
} from '@cc-components/shared/workspace-config';
import {
  DateCell,
  DescriptionCell,
  StyledMonospace,
  domainNames,
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
    colId: 'pipetestNo',
    valueGetter: (element) => element.data?.pipetestNo,
    cellRenderer: (props: ICellRendererProps<Pipetest, string>) => {
      return <StyledMonospace>{props.value}</StyledMonospace>;
    },
  },
  {
    headerName: 'Description',
    colId: 'description',
    valueGetter: (element) => element.data?.description,
    cellRenderer: (props: ICellRendererProps<Pipetest, string | null>) => {
      return <DescriptionCell description={props.value} />;
    },
    width: 300,
  },
  {
    headerName: domainNames.priority1,
    colId: 'priority1',
    valueGetter: (element) => element.data?.priority1,
  },
  {
    headerName: domainNames.priority2,
    colId: 'priority2',
    valueGetter: (element) => element.data?.priority2,
  },
  {
    headerName: domainNames.priority3,
    colId: 'priority3',
    valueGetter: (element) => element.data?.priority3,
  },
  {
    headerName: domainNames.mcLocation,
    colId: 'location',
    valueGetter: (element) => element.data?.location,
    cellRenderer: (props: ICellRendererProps<Pipetest, string>) => {
      return <StyledMonospace>{props.value}</StyledMonospace>;
    },
  },
  {
    headerName: domainNames.checklistStatus,
    colId: 'formStatus',
    valueGetter: (element) => element.data?.formStatus,
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
    colId: 'mechanicalCompletionHandoverStatus',
    valueGetter: (element) => '', // TODO: Add this once it is ready in the backend
  },
  {
    headerName: 'MC Handover Status',
    colId: 'mechanicalCompletionHandoverStatus',
    valueGetter: (element) => '', // TODO: Add this once it is ready in the backend
  },
  {
    headerName: domainNames.mcResponsible,
    colId: 'mechanicalCompletionResponsible',
    valueGetter: (element) => element.data?.mechanicalCompletionResponsible,
  },
  {
    headerName: domainNames.mcPhase,
    colId: 'mechanicalCompletionPhase',
    valueGetter: (element) => '', // TODO: Add this once it is ready in the backend
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