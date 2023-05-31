import { Loop, Status } from '@cc-components/loopshared';
import { proCoSysUrls, statusColorMap } from '@cc-components/shared/mapping';
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
import { ICellRendererProps } from '@equinor/workspace-ag-grid';
import { FilterStateGroup } from '@equinor/workspace-fusion/filter';
import { ColDef, GridConfig } from '@equinor/workspace-fusion/grid';

export const useTableConfig = (
  contextId: string
): GridConfig<Loop, FilterStateGroup[]> => {
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

  return {
    columnDefinitions: colDefs as [ColDef<Loop>, ...ColDef<Loop>[]],
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
    getRows: getRows,
  };
};

const columnDefinitions: ColDef<Loop>[] = [
  {
    field: 'Loop tag',
    valueGetter: (pkg) => pkg.data?.loopNo,
    cellRenderer: (props: ICellRendererProps<Loop, string>) => {
      return <StyledMonospace>{props.data?.loopNo}</StyledMonospace>;
    },
    // valueFormatter: (pkg) =>
    //   pkg.data?.loopUrlId ? proCoSysUrls.getTagUrl(pkg.data.loopUrlId) : '',
    // cellRenderer: (props: ICellRendererProps<Loop, string | null>) => {
    //   if (!props.valueFormatted) {
    //     return null;
    //   }
    //   return <LinkCell url={props.valueFormatted} urlText={props.value ?? ''} />;
    // },
  },
  {
    field: 'Description',
    colId: 'description',
    valueGetter: (pkg) => pkg.data?.description,
    cellRenderer: (props: ICellRendererProps<Loop, string>) => {
      return <DescriptionCell description={props.value} />;
    },
    width: 350,
  },
  {
    field: 'System',
    valueGetter: (pkg) => pkg.data?.system,
    cellRenderer: (props: ICellRendererProps<Loop, string>) => {
      return <StyledMonospace>{props.data?.system}</StyledMonospace>;
    },
    enableRowGroup: true,
  },
  {
    field: 'Comm pkg',
    valueGetter: (pkg) => pkg.data?.commissioningPackageNo,
    cellRenderer: (props: ICellRendererProps<Loop, string>) => {
      return <StyledMonospace>{props.data?.commissioningPackageNo}</StyledMonospace>;
    },
    // valueFormatter: (pkg) =>
    //   pkg.data?.commissioningPackageId
    //     ? proCoSysUrls.getCommPkgUrl(pkg.data.commissioningPackageId)
    //     : '',
    // cellRenderer: (props: ICellRendererProps<Loop, string>) => {
    //   if (props.valueFormatted) {
    //     return <LinkCell url={props.valueFormatted} urlText={props.value} />;
    //   } else {
    //     return null;
    //   }
    // },
  },
  {
    field: 'MC pkg',
    valueGetter: (pkg) => pkg.data?.mechanicalCompletionPackageNo,
    cellRenderer: (props: ICellRendererProps<Loop, string>) => {
      return (
        <StyledMonospace>{props.data?.mechanicalCompletionPackageNo}</StyledMonospace>
      );
    },
    // valueFormatter: (pkg) =>
    //   pkg.data?.mechanicalCompletionPackageId
    //     ? proCoSysUrls.getMcUrl(pkg.data.mechanicalCompletionPackageId)
    //     : '',
    // cellRenderer: (props: ICellRendererProps<Loop, string>) => {
    //   if (props.valueFormatted) {
    //     return <LinkCell url={props.valueFormatted} urlText={props.value} />;
    //   } else {
    //     return null;
    //   }
    // },
  },
  {
    field: 'Priority',
    valueGetter: (pkg) => pkg.data?.priority1,
    enableRowGroup: true,
  },
  {
    field: 'Planned/Forecast RFC',
    valueGetter: (pkg) => pkg.data?.rfC_Planned_Forecast_Date,
    cellRenderer: (props: ICellRendererProps<Loop, string | null>) => {
      if (props.node.group) return null;
      return <DateCell dateString={props.value} />;
    },
  },
  {
    field: 'Planned/Forecast RFO',
    valueGetter: (pkg) => pkg.data?.rfO_Planned_Forecast_Date,
    cellRenderer: (props: ICellRendererProps<Loop, string | null>) => {
      if (props.node.group) return null;
      return <DateCell dateString={props.value} />;
    },
  },
  {
    field: 'Checklist status',
    valueGetter: (pkg) => pkg.data?.status,
    cellRenderer: (props: ICellRendererProps<Loop, Status | null>) => {
      return (
        <StatusCell
          content={props.value}
          cellAttributeFn={() => ({
            style: {
              backgroundColor: props.value ? statusColorMap[props.value] : 'transparent',
            },
          })}
        />
      );
    },
    enableRowGroup: true,
  },
  {
    field: 'Responsible',
    valueGetter: (pkg) => pkg.data?.responsible,
    enableRowGroup: true,
  },
  {
    field: 'Location',
    valueGetter: (pkg) => pkg.data?.location,
    cellRenderer: (props: ICellRendererProps<Loop, string>) => {
      return <StyledMonospace>{props.data?.location}</StyledMonospace>;
    },
    enableRowGroup: true,
  },
  {
    field: 'Form type',
    valueGetter: (pkg) => pkg.data?.formularType,
    cellRenderer: (props: ICellRendererProps<Loop, string>) => {
      return <StyledMonospace>{props.data?.formularType}</StyledMonospace>;
    },
    enableRowGroup: true,
  },
  {
    field: 'Signed',
    valueGetter: (pkg) => pkg.data?.signedDate,
    cellRenderer: (props: ICellRendererProps<Loop, string | null>) => {
      if (props.node.group) return null;
      return <DateCell dateString={props.value} />;
    },
  },
  {
    field: 'Verified',
    valueGetter: (pkg) => pkg.data?.verifiedDate,
    cellRenderer: (props: ICellRendererProps<Loop, string | null>) => {
      if (props.node.group) return null;
      return <DateCell dateString={props.value} />;
    },
  },
  {
    field: 'Content MC status',
    valueGetter: (pkg) => pkg.data?.loopContentStatus,
    cellRenderer: (props: ICellRendererProps<Loop, Status | null>) => {
      return (
        <StatusCell
          content={props.value}
          cellAttributeFn={() => ({
            style: {
              backgroundColor: props.value ? statusColorMap[props.value] : 'transparent',
            },
          })}
        />
      );
    },
    enableRowGroup: true,
  },
  {
    field: 'Planned MC complete',
    valueGetter: (pkg) => pkg.data?.woPlannedCompletionDate,
    cellRenderer: (props: ICellRendererProps<Loop, string | null>) => {
      if (props.node.group) return null;
      return <DateCell dateString={props.value} />;
    },
  },
  // {
  //   field: 'Actual MC complete',
  //   valueGetter: (pkg) => pkg.data?.woActualCompletionDate,
  //   cellRenderer: (props: ICellRendererProps<Loop, string | null>) => {
  //     return <DateCell dateString={props.value} />;
  //   },
  //   width: 150,
  // },
  {
    field: 'Rem mhrs',
    valueGetter: (pkg) => pkg.data?.remainingManHours,
    // valueFormatter: (pkg) => pkg.context.maxRemHrs,
    // cellRenderer: (props: ICellRendererProps<Loop, number | null>) => {
    //   if (props.node.group) return null;
    //   return (
    //     <EstimateCell
    //       current={Number(props.value ?? '0')}
    //       max={(props.valueFormatted as unknown as number) ?? 0}
    //     />
    //   );
    // },
  },
];
