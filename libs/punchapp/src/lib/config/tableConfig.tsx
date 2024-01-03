import { Punch } from '@cc-components/punchshared';
import { statusColorMap } from '@cc-components/shared/mapping';
import {
  DateCell,
  DescriptionCell,
  LinkCell,
  StatusCell,
  StyledMonospace,
} from '@cc-components/shared/table-helpers';
import { hasProperty } from '@cc-components/shared/utils-typescript';
import {
  useGridDataSource,
  defaultGridOptions,
  DataResponse,
} from '@cc-components/shared/workspace-config';
import { FilterState } from '@equinor/workspace-fusion/filter';
import {
  ColDef,
  GridConfig,
  ICellRendererProps,
  MenuModule,
  ColumnsToolPanelModule,
} from '@equinor/workspace-fusion/grid';
import { useHttpClient } from '@equinor/fusion-framework-react-app/http';

export const useTableConfig = (contextId: string): GridConfig<Punch, FilterState> => {
  const client = useHttpClient('cc-api');

  const { getRows, colDefs } = useGridDataSource(async (req) => {
    const res = await client.fetch(`/api/contexts/${contextId}/punch/grid`, req);

    const meta = (await res.json()) as DataResponse<Punch>;
    return {
      rowCount: meta.rowCount,
      items: meta.items,
      columnDefinitions: meta.columnDefinitions,
    };
  }, columnDefinitions);

  return {
    getRows,
    gridOptions: {
      ...defaultGridOptions,
      onFirstDataRendered: (e) => {
        e.columnApi.autoSizeColumns(
          e.columnApi
            .getAllDisplayedColumns()
            .filter((s) => s.getColId() !== 'description')
        );
      },
    },
    columnDefinitions: colDefs as [ColDef<Punch>, ...ColDef<Punch>[]],
    modules: [MenuModule, ColumnsToolPanelModule],
  };
};

const columnDefinitions: ColDef<Punch>[] = [
  {
    colId: 'Punch',
    headerName: 'Punch',
    headerTooltip: 'Punch',
    valueGetter: (pkg) => pkg.data?.punchItemNo,
    cellRenderer: (props: ICellRendererProps<Punch, string | null | undefined>) => {
      if (!props.data?.punchUrl || !props.data?.punchItemNo) {
        return null;
      }
      return <LinkCell url={props.data.punchUrl} urlText={props.data.punchItemNo} />;
    },
    onCellClicked: () => {},
  },
  {
    headerName: 'Description',
    colId: 'description',
    headerTooltip: 'Description',
    valueGetter: (pkg) => pkg.data?.description,
    cellRenderer: (props: ICellRendererProps<Punch, string | null | undefined>) => {
      return <DescriptionCell description={props.value} />;
    },
    width: 300,
  },
  {
    colId: 'Category',
    headerName: 'Category',
    headerTooltip: 'Category',
    valueGetter: (pkg) => pkg.data?.category,
    cellRenderer: (props: ICellRendererProps<Punch, string | null | undefined>) => {
      if (!props.value) {
        return null;
      }
      const statusColor = hasProperty(statusColorMap, props.value)
        ? statusColorMap[props.value]
        : 'transparent';

      return (
        <StatusCell
          content={props.value}
          cellAttributeFn={() => ({ style: { backgroundColor: statusColor } })}
        />
      );
    },
  },
  {
    colId: 'Status',
    headerName: 'Status',
    headerTooltip: 'Status',
    valueGetter: (pkg) => pkg.data?.status,
    cellRenderer: (props: ICellRendererProps<Punch, string | null | undefined>) => {
      if (!props.value) {
        return null;
      }
      const statusColor = hasProperty(statusColorMap, props.value)
        ? statusColorMap[props.value]
        : 'transparent';

      return (
        <StatusCell
          content={props.value}
          cellAttributeFn={() => ({ style: { backgroundColor: statusColor } })}
        />
      );
    },
  },
  {
    colId: 'FormType',
    headerName: 'Form Type',
    headerTooltip: 'Form Type',
    valueGetter: (pkg) => pkg.data?.formularType,
  },
  {
    colId: 'Discipline',
    headerName: 'Discipline',
    headerTooltip: 'Discipline',
    valueGetter: (pkg) => pkg.data?.discipline,
  },
  {
    colId: 'PLSorting',
    headerName: 'PL Sorting',
    headerTooltip: 'PL Sorting',
    valueGetter: (pkg) => pkg.data?.sorting,
  },
  {
    colId: 'PLType',
    headerName: 'PL Type',
    headerTooltip: 'PL Type',
    valueGetter: (pkg) => pkg.data?.type,
  },
  {
    colId: 'Estimate',
    headerName: 'Estimate',
    headerTooltip: 'Estimate',
    valueGetter: (pkg) => pkg.data?.estimate,
    cellRenderer: (props: ICellRendererProps<Punch, string>) => {
      return <StyledMonospace>{props.data?.estimate}</StyledMonospace>;
    },
  },
  {
    colId: 'RaisedByOrg',
    headerName: 'Raised by org',
    headerTooltip: 'Raised by Org',
    valueGetter: (pkg) => pkg.data?.raisedBy,
  },
  {
    colId: 'ClearingByOrg',
    headerName: 'Clearing by org',
    headerTooltip: 'Cleared by Org',
    valueGetter: (pkg) => pkg.data?.clearedBy,
  },
  {
    colId: 'Priority',
    headerName: 'Priority',
    headerTooltip: 'Priority',
    valueGetter: (o) => o.data?.priority,
  },
  {
    colId: 'Cleared',
    headerName: 'Cleared',
    headerTooltip: 'Cleared',
    valueGetter: (pkg) => pkg.data?.clearedAtDate,
    cellRenderer: (props: ICellRendererProps<Punch, string | null | undefined>) => {
      return props.value ? <DateCell dateString={props.value} /> : null;
    },
  },
  {
    colId: 'Verified',
    headerName: 'Verified',
    headerTooltip: 'Verified',
    valueGetter: (pkg) => pkg.data?.verifiedAtDate,
    cellRenderer: (props: ICellRendererProps<Punch, string | null | undefined>) => {
      return props.value ? <DateCell dateString={props.value} /> : null;
    },
  },
  {
    colId: 'HandoverPlan',
    headerName: 'Handover plan',
    headerTooltip: 'Handover Plan',
    valueGetter: (pkg) => pkg.data?.handoverPlan,
    cellRenderer: (props: ICellRendererProps<Punch, string | null | undefined>) => {
      return props.value ? <DateCell dateString={props.value} /> : null;
    },
  },
  {
    colId: 'FormType',
    headerName: 'Form type',
    headerTooltip: 'Form Type',
    valueGetter: (pkg) => pkg.data?.formularType,
    cellRenderer: (props: ICellRendererProps<Punch, string | null | undefined>) => {
      if (!props.data?.formularType || !props.data.formTypeUrl) return null;
      return <LinkCell url={props.data.formTypeUrl} urlText={props.data.formularType} />;
    },
    onCellClicked: () => {},
  },
  {
    colId: 'Tag',
    headerName: 'Tag',
    headerTooltip: 'Tag',
    valueGetter: (pkg) => pkg.data?.tagNo,
    cellRenderer: (props: ICellRendererProps<Punch, string | null | undefined>) => {
      if (!props.data?.tagUrl || !props.data?.tagNo) return null;
      return <LinkCell url={props.data?.tagUrl} urlText={props.data?.tagNo} />;
    },
    onCellClicked: () => {},
  },
  {
    colId: 'CommPkg',
    headerName: 'Comm Pkg',
    headerTooltip: 'Commissioning Package',
    valueGetter: (pkg) => pkg.data?.commissioningPackageNo,
    cellRenderer: (props: ICellRendererProps<Punch, string | null | undefined>) => {
      if (!props.data?.commissioningPackageUrl || !props.data.commissioningPackageNo) {
        return null;
      }

      return (
        <LinkCell
          url={`${props.data.commissioningPackageUrl}`}
          urlText={props.data.commissioningPackageNo}
        />
      );
    },
    onCellClicked: () => {},
  },
  {
    colId: 'WorkOrder',
    headerName: 'Workorder',
    headerTooltip: 'Workorder',
    valueGetter: (pkg) => pkg.data?.workOrderNo,
    cellRenderer: (props: ICellRendererProps<Punch, string | null | undefined>) => {
      if (!props.data?.workOrderNo || !props.data.workorderUrl) return null;
      return <LinkCell url={props.data.workorderUrl} urlText={props.data?.workOrderNo} />;
    },
    onCellClicked: () => {},
  },
  {
    colId: 'MaterialRequired',
    headerName: 'Material required',
    headerTooltip: 'Material Required',
    valueGetter: (pkg) => (pkg.data?.materialRequired ? 'Yes' : 'No'),
  },
  {
    colId: 'MaterialEstimate',
    headerName: 'Material estimate',
    headerTooltip: 'Material Estimate',
    valueGetter: (pkg) => pkg.data?.materialEstimatedTimeOfArrival,
    cellRenderer: (props: ICellRendererProps<Punch, string | null | undefined>) => {
      return props.value ? <DateCell dateString={props.value} /> : null;
    },
  },
];
