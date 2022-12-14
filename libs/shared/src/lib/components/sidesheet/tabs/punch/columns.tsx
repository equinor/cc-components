import { ColDef, ICellRendererProps } from '@equinor/workspace-ag-grid';
import { hasProperty } from '../../../../utils-typescript';
import { proCoSysUrls, statusColorMap } from '../../../../mapping';
import { DescriptionCell, LinkCell, StatusCell } from '../../../table';
import { PunchBase } from './type';

export const columns: ColDef<PunchBase>[] = [
  {
    field: 'Tag',
    valueGetter: (pkg) => pkg.data?.tagNumber,
    valueFormatter: (pkg) =>
      pkg.data?.tagId ? proCoSysUrls.getPunchUrl(pkg.data.tagId) : '',
    cellRenderer: (props: ICellRendererProps<PunchBase, string>) => {
      if (props.valueFormatted) {
        return <LinkCell url={props.valueFormatted} urlText={props.value} />;
      } else return null;
    },
    width: 100,
  },
  {
    field: 'Description',
    valueGetter: (pkg) => pkg.data?.description,
    cellRenderer: (props: ICellRendererProps<PunchBase, string | null>) => {
      return <DescriptionCell description={props.value} />;
    },
    width: 350,
  },
  {
    field: 'To be cleared by',
    valueGetter: (pkg) => pkg.data?.toBeClearedBy,
    width: 250,
  },
  {
    field: 'Status',
    valueGetter: (pkg) => pkg.data?.status,
    cellRenderer: (props: ICellRendererProps<PunchBase, string | null>) => {
      return (
        <StatusCell
          content={props.value}
          cellAttributeFn={() => ({
            style: {
              backgroundColor: props.value
                ? hasProperty(statusColorMap, props.value)
                  ? statusColorMap[props.value]
                  : 'transparent'
                : 'transparent',
            },
          })}
        />
      );
    },
  },
  {
    field: 'Sorting',
    valueGetter: (pkg) => pkg.data?.sorting,
  },
];
