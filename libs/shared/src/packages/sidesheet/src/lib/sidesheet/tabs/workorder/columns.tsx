import { ColDef, ICellRendererProps } from '@equinor/workspace-ag-grid';
import styled from 'styled-components';

import { DateCell } from '../../../../../../table-helpers/src/lib/table/cells/DateCell';
import { DescriptionCell } from '../../../../../../table-helpers/src/lib/table/cells/DescriptionCell';
import { EstimateCell } from '../../../../../../table-helpers/src/lib/table/cells/EstimateCell';
import { LinkCell } from '../../../../../../table-helpers/src/lib/table/cells/LinkCell';
import { ProgressCell } from '../../../../../../table-helpers/src/lib/table/cells/ProgressCell';
import { WorkorderBase } from './types';

export const columns = (): ColDef<WorkorderBase>[] => {
  let estimateHoursMax = -1;
  let remainingHoursMax = -1;

  return [
    {
      field: 'WO',
      valueGetter: (pkg) => pkg.data?.workOrderNumber,
      cellRenderer: (props: ICellRendererProps<WorkorderBase, string | null>) => {
        return (
          <LinkCell
            url={props.data?.workOrderUrl}
            urlText={props.data?.workOrderNumber}
          />
        );
      },
      minWidth: 200,
    },
    {
      field: 'Title',
      valueGetter: (pkg) => pkg.data?.title,
      cellRenderer: (props: ICellRendererProps<WorkorderBase>) => {
        return <DescriptionCell description={props?.value} />;
      },
      minWidth: 200,
    },
    {
      field: 'Discipline',
      valueGetter: (pkg) => pkg.data?.discipline,
      width: 130,
    },
    {
      field: 'Status',
      valueGetter: (pkg) => pkg.data?.jobStatus,
      width: 120,
    },
    {
      field: 'Plan. finish',
      valueGetter: (pkg) => pkg.data?.plannedFinishDate,
      cellRenderer: (props: ICellRendererProps<WorkorderBase>) => {
        return <DateCell dateString={props.value} />;
      },
      width: 100,
    },
    {
      field: 'Act. finish',
      valueGetter: (pkg) => pkg.data?.actualCompletionDate,
      cellRenderer: (props: ICellRendererProps<WorkorderBase>) => {
        return <DateCell dateString={props.value} />;
      },
      width: 100,
    },
    {
      field: 'Progress',
      valueGetter: (pkg) => pkg.data?.projectProgress,
      cellRenderer: (props: ICellRendererProps<WorkorderBase>) => {
        return (
          <Center>
            <ProgressCell percentWidth={props.value === null ? 0 : props.value} />
          </Center>
        );
      },
      width: 140,
    },
    {
      field: 'Estimated',
      valueGetter: (pkg) => pkg.data?.estimatedHours,
      cellRenderer: (props: ICellRendererProps<WorkorderBase>) => {
        if (estimateHoursMax === -1) {
          //TODO: Get all rows for current column, map through it and calculate the max estimatedManHours
          const maxCount = 0;
          estimateHoursMax = maxCount;
        }
        return (
          <Center>
            <EstimateCell
              current={Number(props.value === null ? 0 : props.value)}
              max={estimateHoursMax}
            />
          </Center>
        );
      },
      width: 140,
    },
    {
      field: 'Remaining',
      valueGetter: (pkg) => pkg.data?.remainingHours,
      cellRenderer: (props: ICellRendererProps<WorkorderBase>) => {
        if (remainingHoursMax === -1) {
          //TODO: Get all rows for current column, map through it and calculate the max estimatedManHours
          const maxCount = 0;
          remainingHoursMax = maxCount;
        }
        return (
          <Center>
            <EstimateCell
              current={Number(props.value === null ? 0 : props.value)}
              max={remainingHoursMax}
            />
          </Center>
        );
      },
      width: 140,
    },
  ];
};

const Center = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  align-items: center;
`;
