import { GridConfig, ICellRendererProps } from '@equinor/workspace-fusion/grid';
import { CheckList, Heattrace } from '@cc-components/heattraceshared';
import { FilterStateGroup } from '@equinor/workspace-fusion/filter';
import {
  defaultGridOptions,
  useGridDataSource,
} from '@cc-components/shared/workspace-config';
import { DateCell, DescriptionCell, StyledMonospace } from '@cc-components/shared';
import { generateCommaSeperatedStringArrayColumn } from '../utils-table/generateCommaSeperatedStringArrayColumn';
import { getHTList } from '../utils-table/tableHelpers';
import { useHttpClient } from '@equinor/fusion-framework-react-app/http';

import data from '../data.json' assert { type: 'json' };

const pipetests: Heattrace[] = data as any;

export const useTableConfig = (
  contextId: string
): GridConfig<Heattrace, FilterStateGroup[]> => {
  // const client = useHttpClient('cc-api');
  // const { getRows } = useGridDataSource(async (req) => {
  //   const res = await client.fetch(`/api/contexts/${contextId}/piping/grid`, req);
  //   const meta = (await res.json()) as { items: any[]; rowCount: number };
  //   return {
  //     rowCount: meta.rowCount,
  //     rowData: meta.items,
  //   };
  // });

  //Temp solution while waiting on api
  const getRows = async (args: any) => {
    const { request, success } = args;
    success({
      rowCount: pipetests.length,
      rowData: pipetests.slice(request.startRow, (request.endRow ?? 0) + 1),
    });
  };
  return {
    gridOptions: {
      ...defaultGridOptions,
      onFirstDataRendered: (e) => {
        e.columnApi.autoSizeColumns(
          e.columnApi
            .getAllDisplayedColumns()
            .filter((column) => column.getColId() !== 'description')
        );
      },
    },
    getRows: getRows,
    columnDefinitions: [
      {
        field: 'Heattrace',
        valueGetter: (pkg) => 'Tag name',
        cellRenderer: (props: ICellRendererProps<Heattrace, string>) => {
          return <StyledMonospace>{props.value}</StyledMonospace>;
        },
      },
      {
        field: 'Description',
        colId: 'description',
        valueGetter: (pkg) => 'Skal mulig bort',
        cellRenderer: (props: ICellRendererProps<Heattrace, string | null>) => {
          return <DescriptionCell description={props.value} />;
        },
        width: 300,
      },
      { field: 'Priority', valueGetter: (pkg) => 'Usikker' },
      {
        field: 'Location',
        valueGetter: (pkg) => 'Tag location',
        cellRenderer: (props: ICellRendererProps<Heattrace, string>) => {
          return <StyledMonospace>{props.value}</StyledMonospace>;
        },
      },
      { field: 'Checklist status', valueGetter: (pkg) => 't.b.d :D' },
      { field: 'Current step', valueGetter: (pkg) => 't.b.d :D' },
      {
        field: 'RFC',
        valueGetter: (pkg) => 'RFC',
        cellRenderer: (
          props: ICellRendererProps<Heattrace, string | null | undefined>
        ) => {
          return props.value ? <DateCell dateString={props.value} /> : null;
        },
      },
      {
        field: 'Pipetests',
        valueGetter: (pkg) => 'Pipetests',
        cellRenderer: (props: ICellRendererProps<Heattrace, CheckList[]>) => {
          if (!props.value) return null;
          return props.value;
          // (
          //   <StyledMonospace>
          //     {generateCommaSeperatedStringArrayColumn(getHTList(props.value))}
          //   </StyledMonospace>
          // );
        },
      },
    ],
  };
};
