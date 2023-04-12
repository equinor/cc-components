import { ColDef, ICellRendererProps } from '@equinor/workspace-ag-grid';

import { McBase } from './types';
import { proCoSysUrls } from '../../../../../../mapping/src/lib/procosys/procosysUrls';
import { LinkCell } from '../../../../../../table-helpers/src/lib/table/cells/LinkCell';
import { DescriptionCell } from '../../../../../../table-helpers/src/lib/table/cells/DescriptionCell';
import { colorMap } from '../../../../../../mapping';
import { StatusCell } from '../../../../../../table-helpers';
import { PackageStatus } from '../../../../../../types';
import { getRFCCStatus, getRFOCStatus } from '../../../../../../utils-statuses';

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
    valueGetter: (pkg) => pkg.data?.mcStatus,
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
