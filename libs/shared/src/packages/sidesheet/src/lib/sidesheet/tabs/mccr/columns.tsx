import { ColDef, ICellRendererProps } from '@equinor/workspace-ag-grid';
import { MccrBase } from './types';
import { DescriptionCell } from '../../../../../../table-helpers/src/lib/table/cells/DescriptionCell';
import { statusColorMap } from '../../../../../../mapping';
import { BaseStatus } from '../../../../../../types';
import {
  LinkCell,
  StyledMonospace,
  StatusCell,
} from '../../../../../../table-helpers/src/lib/table/cells';

export const columns: ColDef<MccrBase>[] = [
  {
    headerName: 'TagNo',
    minWidth: 90,
    valueGetter: (pkg) => pkg.data?.tagNumber,
    cellRenderer: (props: ICellRendererProps<MccrBase, string | null>) => {
      if (!props.data?.tagUrl) {
        return <StyledMonospace>{props.value}</StyledMonospace>;
      } else {
        return <LinkCell url={props.data?.tagUrl} urlText={props.value ?? ''} />;
      }
    },
  },
  {
    valueGetter: (pkg) => pkg.data?.description,
    cellRenderer: (props: ICellRendererProps<MccrBase, string | null>) => {
      return <DescriptionCell description={props.value} />;
    },
    minWidth: 125,
    resizable: true,
  },
  {
    valueGetter: (pkg) => pkg.data?.mccrType,
    // valueFormatter: (pkg) =>
    //   pkg.data?.mccrId ? proCoSysUrls.getFormTypeUrl(pkg.data.mccrId) : '',
    // cellRenderer: (props: ICellRendererProps<MccrBase, string | null>) => {
    //   if (!props.valueFormatted) {
    //     return null;
    //   } else {
    //     return <LinkCell url={props.valueFormatted} urlText={props.value ?? ''} />;
    //   }
    // },
  },
  {
    valueGetter: (pkg) => pkg.data?.mccrStatus,
    cellRenderer: (props: ICellRendererProps) => {
      if (!props.value) return null;
      const statusColor = statusColorMap[(props.value as BaseStatus) ?? 'OS'];
      return (
        <StatusCell
          content={props.value}
          cellAttributeFn={() => ({
            style: { backgroundColor: statusColor },
          })}
        />
      );
    },
  },
  {
    valueGetter: (pkg) => pkg.data?.mccrResponsible,
  },
  {
    valueGetter: (pkg) => pkg.data?.mcpkgNumber,
    cellRenderer: (props: ICellRendererProps<MccrBase, string | null>) => {
      if (!props.data?.mechanicalCompletionPackageUrl) {
        return <StyledMonospace>{props.value}</StyledMonospace>;
      } else {
        return (
          <LinkCell
            url={props.data?.mechanicalCompletionPackageUrl}
            urlText={props.value ?? ''}
          />
        );
      }
    },
  },
  {
    valueGetter: (pkg) => pkg.data?.commpkgNumber,
    cellRenderer: (props: ICellRendererProps<MccrBase, string | null>) => {
      if (!props.data?.commissioningPackageUrl) {
        return <StyledMonospace>{props.value}</StyledMonospace>;
      } else {
        return (
          <LinkCell
            url={props.data?.commissioningPackageUrl}
            urlText={props.value ?? ''}
          />
        );
      }
    },
  },
];
