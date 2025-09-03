import { HandoverPackage } from '@cc-components/handovershared';
import {
  BaseStatus,
  DateCell,
  DescriptionCell,
  LinkCell,
  StatusCell,
  domainNames,
  statusColorMap,
} from '@cc-components/shared';

import { FilterState } from '@equinor/workspace-fusion/filter';
import {
  ColDef,
  ColumnsToolPanelModule,
  GridConfig,
  MenuModule,
  ICellRendererProps,
  ClientSideRowModelApiModule,
  ClientSideRowModelModule,
  ColumnApiModule,
  EventApiModule,
  GridStateModule,
  RowApiModule,
  ValidationModule,
  RowStyleModule,
  ColumnAutoSizeModule,
  AdvancedFilterModule,
  CustomFilterModule,
  DateFilterModule,
  ExternalFilterModule,
  GroupFilterModule,
  MultiFilterModule,
  NumberFilterModule,
  QuickFilterModule,
  SetFilterModule,
  TextFilterModule,
  TooltipModule,
} from '@equinor/workspace-fusion/grid';

import { useHttpClient } from '@cc-components/shared';
import {
  GridColumnOption,
  defaultGridOptions,
  defaultModules,
  useGridDataSource,
} from '@cc-components/shared/workspace-config';

export const useTableConfig = (
  contextId: string
): GridConfig<HandoverPackage, FilterState> => {
  const client = useHttpClient();

  const { getRows, colDefs } = useGridDataSource<HandoverPackage>(async (req) => {
    const res = await client.fetch(`/api/contexts/${contextId}/handover/grid`, req);
    const meta = (await res.json()) as {
      items: HandoverPackage[];
      rowCount: number;
      columnDefinitions: GridColumnOption[];
    };
    return {
      rowCount: meta.rowCount,
      items: meta.items,
      columnDefinitions: meta.columnDefinitions,
    };
  }, columnDefinitions as ColDef<HandoverPackage>[]);

  return {
    getRows: getRows,
    modules: defaultModules,
    columnDefinitions: colDefs as ColDef<HandoverPackage>[],
    gridOptions: {
      ...defaultGridOptions,
      onFirstDataRendered: (e) => {
        e.api.autoSizeColumns(
          e.api.getAllDisplayedColumns().filter((s) => s.getColId() !== 'description')
        );
      },
    } as GridConfig<HandoverPackage, FilterState>['gridOptions'],
  };
};

const columnDefinitions: ColDef<HandoverPackage>[] = [
  {
    headerName: domainNames.commPkg,
    colId: 'CommPkgNo',
    headerTooltip: 'Commissioning Package Number',
    valueGetter: (pkg) => pkg.data?.commissioningPackageNo,
    valueFormatter: (pkg) => pkg.data?.commissioningPackageUrl ?? '',
    cellRenderer: (props: ICellRendererProps<HandoverPackage, string | null>) => {
      if (!props.valueFormatted) {
        return props.value;
      }
      return (
        <LinkCell
          url={props.valueFormatted}
          urlText={props.value ?? ''}
          aiLinkLocation="handover grid"
          aiLinktype="CommPkgNo"
        />
      );
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
    headerName: domainNames.mcDisciplines,
    headerTooltip: domainNames.mcDisciplines,
    valueGetter: (pkg) => pkg.data?.mcDisciplines,
    cellRenderer: (props: ICellRendererProps<HandoverPackage, string | null>) => {
      return <DescriptionCell description={props.value} />;
    },
    minWidth: 150,
  },
  {
    headerName: domainNames.mcStatus,
    colId: 'MCStatus',
    headerTooltip: domainNames.mcStatus,
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
    headerName: domainNames.commPkgStatus,
    colId: 'CommStatus',
    headerTooltip: domainNames.commPkgStatus,
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
    headerName: domainNames.responsible,
    colId: domainNames.responsible,
    headerTooltip: domainNames.responsible,
    valueGetter: (pkg) => pkg.data?.responsible,
    enableRowGroup: true,
    minWidth: 150,
  },
  {
    headerName: domainNames.area,
    colId: domainNames.area,
    headerTooltip: domainNames.area,
    valueGetter: (pkg) => pkg.data?.location,
    enableRowGroup: true,
    minWidth: 135,
  },
  {
    headerName: domainNames.system,
    colId: domainNames.system,
    headerTooltip: domainNames.system,
    valueGetter: (pkg) => pkg.data?.system,
    enableRowGroup: true,
    minWidth: 150,
  },
  {
    headerName: domainNames.priority1,
    colId: 'Priority1',
    headerTooltip: domainNames.priority1,
    valueGetter: (pkg) => pkg.data?.priority1,
    minWidth: 150,
  },
  {
    headerName: domainNames.priority2,
    colId: 'Priority2',
    headerTooltip: domainNames.priority2,
    valueGetter: (pkg) => pkg.data?.priority2,
    minWidth: 150,
  },
  {
    headerName: domainNames.priority3,
    colId: 'Priority3',
    headerTooltip: domainNames.priority3,
    valueGetter: (pkg) => pkg.data?.priority3,
    minWidth: 150,
  },
  {
    headerName: domainNames.rfcPlannedDate,
    colId: 'PlannedRFC',
    headerTooltip: domainNames.rfcPlannedDate,
    valueGetter: (pkg) => pkg.data?.rfrcPlannedDate,
    cellRenderer: (props: ICellRendererProps<HandoverPackage, string | null>) => {
      if (props.node.group) return null;
      return <DateCell dateString={props.value} />;
    },
    minWidth: 180,
  },
  {
    headerName: domainNames.rfcForecastDate,
    colId: 'ForecastRFC',
    headerTooltip: domainNames.rfcForecastDate,
    valueGetter: (pkg) => pkg.data?.rfcForecastDate,
    cellRenderer: (props: ICellRendererProps<HandoverPackage, string | null>) => {
      if (props.node.group) return null;
      return <DateCell dateString={props.value} />;
    },
    minWidth: 180,
  },
  {
    headerName: domainNames.rfoPlannedDate,
    colId: 'PlannedRFO',
    headerTooltip: domainNames.rfoPlannedDate,
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
  ,
  {
    headerName: domainNames.rfoForecastDate,
    colId: 'ForecastRFO',
    headerTooltip: domainNames.rfoForecastDate,
    valueGetter: (pkg) => pkg.data?.rfoForecastDate,
    cellRenderer: (props: ICellRendererProps<HandoverPackage, string | null>) => {
      if (props.node.group) return null;
      return <DateCell dateString={props.value} />;
    },
    minWidth: 180,
  },
];
