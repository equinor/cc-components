import {
  DateCell,
  DescriptionCell,
  hasProperty,
  LinkCell,
  StatusCell,
  StatusCircle,
  statusColorMap,
} from '@cc-components/shared';
import { GridConfig, ICellRendererProps } from '@equinor/workspace-fusion/grid';
import { Punch } from '../types';
export const tableConfig: GridConfig<Punch> = {
  columnDefinitions: [
    {
      field: 'Punch',
      valueGetter: (pkg) => pkg.data?.punchItemNo,
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
      width: 150,
    },
    // {
    //   field: 'Priority',
    //   valueGetter: (pkg) => pkg.data?.priority,
    //   width: 100,
    // },
    {
      field: 'PL Sorting',
      valueGetter: (pkg) => pkg.data?.sorting,
      width: 100,
    },
    {
      field: 'PL Type',
      valueGetter: (pkg) => pkg.data?.type,
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
      width: 150,
    },
    {
      field: 'Clearing by org',
      valueGetter: (pkg) => pkg.data?.cleardBy,
      width: 150,
    },
    {
      field: 'Cleared',
      valueGetter: (pkg) => pkg.data?.clearedAtDate,
      cellRenderer: (props: ICellRendererProps<Punch, string | null | undefined>) => {
        return props.value ? new Date(props.value).toLocaleDateString : '';
      },
      width: 100,
    },
    {
      field: 'Verified',
      valueGetter: (pkg) => pkg.data?.verifiedAtDate,
      cellRenderer: (props: ICellRendererProps<Punch, string | null | undefined>) => {
        return props.value ? new Date(props.value).toLocaleDateString : '';
      },
      width: 100,
    },
    {
      field: 'Handover plan',
      valueGetter: (pkg) => pkg.data?.handoverPlan,
      cellRenderer: (props: ICellRendererProps<Punch, string | null | undefined>) => {
        return props.value ? new Date(props.value).toLocaleDateString : '';
      },
      width: 110,
    },
    {
      field: 'Form type',
      valueGetter: (pkg) => pkg.data?.formularType,
      cellRenderer: (props: ICellRendererProps<Punch, string | null | undefined>) => {
        if (props.valueFormatted && props.value) {
          return <LinkCell url={props.valueFormatted} urlText={props.value} />;
        }
        return null;
      },
      width: 100,
    },
    {
      field: 'Tag',
      valueGetter: (pkg) => pkg.data?.tagNo,
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
