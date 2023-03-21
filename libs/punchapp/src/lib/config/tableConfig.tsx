import { Punch } from '@cc-components/punchshared';
import { proCoSysUrls, statusColorMap } from '@cc-components/shared/mapping';
import {
  DescriptionCell,
  LinkCell,
  StatusCell,
} from '@cc-components/shared/table-helpers';
import { hasProperty } from '@cc-components/shared/utils-typescript';
import { GridConfig, ICellRendererProps } from '@equinor/workspace-fusion/grid';
export const tableConfig: GridConfig<Punch> = {
  columnDefinitions: [
    {
      field: 'Punch',
      valueGetter: (pkg) => pkg.data?.punchItemNo,
      valueFormatter: (pkg) =>
        pkg.data?.punchItemNo ? proCoSysUrls.getPunchUrl(pkg.data.punchItemNo) : '',
      cellRenderer: (props: ICellRendererProps<Punch, string | null | undefined>) => {
        if (props.valueFormatted && props.value) {
          return <LinkCell url={props.valueFormatted} urlText={props.value} />;
        }
        return null;
      },
      width: 100,
    },
    {
      field: 'Description',
      valueGetter: (pkg) => pkg.data?.description,
      cellRenderer: (props: ICellRendererProps<Punch, string | null | undefined>) => {
        return <DescriptionCell description={props.value} />;
      },
      width: 300,
    },
    {
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
      enableRowGroup: true,
      width: 100,
    },
    {
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
      enableRowGroup: true,
      width: 150,
    },
    {
      field: 'PL Sorting',
      valueGetter: (pkg) => pkg.data?.sorting,
      enableRowGroup: true,
      width: 100,
    },
    {
      field: 'PL Type',
      valueGetter: (pkg) => pkg.data?.type,
      enableRowGroup: true,
      width: 100,
    },
    {
      field: 'Estimate',
      valueGetter: (pkg) => pkg.data?.estimate,
      width: 100,
    },
    {
      field: 'Raised by org',
      valueGetter: (pkg) => pkg.data?.raisedBy,
      enableRowGroup: true,
      width: 150,
    },
    {
      field: 'Clearing by org',
      valueGetter: (pkg) => pkg.data?.clearedBy,
      enableRowGroup: true,
      width: 150,
    },
    {
      field: 'Cleared',
      valueGetter: (pkg) => pkg.data?.clearedAtDate,
      cellRenderer: (props: ICellRendererProps<Punch, string | null | undefined>) => {
        return props.value ? new Date(props.value).toLocaleDateString() : '';
      },
      width: 100,
    },
    {
      field: 'Verified',
      valueGetter: (pkg) => pkg.data?.verifiedAtDate,
      cellRenderer: (props: ICellRendererProps<Punch, string | null | undefined>) => {
        return props.value ? new Date(props.value).toLocaleDateString() : '';
      },
      width: 100,
    },
    {
      field: 'Handover plan',
      valueGetter: (pkg) => pkg.data?.handoverPlan,
      cellRenderer: (props: ICellRendererProps<Punch, string | null | undefined>) => {
        return props.value ? new Date(props.value).toLocaleDateString() : '';
      },
      width: 110,
    },
    {
      field: 'Form type',
      valueGetter: (pkg) => pkg.data?.formularType,
      valueFormatter: (pkg) =>
        pkg.data?.checklistUrlId
          ? proCoSysUrls.getFormTypeUrl(pkg.data.checklistUrlId)
          : '',
      cellRenderer: (props: ICellRendererProps<Punch, string | null | undefined>) => {
        if (props.valueFormatted && props.value) {
          return <LinkCell url={props.valueFormatted} urlText={props.value} />;
        }
        return null;
      },
      enableRowGroup: true,
      width: 100,
    },
    {
      field: 'Tag',
      valueGetter: (pkg) => pkg.data?.tagNo,
      valueFormatter: (pkg) =>
        pkg.data?.tagUrlId ? proCoSysUrls.getTagUrl(pkg.data.tagUrlId) : '',
      cellRenderer: (props: ICellRendererProps<Punch, string | null | undefined>) => {
        if (props.valueFormatted && props.value) {
          return <LinkCell url={props.valueFormatted} urlText={props.value} />;
        }
        return null;
      },
      width: 150,
    },
    {
      field: 'Commpkg',
      valueGetter: (pkg) => pkg.data?.commissioningPackageNo,
      valueFormatter: (pkg) =>
        pkg.data?.commissioningPackageUrlId
          ? proCoSysUrls.getCommPkgUrl(pkg.data.commissioningPackageUrlId)
          : '',
      cellRenderer: (props: ICellRendererProps<Punch, string | null | undefined>) => {
        if (props.valueFormatted && props.value) {
          return <LinkCell url={props.valueFormatted} urlText={props.value} />;
        }
        return null;
      },
      width: 150,
    },
    {
      field: 'Workorder',
      valueGetter: (pkg) => pkg.data?.workOrderNo,
      valueFormatter: (pkg) =>
        pkg.data?.workOrderUrlId
          ? proCoSysUrls.getWorkOrderUrl(pkg.data.workOrderUrlId)
          : '',
      cellRenderer: (props: ICellRendererProps<Punch, string | null | undefined>) => {
        if (props.valueFormatted && props.value) {
          return <LinkCell url={props.valueFormatted} urlText={props.value} />;
        }
        return null;
      },
      width: 150,
    },
    {
      field: 'Material required',
      valueGetter: (pkg) => pkg.data?.materialRequired,
      enableRowGroup: true,
      width: 120,
    },
    {
      field: 'Material estimate',
      valueGetter: (pkg) => pkg.data?.materialEstimatedTimeOfArrival,
      cellRenderer: (props: ICellRendererProps<Punch, string | null | undefined>) => {
        return props.value ? new Date(props.value).toLocaleDateString : '';
      },
      width: 150,
    },
  ],
};
