import { ColDef, ICellRendererProps } from '@equinor/workspace-ag-grid';
import { colorMap, proCoSysUrls } from 'libs/shared/src/lib/mapping';
import { PackageStatus } from 'libs/shared/src/lib/types';
import { getRFCCStatus, getRFOCStatus } from 'libs/shared/src/lib/utils-statuses';
import { DescriptionCell, LinkCell, StatusCell } from '../../../table';
import { McBase } from './types';

export const columns: ColDef<McBase>[] = [
  {
    field: 'MC.Pkg',
    valueGetter: (pkg) => pkg.data?.mcPkgNo,
    valueFormatter: (pkg) => {
      if (pkg.data?.mcPkgId) {
        return proCoSysUrls.getMcUrl(pkg.data.mcPkgId);
      } else return '';
    },
    cellRenderer: (props: ICellRendererProps<McBase>) => {
      if (props.valueFormatted) {
        return <LinkCell url={props.valueFormatted} urlText={props.value} />;
      } else return null;
    },
  },
  {
    field: 'Title',
    valueGetter: (pkg) => pkg.data?.description,
    cellRenderer: (props: ICellRendererProps<McBase>) => (
      <DescriptionCell description={props.value} />
    ),
  },
  {
    field: 'Status',
    valueGetter: (pkg) => pkg.data?.mcStatus,
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
  },
];
