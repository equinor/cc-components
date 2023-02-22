import { Loop } from '@cc-components/loopshared';
import {
  hasProperty,
  LinkCell,
  proCoSysUrls,
  StatusCell,
  statusColorMap,
  TabTable,
} from '@cc-components/shared';
import { ColDef, ICellRendererProps } from '@equinor/workspace-ag-grid';
import { LoopContent } from '../types';
import { useGetLoopContent } from '../utils-sidesheet/useGetLoopContent';

const columns: ColDef<LoopContent>[] = [
  {
    field: 'Tag',
    valueGetter: (pkg) => pkg.data?.contentTagNo,
    valueFormatter: (pkg) => {
      if (pkg.data?.contentTagId) {
        return proCoSysUrls.getTagUrl(pkg.data.contentTagId);
      }
      return '';
    },
    cellRenderer: (props: ICellRendererProps<LoopContent, string | null>) => {
      if (props.valueFormatted) {
        return <LinkCell url={props.valueFormatted} urlText={props.value ?? ''} />;
      }
      return null;
    },
  },
  {
    field: 'Description',
    valueGetter: (pkg) => pkg.data?.description,
  },
  {
    field: 'MC status',
    valueGetter: (pkg) => pkg.data?.mechanicalCompletionStatus,
    cellRenderer: (props: ICellRendererProps<LoopContent, string | null>) => {
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
  },
  {
    field: 'Cmpkg',
    valueGetter: (pkg) => pkg.data?.commissioningPackageNo,
    valueFormatter: (pkg) => {
      if (pkg.data?.commissioningPackageUrlId) {
        return proCoSysUrls.getCommPkgUrl(pkg.data.commissioningPackageUrlId);
      }
      return '';
    },
    cellRenderer: (props: ICellRendererProps<LoopContent, string | null>) => {
      if (props.valueFormatted) {
        return <LinkCell url={props.valueFormatted} urlText={props.value ?? ''} />;
      }
      return null;
    },
  },
  {
    field: 'MCpkg',
    valueGetter: (pkg) => pkg.data?.mechanicalCompletionPackageNo,
    valueFormatter: (pkg) => {
      if (pkg.data?.mechanicalCompletionPackageUrlId) {
        return proCoSysUrls.getCommPkgUrl(pkg.data.mechanicalCompletionPackageUrlId);
      }
      return '';
    },
    cellRenderer: (props: ICellRendererProps<LoopContent, string | null>) => {
      if (props.valueFormatted) {
        return <LinkCell url={props.valueFormatted} urlText={props.value ?? ''} />;
      }
      return null;
    },
  },
];

type ContentTableProps = {
  loop: Loop;
};

export const ContentTable = ({ loop }: ContentTableProps) => {
  const { data, error, isLoading } = useGetLoopContent();

  return (
    <div>
      <TabTable
        packages={data}
        error={error instanceof Error ? error : null}
        isFetching={isLoading}
        resourceName="ContentTable"
        columns={columns}
        height={100}
      />
    </div>
  );
};
