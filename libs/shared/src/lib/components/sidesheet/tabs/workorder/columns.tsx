import { ColDef, ICellRendererProps } from '@equinor/workspace-ag-grid';
import styled from 'styled-components';
import { proCoSysUrls } from '../../../../mapping';
import {
  DateCell,
  DescriptionCell,
  EstimateCell,
  LinkCell,
  ProgressCell,
} from '../../../table';
import { WorkorderBase } from './types';

export const columns = (): ColDef<WorkorderBase>[] => {
  let estimateHoursMax = -1;
  let remainingHoursMax = -1;

  return [
    {
      field: 'WO',
      valueGetter: (pkg) => pkg.data?.workOrderNo,
      valueFormatter: (pkg) => {
        if (pkg.data?.workOrderId) {
          return proCoSysUrls.getWorkOrderUrl(pkg.data.workOrderId);
        } else {
          return '';
        }
      },
      cellRenderer: (props: ICellRendererProps<WorkorderBase>) => {
        if (props.valueFormatted) {
          return <LinkCell url={props.valueFormatted} urlText={props.value} />;
        } else {
          return null;
        }
      },
      width: 130,
    },
    {
      field: 'Title',
      valueGetter: (pkg) => pkg.data?.title,
      cellRenderer: (props: ICellRendererProps<WorkorderBase>) => {
        return <DescriptionCell description={props?.value} />;
      },
      width: 300,
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
      valueGetter: (pkg) => pkg.data?.plannedCompletionDate,
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
      valueGetter: (pkg) => pkg.data?.estimatedManHours,
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
      valueGetter: (pkg) => pkg.data?.remainingManHours,
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
