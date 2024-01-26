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
import { domainNames } from 'libs/shared/dist/src';

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
    headerName: domainNames.punch,
    headerTooltip: domainNames.punch,
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
    headerName: domainNames.category,
    headerTooltip: domainNames.category,
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
    headerName: domainNames.status,
    headerTooltip: domainNames.status,
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
    headerName: domainNames.formType,
    headerTooltip: domainNames.formType,
    valueGetter: (pkg) => pkg.data?.formularType,
  },
  {
    colId: 'Discipline',
    headerName: domainNames.discipline,
    headerTooltip: domainNames.discipline,
    valueGetter: (pkg) => pkg.data?.discipline,
  },
  {
    colId: 'PLSorting',
    headerName: domainNames.punchSorting,
    headerTooltip: domainNames.punchSorting,
    valueGetter: (pkg) => pkg.data?.sorting,
  },
  {
    colId: 'PLType',
    headerName: domainNames.punchType,
    headerTooltip: domainNames.punchType,
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
    headerName: domainNames.raisedBy,
    headerTooltip: domainNames.raisedBy,
    valueGetter: (pkg) => pkg.data?.raisedBy,
  },
  {
    colId: 'ClearingByOrg',
    headerName: domainNames.clearingBy,
    headerTooltip: domainNames.clearingBy,
    valueGetter: (pkg) => pkg.data?.clearedBy,
  },
  {
    colId: 'Priority',
    headerName: domainNames.priority,
    headerTooltip: domainNames.priority,
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
    headerName: domainNames.verified,
    headerTooltip: domainNames.verified,
    valueGetter: (pkg) => pkg.data?.verifiedAtDate,
    cellRenderer: (props: ICellRendererProps<Punch, string | null | undefined>) => {
      return props.value ? <DateCell dateString={props.value} /> : null;
    },
  },
  {
    colId: 'HandoverPlan',
    headerName: domainNames.handoverPlan,
    headerTooltip: domainNames.handoverPlan,
    valueGetter: (pkg) => pkg.data?.handoverPlan,
    cellRenderer: (props: ICellRendererProps<Punch, string | null | undefined>) => {
      return props.value ? <DateCell dateString={props.value} /> : null;
    },
  },
  {
    colId: 'FormType',
    headerName: domainNames.formType,
    headerTooltip: domainNames.formType,
    valueGetter: (pkg) => pkg.data?.formularType,
    cellRenderer: (props: ICellRendererProps<Punch, string | null | undefined>) => {
      if (!props.data?.formularType || !props.data.formTypeUrl) return null;
      return <LinkCell url={props.data.formTypeUrl} urlText={props.data.formularType} />;
    },
    onCellClicked: () => {},
  },
  {
    colId: 'Tag',
    headerName: domainNames.tag,
    headerTooltip: domainNames.tag,
    valueGetter: (pkg) => pkg.data?.tagNo,
    cellRenderer: (props: ICellRendererProps<Punch, string | null | undefined>) => {
      if (!props.data?.tagUrl || !props.data?.tagNo) return null;
      return <LinkCell url={props.data?.tagUrl} urlText={props.data?.tagNo} />;
    },
    onCellClicked: () => {},
  },
  {
    colId: 'CommPkg',
    headerName: domainNames.commPkg,
    headerTooltip: domainNames.commPkg,
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
    headerName: domainNames.workorder,
    headerTooltip: domainNames.workorder,
    valueGetter: (pkg) => pkg.data?.workOrderNo,
    cellRenderer: (props: ICellRendererProps<Punch, string | null | undefined>) => {
      if (!props.data?.workOrderNo || !props.data.workorderUrl) return null;
      return <LinkCell url={props.data.workorderUrl} urlText={props.data?.workOrderNo} />;
    },
    onCellClicked: () => {},
  },
  {
    colId: 'MaterialRequired',
    headerName: domainNames.materialRequired,
    headerTooltip: domainNames.materialRequired,
    valueGetter: (pkg) => (pkg.data?.materialRequired ? 'Yes' : 'No'),
  },
  {
    colId: 'MaterialEstimate',
    headerName: domainNames.materialEstimate,
    headerTooltip: domainNames.materialEstimate,
    valueGetter: (pkg) => pkg.data?.materialEstimatedTimeOfArrival,
    cellRenderer: (props: ICellRendererProps<Punch, string | null | undefined>) => {
      return props.value ? <DateCell dateString={props.value} /> : null;
    },
  },
];
