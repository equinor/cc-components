import { Loop, Status } from '@cc-components/loopshared';
import { statusColorMap } from '@cc-components/shared/mapping';
import { DataResponse, useGridDataSource } from '@cc-components/shared/workspace-config';
import {
  DateCell,
  DescriptionCell,
  LinkCell,
  StatusCell,
  StyledMonospace,
} from '@cc-components/shared/table-helpers';
import { defaultGridOptions } from '@cc-components/shared/workspace-config';
import { useHttpClient } from '@equinor/fusion-framework-react-app/http';
import {
  ColDef,
  GridConfig,
  MenuModule,
  ColumnsToolPanelModule,
  ICellRendererProps,
} from '@equinor/workspace-fusion/grid';
import { FilterState } from '@equinor/workspace-fusion/filter';
import { domainNames } from '@cc-components/shared';

export const useTableConfig = (contextId: string): GridConfig<Loop, FilterState> => {
  const client = useHttpClient('cc-api');

  const { getRows, colDefs } = useGridDataSource(async (req) => {
    const res = await client.fetch(`/api/contexts/${contextId}/loop/grid`, req);
    const meta = (await res.json()) as DataResponse<Loop>;
    return {
      rowCount: meta.rowCount,
      items: meta.items,
      columnDefinitions: meta.columnDefinitions,
    };
  }, columnDefinitions);

  async function fetchLoopExport(filterstate: FilterState): Promise<void> {
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(filterstate),
    };

    const res = await client.fetch(
      `/api/contexts/${contextId}/loop/export`,
      requestOptions
    );

    if (!res.ok) {
      throw new Error('Failed to fetch file');
    }

    const blob = await res.blob();

    const url = window.URL.createObjectURL(
      new Blob([blob], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      })
    );

    window.open(url, '_self');
    window.URL.revokeObjectURL(url);
  }

  return {
    columnDefinitions: colDefs as [ColDef<Loop>, ...ColDef<Loop>[]],
    gridOptions: {
      ...defaultGridOptions,
    },
    getRows: getRows,
    excelExport: fetchLoopExport,
    modules: [MenuModule, ColumnsToolPanelModule],
  };
};

const columnDefinitions: ColDef<Loop>[] = [
  {
    colId: 'LoopTag',
    headerName: 'Loop tag',
    headerTooltip: 'Loop tag',
    valueGetter: (pkg) => pkg.data?.loopNo,
    cellRenderer: (props: ICellRendererProps<Loop, string | null>) => {
      return <LinkCell url={props.data?.loopUrl ?? ''} urlText={props.value ?? ''} />;
    },
    onCellClicked: () => {},
  },
  {
    headerName: 'Description',
    colId: 'Description',
    headerTooltip: 'Description',
    valueGetter: (pkg) => pkg.data?.description,
    cellRenderer: (props: ICellRendererProps<Loop, string>) => {
      return <DescriptionCell description={props.value} />;
    },
    width: 350,
  },
  {
    colId: domainNames.system,
    headerName: domainNames.system,
    headerTooltip: domainNames.system,
    valueGetter: (pkg) => pkg.data?.system,
    cellRenderer: (props: ICellRendererProps<Loop, string>) => (
      <StyledMonospace>{props.data?.system}</StyledMonospace>
    ),
    enableRowGroup: false,
  },
  {
    colId: 'CommPkgNo',
    headerName: domainNames.commPkg,
    headerTooltip: domainNames.commPkg,
    valueGetter: (pkg) => pkg.data?.commissioningPackageNo,
    cellRenderer: (props: ICellRendererProps<Loop, string>) => {
      if (props.data?.commissioningPackageUrl && props.data.commissioningPackageNo) {
        return (
          <LinkCell
            url={props.data.commissioningPackageUrl}
            urlText={props.data.commissioningPackageNo}
          />
        );
      } else {
        return null;
      }
    },
    onCellClicked: () => {},
  },
  {
    colId: 'MCPkgNo',
    headerName: domainNames.mcPkg,
    headerTooltip: domainNames.mcPkg,
    valueGetter: (pkg) => pkg.data?.mechanicalCompletionPackageNo,
    cellRenderer: (props: ICellRendererProps<Loop, string>) => {
      if (
        props.data?.mechanicalCompletionPackageUrl &&
        props.data.mechanicalCompletionPackageNo
      ) {
        return (
          <LinkCell
            url={props.data.mechanicalCompletionPackageUrl}
            urlText={props.data.mechanicalCompletionPackageNo}
          />
        );
      } else {
        return null;
      }
    },
    onCellClicked: () => {},
  },
  {
    colId: 'Priority1',
    headerName: domainNames.priority1,
    headerTooltip: domainNames.priority1,
    valueGetter: (pkg) => pkg.data?.priority1,
    enableRowGroup: false,
  },
  {
    colId: 'RfcPlannedForecastDate',
    headerName: 'Planned/Forecast RFC',
    headerTooltip: 'Planned/Forecast RFC',
    valueGetter: (pkg) => pkg.data?.rfC_Planned_Forecast_Date,
    cellRenderer: (props: ICellRendererProps<Loop, string | null>) => {
      if (props.node.group) return null;
      return <DateCell dateString={props.value} />;
    },
  },
  {
    colId: 'RfoPlannedForecastDate',
    headerName: 'Planned/Forecast RFO',
    headerTooltip: 'Planned/Forecast RFO',
    valueGetter: (pkg) => pkg.data?.rfO_Planned_Forecast_Date,
    cellRenderer: (props: ICellRendererProps<Loop, string | null>) => {
      if (props.node.group) return null;
      return <DateCell dateString={props.value} />;
    },
  },
  {
    colId: 'CLStatus',
    headerName: domainNames.checklistStatus,
    headerTooltip: domainNames.checklistStatus,
    valueGetter: (pkg) => pkg.data?.status,
    cellRenderer: (props: ICellRendererProps<Loop, Status | null>) => {
      return (
        <StatusCell
          content={props.value ?? null}
          cellAttributeFn={() => ({
            style: {
              backgroundColor: props.value ? statusColorMap[props.value] : 'transparent',
            },
          })}
        />
      );
    },
    enableRowGroup: false,
  },
  {
    colId: 'Responsible',
    headerName: domainNames.responsible,
    headerTooltip: domainNames.responsible,
    valueGetter: (pkg) => pkg.data?.responsible,
    enableRowGroup: false,
  },
  {
    colId: 'Location',
    headerName: domainNames.location,
    headerTooltip: domainNames.location,
    valueGetter: (pkg) => pkg.data?.location,
    cellRenderer: (props: ICellRendererProps<Loop, string>) => {
      return <StyledMonospace>{props.data?.location}</StyledMonospace>;
    },
    enableRowGroup: false,
  },
  {
    colId: 'FormularType',
    headerName: domainNames.formType,
    headerTooltip: domainNames.formType,
    valueGetter: (pkg) => pkg.data?.formularType,
    cellRenderer: (props: ICellRendererProps<Loop, string>) => {
      if (!props.data?.formularType || !props.data.formTypeUrl) return null;
      return <LinkCell url={props.data.formTypeUrl} urlText={props.data.formularType} />;
    },
    onCellClicked: () => {},
    enableRowGroup: false,
  },
  {
    colId: 'SignedDate',
    headerName: 'Signed',
    headerTooltip: 'Signed Date',
    valueGetter: (pkg) => pkg.data?.signedDate,
    cellRenderer: (props: ICellRendererProps<Loop, string | null>) => {
      if (props.node.group) return null;
      return <DateCell dateString={props.value} />;
    },
  },
  {
    colId: 'VerifiedDate',
    headerName: 'Verified',
    headerTooltip: 'Verified Date',
    valueGetter: (pkg) => pkg.data?.verifiedDate,
    cellRenderer: (props: ICellRendererProps<Loop, string | null>) => {
      if (props.node.group) return null;
      return <DateCell dateString={props.value} />;
    },
  },
  {
    headerName: 'Content MC status',
    headerTooltip: 'Content MC status',
    valueGetter: (pkg) => pkg.data?.loopContentStatus,
    cellRenderer: (props: ICellRendererProps<Loop, Status | null>) => {
      return (
        <StatusCell
          content={props.value ?? null}
          cellAttributeFn={() => ({
            style: {
              backgroundColor: props.value ? statusColorMap[props.value] : 'transparent',
            },
          })}
        />
      );
    },
    enableRowGroup: false,
  },
  {
    colId: 'WoPlannedCompletionDate',
    headerName: 'Planned MC complete',
    headerTooltip: 'Planned MC complete',
    valueGetter: (pkg) => pkg.data?.woPlannedCompletionDate,
    cellRenderer: (props: ICellRendererProps<Loop, string | null>) => {
      if (props.node.group) return null;
      return <DateCell dateString={props.value} />;
    },
  },
  {
    colId: 'RemainingManHours',
    headerName: domainNames.remainingManHours,
    headerTooltip: domainNames.remainingManHours,

    valueGetter: (pkg) => pkg.data?.remainingManHours,
  },
];
