import { statusColorMap } from '@cc-components/shared/mapping';
import { LinkCell, StatusCell, TabTable } from '@cc-components/shared/table-helpers';
import { hasProperty } from '@cc-components/shared/utils-typescript';
import { ColDef, ICellRendererProps } from '@equinor/workspace-fusion/grid';
import { ChecklistForLoop } from '../types';
import { useGetChecklists } from '../utils-sidesheet';

const columns: ColDef<ChecklistForLoop>[] = [
  {
    headerName: 'Group',
    valueGetter: (pkg) => pkg.data?.formularGroup,
    width: 100,
  },
  {
    headerName: 'Comm Pkg',
    valueGetter: (pkg) => pkg.data?.commissioningPackageNo,
    cellRenderer: (props: ICellRendererProps<ChecklistForLoop, string | null>) => {
      return props.value ? (
        <LinkCell
          url={props.data?.commissioningPackageUrl}
          urlText={props.value}
          aiLinkLocation="loop checklist sidesheet"
          aiLinktype="CommPkgNo"
        />
      ) : (
        'N/A'
      );
    },
    width: 100,
  },
  {
    headerName: 'MC Pkg',
    valueGetter: (pkg) => pkg.data?.mechanicalCompletionPackageNo,
    cellRenderer: (props: ICellRendererProps<ChecklistForLoop, string | null>) => {
      return props.value ? (
        <LinkCell
          url={props.data?.mechanicalCompletionPackageUrl}
          urlText={props.value}
          aiLinkLocation="loop checklist sidesheet"
          aiLinktype="McPkgNo"
        />
      ) : (
        'N/A'
      );
    },
    width: 100,
  },
  {
    headerName: 'Checklist Status',
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
    width: 100,
  },
  {
    headerName: 'Form Type',
    valueGetter: (pkg) => pkg.data?.formularType,
    cellRenderer: (props: ICellRendererProps<ChecklistForLoop, string | null>) => {
      return props.value ? (
        <LinkCell
          url={props.data?.checklistUrl}
          urlText={props.value}
          aiLinkLocation="loop checklist sidesheet"
          aiLinktype="From Type"
        />
      ) : (
        'N/A'
      );
    },
    width: 100,
  },
  {
    headerName: 'Responsible',
    valueGetter: (pkg) => pkg.data?.responsible,
    width: 100,
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
      />
    </div>
  );
};
