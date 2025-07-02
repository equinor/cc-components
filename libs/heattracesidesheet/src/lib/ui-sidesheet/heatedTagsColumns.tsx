import { ColDef, ICellRendererProps } from '@equinor/workspace-ag-grid';
import { HeatTraceHeatedTag } from '@cc-components/heattraceshared';

import { LinkCell } from '@cc-components/shared';

export const heatedTagsColumns: ColDef<HeatTraceHeatedTag>[] = [
  {
    headerName: 'Tag No',
    valueGetter: (pkg) => pkg.data?.heatedTagNo,
    cellRenderer: (props: ICellRendererProps<HeatTraceHeatedTag>) => {
      return (
        <LinkCell
          url={props.data?.tagUrl ?? ''}
          urlText={props.value ?? ''}
          aiLinkLocation="heat-trace heated-tags sidesheet"
          aiLinktype="TagNo"
        />
      );
    },
  },
  {
    headerName: 'Tag description',
    valueGetter: (pkg) => pkg.data?.description,
  },
  {
    headerName: 'Tag register',
    valueGetter: (pkg) => pkg.data?.register,
  },
  {
    headerName: 'Handover status',
    valueGetter: (pkg) => pkg.data?.mechanicalCompletionHandoverStatus,
  },
  {
    headerName: 'CommPkg',
    valueGetter: (pkg) => pkg.data?.commissioningPackageNo,
    cellRenderer: (props: ICellRendererProps<HeatTraceHeatedTag>) => {
      return (
        <LinkCell
          url={props.data?.commissioningPackageUrl ?? ''}
          urlText={props.value ?? ''}
          aiLinkLocation="heat-trace heated-tags sidesheet"
          aiLinktype="CommPkg"
        />
      );
    },
  },
  {
    headerName: 'McPkg',
    valueGetter: (pkg) => pkg.data?.mechanicalCompletionPackageNo,
    cellRenderer: (props: ICellRendererProps<HeatTraceHeatedTag>) => {
      return (
        <LinkCell
          url={props.data?.mechanicalCompletionUrl ?? ''}
          urlText={props.value ?? ''}
          aiLinkLocation="heat-trace heated-tags sidesheet"
          aiLinktype="McPkgNo"
        />
      );
    },
  },
];
