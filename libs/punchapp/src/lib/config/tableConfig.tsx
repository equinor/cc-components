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
import { ColDef, GridConfig, ICellRendererProps } from '@equinor/workspace-fusion/grid';
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
  };
};

const columnDefinitions: ColDef<Punch>[] = [
  {
    colId: 'Punch',
    field: 'Punch',
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
    field: 'Description',
    colId: 'description',
    valueGetter: (pkg) => pkg.data?.description,
    cellRenderer: (props: ICellRendererProps<Punch, string | null | undefined>) => {
      return <DescriptionCell description={props.value} />;
    },
    width: 300,
  },
  {
    colId: 'Category',
    field: 'Category',
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
    field: 'Status',
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
    colId: 'PLSorting',
    field: 'PL Sorting',
    valueGetter: (pkg) => pkg.data?.sorting,
  },
  {
    colId: 'PLType',
    field: 'PL Type',
    valueGetter: (pkg) => pkg.data?.type,
  },
  {
    colId: 'Estimate',
    field: 'Estimate',
    valueGetter: (pkg) => pkg.data?.estimate,
    cellRenderer: (props: ICellRendererProps<Punch, string>) => {
      return <StyledMonospace>{props.data?.estimate}</StyledMonospace>;
    },
  },
  {
    colId: 'RaisedByOrg',
    field: 'Raised by org',
    valueGetter: (pkg) => pkg.data?.raisedBy,
  },
  {
    colId: 'ClearingByOrg',
    field: 'Clearing by org',
    valueGetter: (pkg) => pkg.data?.clearedBy,
  },
  {
    colId: 'Cleared',
    field: 'Cleared',
    valueGetter: (pkg) => pkg.data?.clearedAtDate,
    cellRenderer: (props: ICellRendererProps<Punch, string | null | undefined>) => {
      return props.value ? <DateCell dateString={props.value} /> : null;
    },
  },
  {
    colId: 'Verified',
    field: 'Verified',
    valueGetter: (pkg) => pkg.data?.verifiedAtDate,
    cellRenderer: (props: ICellRendererProps<Punch, string | null | undefined>) => {
      return props.value ? <DateCell dateString={props.value} /> : null;
    },
  },
  {
    colId: 'HandoverPlan',
    field: 'Handover plan',
    valueGetter: (pkg) => pkg.data?.handoverPlan,
    cellRenderer: (props: ICellRendererProps<Punch, string | null | undefined>) => {
      return props.value ? <DateCell dateString={props.value} /> : null;
    },
  },
  {
    colId: 'FormType',
    field: 'Form type',
    valueGetter: (pkg) => pkg.data?.formularType,
    cellRenderer: (props: ICellRendererProps<Punch, string | null | undefined>) => {
      if (!props.data?.formularType || !props.data.formTypeUrl) return null;
      return <LinkCell url={props.data.formTypeUrl} urlText={props.data.formularType} />;
    },
    onCellClicked: () => {},
  },
  {
    colId: 'Tag',
    field: 'Tag',
    valueGetter: (pkg) => pkg.data?.tagNo,
    cellRenderer: (props: ICellRendererProps<Punch, string | null | undefined>) => {
      if (!props.data?.tagUrl || !props.data?.tagNo) return null;
      return <LinkCell url={props.data?.tagUrl} urlText={props.data?.tagNo} />;
    },
    onCellClicked: () => {},
  },
  {
    colId: 'CommPkg',
    field: 'Commpkg',
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
    field: 'Workorder',
    valueGetter: (pkg) => pkg.data?.workOrderNo,
    cellRenderer: (props: ICellRendererProps<Punch, string | null | undefined>) => {
      if (!props.data?.workOrderNo || !props.data.workorderUrl) return null;
      return <LinkCell url={props.data.workorderUrl} urlText={props.data?.workOrderNo} />;
    },
    onCellClicked: () => {},
  },
  {
    colId: 'MaterialRequired',
    field: 'Material required',
    valueGetter: (pkg) => (pkg.data?.materialRequired ? 'Yes' : 'No'),
  },
  {
    colId: 'MaterialEstimate',
    field: 'Material estimate',
    valueGetter: (pkg) => pkg.data?.materialEstimatedTimeOfArrival,
    cellRenderer: (props: ICellRendererProps<Punch, string | null | undefined>) => {
      return props.value ? <DateCell dateString={props.value} /> : null;
    },
  },
];
