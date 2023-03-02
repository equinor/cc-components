import { Loop } from '@cc-components/loopshared';
import { proCoSysUrls, statusColorMap } from '@cc-components/shared/mapping';
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
    width: 120,
  },
  {
    field: 'Description',
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
    width: 140,
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
    width: 120,
  },
  {
    headerName: 'MCpkg',
    valueGetter: (pkg) => pkg.data?.mechanicalCompletionPackageNo,
    valueFormatter: (pkg) => {
      if (pkg.data?.mechanicalCompletionPackageUrlId) {
        return proCoSysUrls.getMcUrl(pkg.data.mechanicalCompletionPackageUrlId);
      }
      return '';
    },
    cellRenderer: (props: ICellRendererProps<LoopContent, string | null>) => {
      if (props.valueFormatted) {
        return <LinkCell url={props.valueFormatted} urlText={props.value ?? ''} />;
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
  const { data, error, isLoading } = useGetLoopContent();

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
