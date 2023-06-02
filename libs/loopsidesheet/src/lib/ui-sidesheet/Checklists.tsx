import { statusColorMap } from '@cc-components/shared/mapping';
import { StatusCell, TabTable } from '@cc-components/shared/table-helpers';
import { hasProperty } from '@cc-components/shared/utils-typescript';
import { ColDef, ICellRendererProps } from '@equinor/workspace-ag-grid';
import { ChecklistForLoop } from '../types';
import { useGetChecklists } from '../utils-sidesheet';

const columns: ColDef<ChecklistForLoop>[] = [
  {
    field: 'Group',
    valueGetter: (pkg) => pkg.data?.formularGroup,
    width: 120,
  },
  {
    field: 'Cmpkg',
    valueGetter: (pkg) => pkg.data?.commissioningPackageNo,
    // valueFormatter: (pkg) => {
    //   if (pkg.data?.commissioningPackageUrlId) {
    //     return proCoSysUrls.getCommPkgUrl(pkg.data.commissioningPackageUrlId);
    //   }
    //   return '';
    // },
    // cellRenderer: (props: ICellRendererProps<ChecklistForLoop, string | null>) => {
    //   if (props.valueFormatted) {
    //     return <LinkCell url={props.valueFormatted} urlText={props.value ?? ''} />;
    //   }
    //   return null;
    // },
    width: 120,
  },
  {
    headerName: 'MCpkg',
    valueGetter: (pkg) => pkg.data?.mechanicalCompletionPackageNo,
    // valueFormatter: (pkg) => {
    //   if (pkg.data?.mechanicalCompletionPackageUrlId) {
    //     return proCoSysUrls.getCommPkgUrl(pkg.data.mechanicalCompletionPackageUrlId);
    //   }
    //   return '';
    // },
    // cellRenderer: (props: ICellRendererProps<ChecklistForLoop, string | null>) => {
    //   if (props.valueFormatted) {
    //     return <LinkCell url={props.valueFormatted} urlText={props.value ?? ''} />;
    //   }
    //   return null;
    // },
    width: 130,
  },
  {
    field: 'Checklist status',
    valueGetter: (pkg) => pkg.data?.status,
    cellRenderer: (props: ICellRendererProps<ChecklistForLoop, string | null>) => {
      if (props.value) {
        return (
          <StatusCell
            content={props.value}
            cellAttributeFn={(status) => ({
              style: {
                backgroundColor: hasProperty(statusColorMap, status)
                  ? statusColorMap[status]
                  : 'transparent',
              },
            })}
          />
        );
      }
      return null;
    },
    width: 140,
  },
  {
    field: 'Form type',
    valueGetter: (pkg) => pkg.data?.formularType,
    // valueFormatter: (pkg) => {
    //   if (pkg.data?.checklistUrlId) {
    //     return proCoSysUrls.getCommPkgUrl(pkg.data.checklistUrlId);
    //   }
    //   return '';
    // },
    // cellRenderer: (props: ICellRendererProps<ChecklistForLoop, string | null>) => {
    //   if (props.valueFormatted) {
    //     return <LinkCell url={props.valueFormatted} urlText={props.value ?? ''} />;
    //   }
    //   return null;
    // },
    width: 140,
  },
  {
    field: 'Responsible',
    valueGetter: (pkg) => pkg.data?.responsible,
    width: 150,
  },
];

type ChecklistsProps = {
  loopId: string;
};

export const Checklists = ({ loopId }: ChecklistsProps) => {
  const { data, error, isLoading } = useGetChecklists(loopId);

  return (
    <div>
      <h3>Checklists</h3>
      <TabTable
        packages={data}
        error={error}
        isFetching={isLoading}
        resourceName="Checklists"
        columns={columns}
        height={120}
      />
    </div>
  );
};
