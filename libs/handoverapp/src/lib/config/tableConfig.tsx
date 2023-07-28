import { HandoverPackage } from '@cc-components/handovershared';
import { StyledMonospace, statusColorMap } from '@cc-components/shared';
import { DateCell, DescriptionCell, LinkCell, StatusCell } from '@cc-components/shared';
import { BaseStatus } from '@cc-components/shared';

import { ICellRendererProps } from '@equinor/workspace-ag-grid';
import { ColDef, GridConfig } from '@equinor/workspace-fusion/grid';
import { FilterState } from '@equinor/workspace-fusion/filter';

import { useGridDataSource } from '@cc-components/shared/workspace-config';
import { useHttpClient } from '@equinor/fusion-framework-react-app/http';
import { defaultGridOptions } from '@cc-components/shared/workspace-config';

export const useTableConfig = (
  contextId: string
): GridConfig<HandoverPackage, FilterState> => {
  const client = useHttpClient('cc-app');

  const { getRows, colDefs } = useGridDataSource(async (req) => {
    const res = await client.fetch(`/api/contexts/${contextId}/handover/grid`, req);
    const meta = (await res.json()) as { items: any[]; rowCount: number, columnDefinitions: any };
    return {
      rowCount: meta.rowCount,
      items: meta.items,
      columnDefinitions: meta.columnDefinitions
    };
  }, columnDefinitions);

  return {
    getRows: getRows,
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
    field: 'Comm pkg',
    colId : "CommPkgNo",
    valueGetter: (pkg) => pkg.data?.commissioningPackageNo,
    valueFormatter: (pkg) => pkg.data?.commissioningPackageUrl ?? '', 
    cellRenderer: (props: ICellRendererProps<HandoverPackage, string | null>) => {
      if (!props.valueFormatted) {
        return props.value;
      }
      return <LinkCell url={props.valueFormatted} urlText={props.value ?? ''} />;
    },
    width: 150,
  },
  {
    field: 'Description',
    colId : "Description",
    valueGetter: (pkg) => pkg.data?.description,
    cellRenderer: (props: ICellRendererProps<HandoverPackage, string | null>) => {
      return <DescriptionCell description={props.value} />;
    },
    width: 300,
  },
  {
    field: 'Disciplines',
    valueGetter: (pkg) => pkg.data?.mcDisciplines,
    cellRenderer: (props: ICellRendererProps<HandoverPackage, string | null>) => {
      return <DescriptionCell description={props.value} />;
    },
    width: 150,
  },
  {
    field: 'MC status',
    colId : "MCStatus",
    valueGetter: (pkg) => pkg.data?.mechanicalCompletionStatus,
    cellRenderer: (props: ICellRendererProps<HandoverPackage, BaseStatus>) => {
      if (props.node.group) return null;
      return (
        <StatusCell
          content={props.value}
          cellAttributeFn={() => ({
            style: { backgroundColor: statusColorMap[props.value] },
          })}
        />
      );
    },
    enableRowGroup: true,
    width: 150,
  },
  {
    field: 'Comm status',
    colId : "CommStatus",
    valueGetter: (pkg) => pkg.data?.commissioningPackageStatus,
    cellRenderer: (props: ICellRendererProps<HandoverPackage, BaseStatus>) => {
      if (props.node.group) return null;
      return (
        <StatusCell
          content={props.value}
          cellAttributeFn={() => ({
            style: { backgroundColor: statusColorMap[props.value] },
          })}
        />
      );
    },
    enableRowGroup: true,
    width: 150,
  },
  {
    field: 'Responsible',
    colId : "Responsible",
    valueGetter: (pkg) => pkg.data?.responsible,
    enableRowGroup: true,
    width: 150,
  },
  {
    field: 'Area', //AREA
    colId : "Area",
    valueGetter: (pkg) => pkg.data?.location,
    enableRowGroup: true,
    width: 135,
  },
  {
    field: 'System',
    colId : "System",
    valueGetter: (pkg) => pkg.data?.system,
    enableRowGroup: true,
    width: 150,
  },
  {
    field: 'Priority 1',
    colId : "Priority1",
    valueGetter: (pkg) => pkg.data?.priority1,
    width: 150,
  },
  {
    field: 'Priority 2',
    colId : "Priority2",
    valueGetter: (pkg) => pkg.data?.priority2,
    width: 150,
  },
  {
    field: 'Priority 3',
    colId : "Priority3",
    valueGetter: (pkg) => pkg.data?.priority3,
    width: 150,
  },
  {
    field: 'Planned RFC',
    colId : "PlannedRFC",
    valueGetter: (pkg) => pkg.data?.rfrcPlannedDate,
    cellRenderer: (props: ICellRendererProps<HandoverPackage, string | null>) => {
      if (props.node.group) return null;
      return <DateCell dateString={props.value} />;
    },
    width: 180,
  },
  {
    field: 'Forecast RFC',
    colId : "ForecastRFC",
    valueGetter: (pkg) => pkg.data?.rfcForecastDate,
    cellRenderer: (props: ICellRendererProps<HandoverPackage, string | null>) => {
      if (props.node.group) return null;
      return <DateCell dateString={props.value} />;
    },
    width: 180,
  },
  {
    field: 'Planned RFO',
    colId : "PlannedRFO",
    valueGetter: (pkg) => pkg.data?.rfoPlannedDate,
    cellRenderer: (props: ICellRendererProps<HandoverPackage, string | null>) => {
      if (props.node.group) return null;
      return <DateCell dateString={props.value} />;
    },
    width: 180,
  },
  {
    field: 'Actual RFO',
    colId : "ActualRFO",
    valueGetter: (pkg) => pkg.data?.rfoActualDate,
    cellRenderer: (props: ICellRendererProps<HandoverPackage, string | null>) => {
      if (props.node.group) return null;
      return <DateCell dateString={props.value} />;
    },
    width: 180,
  },
];
