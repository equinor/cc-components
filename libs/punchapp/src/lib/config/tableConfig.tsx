import { Punch } from '@cc-components/punchshared';
import { statusColorMap } from '@cc-components/shared/mapping';
import { domainNames } from '@cc-components/shared';
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
  defaultModules,
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
        e.api.autoSizeColumns(
          e.api.getAllDisplayedColumns().filter((s) => s.getColId() !== 'description')
        );
      },
    },
    columnDefinitions: colDefs as [ColDef<Punch>, ...ColDef<Punch>[]],
    modules: defaultModules,
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
      return (
        <LinkCell
          url={props.data.punchUrl}
          urlText={props.data.punchItemNo}
          aiLinkLocation="punch grid"
          aiLinktype="PunchNo"
        />
      );
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
    headerName: domainNames.punchCategory,
    headerTooltip: domainNames.punchCategory,
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
    headerName: domainNames.punchStatus,
    headerTooltip: domainNames.punchStatus,
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
    colId: 'Discipline',
    headerName: domainNames.mcDiscipline,
    headerTooltip: domainNames.mcDiscipline,
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
    colId: 'Priority',
    headerName: domainNames.punchPriority,
    headerTooltip: domainNames.punchPriority,
    valueGetter: (pkg) => pkg.data?.priority,
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
    colId: 'Priority1',
    headerName: domainNames.commPriority1,
    headerTooltip: domainNames.commPriority1,
    valueGetter: (params) => params.data?.priority1,
  },
  {
    colId: 'Priority2',
    headerName: domainNames.commPriority2,
    headerTooltip: domainNames.commPriority2,
    valueGetter: (params) => params.data?.priority2,
  },
  {
    colId: 'Priority3',
    headerName: domainNames.commPriority3,
    headerTooltip: domainNames.commPriority3,
    valueGetter: (params) => params.data?.priority3,
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
      return (
        <LinkCell
          url={props.data.formTypeUrl}
          urlText={props.data.formularType}
          aiLinkLocation="punch grid"
          aiLinktype="Formular Type"
        />
      );
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
      return (
        <LinkCell
          url={props.data?.tagUrl}
          urlText={props.data?.tagNo}
          aiLinkLocation="punch grid"
          aiLinktype="TagNo"
        />
      );
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
          aiLinkLocation="punch grid"
          aiLinktype="CommPkgNo"
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
      return (
        <LinkCell
          url={props.data.workorderUrl}
          urlText={props.data?.workOrderNo}
          aiLinkLocation="punch grid"
          aiLinktype="WorkOrderNo"
        />
      );
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
