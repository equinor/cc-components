import { ColDef, ICellRendererProps } from '@equinor/workspace-ag-grid';
import { MccrBase } from './types';
import { DescriptionCell } from '../../../../../../table-helpers/src/lib/table/cells/DescriptionCell';
import { StatusCell } from '../../../../../../table-helpers/src/lib/table/cells/StatusCell';
import { statusColorMap } from '../../../../../../mapping';
import { BaseStatus } from '../../../../../../types';

export const columns: ColDef<MccrBase>[] = [
  {
    field: 'TagNo.',
    valueGetter: (pkg) => pkg.data?.tagNumber,
    // valueFormatter: (pkg) =>
    //   pkg.data?.tagId ? proCoSysUrls.getTagUrl(pkg.data.tagId) : '',
    // cellRenderer: (props: ICellRendererProps<MccrBase, string | null>) => {
    //   if (!props.valueFormatted) {
    //     return null;
    //   } else {
    //     return <LinkCell url={props.valueFormatted} urlText={props.value ?? ''} />;
    //   }
    // },
  },
  {
    field: 'Description',
    valueGetter: (pkg) => pkg.data?.description,
    cellRenderer: (props: ICellRendererProps<MccrBase, string | null>) => {
      return <DescriptionCell description={props.value} />;
    },
    width: 250,
    resizable: true,
  },
  {
    field: 'Type',
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
    field: 'Status',
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
    width: 120,
  },
  {
    field: 'Res',
    valueGetter: (pkg) => pkg.data?.mccrResponsible,
    width: 120,
  },
  {
    field: 'McpkgNo.',
    valueGetter: (pkg) => pkg.data?.mcpkgNumber,
    // valueFormatter: (pkg) =>
    //   pkg.data?.mcPkgId ? proCoSysUrls.getMcUrl(pkg.data.mcPkgId) : '',
    // cellRenderer: (props: ICellRendererProps<MccrBase, string | null>) => {
    //   if (!props.valueFormatted) {
    //     return null;
    //   } else {
    //     return <LinkCell url={props.valueFormatted} urlText={props.value ?? ''} />;
    //   }
    // },
  },
  {
    field: 'Comm pkg.',
    valueGetter: (pkg) => pkg.data?.commpkgNumber,
    // valueFormatter: (pkg) =>
    //   pkg.data?.commpkgId ? proCoSysUrls.getCommPkgUrl(pkg.data.commpkgId) : '',
    // cellRenderer: (props: ICellRendererProps<MccrBase, string | null>) => {
    //   if (!props.valueFormatted) {
    //     return null;
    //   } else {
    //     return <LinkCell url={props.valueFormatted} urlText={props.value ?? ''} />;
    //   }
    // },
  },
];
