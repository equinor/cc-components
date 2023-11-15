import { HandoverPackage } from '@cc-components/handovershared';
import {
  BaseStatus,
  DateCell,
  DescriptionCell,
  LinkCell,
  StatusCell,
  statusColorMap,
} from '@cc-components/shared';

import { ICellRendererProps } from '@equinor/workspace-ag-grid';
import { FilterState } from '@equinor/workspace-fusion/filter';
import {
  ColDef,
  ColumnsToolPanelModule,
  GridConfig,
  MenuModule,
} from '@equinor/workspace-fusion/grid';

import { useHttpClient } from '@cc-components/shared';
import {
  GridColumnOption,
  defaultGridOptions,
  useGridDataSource,
} from '@cc-components/shared/workspace-config';

export const useTableConfig = (
  contextId: string
): GridConfig<HandoverPackage, FilterState> => {
  const client = useHttpClient();

  const { getRows, colDefs } = useGridDataSource(async (req) => {
    const res = await client.fetch(`/api/contexts/${contextId}/handover/grid`, req);
    const meta = (await res.json()) as {
      items: any[];
      rowCount: number;
      columnDefinitions: GridColumnOption[];
    };
    return {
      rowCount: meta.rowCount,
      items: meta.items,
      columnDefinitions: meta.columnDefinitions,
    };
  }, columnDefinitions);

  return {
    getRows: getRows,
    modules: [MenuModule, ColumnsToolPanelModule],
    columnDefinitions: colDefs as any,
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
  };
};

const columnDefinitions: ColDef<HandoverPackage>[] = [
  {
    headerName: 'Comm pkg',
    colId: 'CommPkgNo',
    headerTooltip: 'Commissioning Package Number',
    valueGetter: (pkg) => pkg.data?.commissioningPackageNo,
    valueFormatter: (pkg) => pkg.data?.commissioningPackageUrl ?? '',
    cellRenderer: (props: ICellRendererProps<HandoverPackage, string | null>) => {
      if (!props.valueFormatted) {
        return props.value;
      }
      return <LinkCell url={props.valueFormatted} urlText={props.value ?? ''} />;
    },
    minWidth: 150,
  },
  {
    headerName: 'Description',
    colId: 'Description',
    headerTooltip: 'Description',
    valueGetter: (pkg) => pkg.data?.description,
    cellRenderer: (props: ICellRendererProps<HandoverPackage, string | null>) => {
      return <DescriptionCell description={props.value} />;
    },
    minWidth: 300,
  },
  {
    headerName: 'Disciplines',
    headerTooltip: 'Disciplines',
    valueGetter: (pkg) => pkg.data?.mcDisciplines,
    cellRenderer: (props: ICellRendererProps<HandoverPackage, string | null>) => {
      return <DescriptionCell description={props.value} />;
    },
    minWidth: 150,
  },
  {
    headerName: 'MC status',
    colId: 'MCStatus',
    headerTooltip: 'Mechanical Completion Status',
    valueGetter: (pkg) => pkg.data?.mechanicalCompletionStatus,
    cellRenderer: (props: ICellRendererProps<HandoverPackage, BaseStatus>) => {
      if (props.node.group) return null;
      return (
        <StatusCell
          content={props.value ?? null}
          cellAttributeFn={() => ({
            style: { backgroundColor: statusColorMap[props.value ?? 'OS'] },
          })}
        />
      );
    },
    enableRowGroup: true,
    minWidth: 150,
  },
  {
    headerName: 'Comm status',
    colId: 'CommStatus',
    headerTooltip: 'Commissioning Status',
    valueGetter: (pkg) => pkg.data?.commissioningPackageStatus,
    cellRenderer: (props: ICellRendererProps<HandoverPackage, BaseStatus>) => {
      if (props.node.group) return null;
      return (
        <StatusCell
          content={props.value ?? null}
          cellAttributeFn={() => ({
            style: { backgroundColor: statusColorMap[props.value ?? 'OS'] },
          })}
        />
      );
    },
    enableRowGroup: true,
    minWidth: 150,
  },
  {
    headerName: 'Responsible',
    colId: 'Responsible',
    headerTooltip: 'Responsible',
    valueGetter: (pkg) => pkg.data?.responsible,
    enableRowGroup: true,
    minWidth: 150,
  },
  {
    headerName: 'Area',
    colId: 'Area',
    headerTooltip: 'Area',
    valueGetter: (pkg) => pkg.data?.location,
    enableRowGroup: true,
    minWidth: 135,
  },
  {
    headerName: 'System',
    colId: 'System',
    headerTooltip: 'System',
    valueGetter: (pkg) => pkg.data?.system,
    enableRowGroup: true,
    minWidth: 150,
  },
  {
    headerName: 'Priority 1',
    colId: 'Priority1',
    headerTooltip: 'Priority 1',
    valueGetter: (pkg) => pkg.data?.priority1,
    minWidth: 150,
  },
  {
    headerName: 'Priority 2',
    colId: 'Priority2',
    headerTooltip: 'Priority 2',
    valueGetter: (pkg) => pkg.data?.priority2,
    minWidth: 150,
  },
  {
    headerName: 'Priority 3',
    colId: 'Priority3',
    headerTooltip: 'Priority 3',
    valueGetter: (pkg) => pkg.data?.priority3,
    minWidth: 150,
  },
  {
    headerName: 'Planned RFC',
    colId: 'PlannedRFC',
    headerTooltip: 'Planned RFC',
    valueGetter: (pkg) => pkg.data?.rfrcPlannedDate,
    cellRenderer: (props: ICellRendererProps<HandoverPackage, string | null>) => {
      if (props.node.group) return null;
      return <DateCell dateString={props.value} />;
    },
    minWidth: 180,
  },
  {
    headerName: 'Forecast RFC',
    colId: 'ForecastRFC',
    headerTooltip: 'Forecast RFC',
    valueGetter: (pkg) => pkg.data?.rfcForecastDate,
    cellRenderer: (props: ICellRendererProps<HandoverPackage, string | null>) => {
      if (props.node.group) return null;
      return <DateCell dateString={props.value} />;
    },
    minWidth: 180,
  },
  {
    headerName: 'Planned RFO',
    colId: 'PlannedRFO',
    headerTooltip: 'Planned RFO',
    valueGetter: (pkg) => pkg.data?.rfoPlannedDate,
    cellRenderer: (props: ICellRendererProps<HandoverPackage, string | null>) => {
      if (props.node.group) return null;
      return <DateCell dateString={props.value} />;
    },
    minWidth: 180,
  },
  {
    headerName: 'Actual RFO',
    colId: 'ActualRFO',
    headerTooltip: 'Actual RFO',
    valueGetter: (pkg) => pkg.data?.rfoActualDate,
    cellRenderer: (props: ICellRendererProps<HandoverPackage, string | null>) => {
      if (props.node.group) return null;
      return <DateCell dateString={props.value} />;
    },
    minWidth: 180,
  },
];
