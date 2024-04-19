import { Loop } from '@cc-components/loopshared';
import { statusColorMap } from '@cc-components/shared/mapping';
import {
  DescriptionCell,
  LinkCell,
  StatusCell,
  TabTable,
} from '@cc-components/shared/table-helpers';
import { hasProperty } from '@cc-components/shared/utils-typescript';

import { ColDef, ICellRendererProps } from '@equinor/workspace-ag-grid';
import { LoopContent } from '../types';
import { useGetLoopContent } from '../utils-sidesheet/useGetLoopContent';

const columns: ColDef<LoopContent>[] = [
  {
    headerName: 'Tag',
    valueGetter: (pkg) => pkg.data?.contentTagNo,
    cellRenderer: (props: ICellRendererProps<LoopContent, string | null>) => {
      if (props.valueFormatted) {
        return (
          <LinkCell
            url={props.data?.contentTagUrl ?? undefined}
            urlText={props.value ?? ''}
          />
        );
      }
      return null;
    },
    width: 120,
  },
  {
    headerName: 'Description',
    valueGetter: (pkg) => pkg.data?.description,
    cellRenderer: (props: ICellRendererProps<LoopContent, string | null>) => {
      if (props.value) {
        return <DescriptionCell description={props.value} />;
      }
      return null;
    },
    width: 250,
  },
  {
    headerName: 'MC Status',
    valueGetter: (pkg) => pkg.data?.clStatus,
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
    width: 140,
  },
  {
    headerName: 'Comm Pkg',
    valueGetter: (pkg) => pkg.data?.commissioningPackageNo,
    cellRenderer: (props: ICellRendererProps<LoopContent, string | null>) => {
      if (props.valueFormatted) {
        return (
          <LinkCell
            url={props.data?.commissioningPackageUrl ?? undefined}
            urlText={props.value ?? ''}
          />
        );
      }
      return null;
    },
    width: 120,
  },
  {
    headerName: 'MC Pkg',
    valueGetter: (pkg) => pkg.data?.mechanicalCompletionPackageNo,
    cellRenderer: (props: ICellRendererProps<LoopContent, string | null>) => {
      if (props.valueFormatted) {
        return (
          <LinkCell
            url={props.data?.mechanicalCompletionPackageUrl ?? undefined}
            urlText={props.value ?? ''}
          />
        );
      }
      return null;
    },
    width: 140,
  },
];

type ContentTableProps = {
  loop: Loop;
};

export const ContentTable = ({ loop }: ContentTableProps) => {
  const { data, error, isLoading } = useGetLoopContent(loop.loopId);

  return (
    <div>
      <TabTable
        packages={data}
        error={error}
        isFetching={isLoading}
        resourceName="ContentTable"
        columns={columns}
        height={300}
      />
    </div>
  );
};
