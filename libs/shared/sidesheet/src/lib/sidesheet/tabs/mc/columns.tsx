import { ColDef, ICellRendererProps } from '@equinor/workspace-ag-grid';
import { colorMap, proCoSysUrls } from '@cc-components/shared/mapping';
import { PackageStatus } from '@cc-components/shared/types';
import { getRFCCStatus, getRFOCStatus } from '@cc-components/shared/utils-statuses';
import {
  DescriptionCell,
  LinkCell,
  StatusCell,
} from '@cc-components/shared/table-helpers';
import { McBase } from './types';

export const columns: ColDef<McBase>[] = [
  {
    field: 'MC.Pkg',
    valueGetter: (pkg) => pkg.data?.mechanicalCompletionPackageNo,
    valueFormatter: (pkg) => {
      if (pkg.data?.mechanicalCompletionPackageUrlId) {
        return proCoSysUrls.getMcUrl(pkg.data.mechanicalCompletionPackageUrlId);
      } else return '';
    },
    cellRenderer: (props: ICellRendererProps<McBase>) => {
      if (props.valueFormatted) {
        return <LinkCell url={props.valueFormatted} urlText={props.value} />;
      } else return null;
    },
    width: 100,
  },
  {
    field: 'Title',
    valueGetter: (pkg) => pkg.data?.description,
    cellRenderer: (props: ICellRendererProps<McBase>) => (
      <DescriptionCell description={props.value} />
    ),
    width: 250,
  },
  {
    field: 'Status',
    valueGetter: (pkg) => pkg.data?.mechanicalCompletionPackageStatus,
    width: 150,
  },
  {
    field: 'RFCC',
    valueGetter: (pkg) => pkg.data && getRFCCStatus(pkg.data),
    cellRenderer: (props: ICellRendererProps<McBase, PackageStatus | undefined>) => (
      <StatusCell
        content={`${props.value}`.replace('RFCC', '')}
        cellAttributeFn={() => ({
          style: {
            backgroundColor: props.value ? colorMap[props.value] : 'transparent',
          },
        })}
      />
    ),
    width: 150,
  },
  {
    field: 'RFOC',
    valueGetter: (pkg) => pkg.data && getRFOCStatus(pkg.data),
    cellRenderer: (props: ICellRendererProps<McBase, PackageStatus | undefined>) => (
      <StatusCell
        content={`${props.value}`.replace('RFOC', '')}
        cellAttributeFn={() => ({
          style: { backgroundColor: props.value ? colorMap[props.value] : 'transparent' },
        })}
      />
    ),
    width: 150,
  },
];
