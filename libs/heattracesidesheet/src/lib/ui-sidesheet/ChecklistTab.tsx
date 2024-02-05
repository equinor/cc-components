import { TabTable } from '@cc-components/shared';
import { checklistColumns } from './checklistColumns';
import { HeatTraceChecklist } from 'libs/heattraceshared/dist/src';

type ChecklistTabProps = {
  checklists: HeatTraceChecklist[] | undefined;
  isFetching: boolean;
  error: Error | null;
};
export const ChecklistTab = ({
  checklists,
  error,
  isFetching,
}: ChecklistTabProps): JSX.Element => {
  return (
    <TabTable
      columns={checklistColumns}
      error={error}
      isFetching={isFetching}
      packages={checklists}
      resourceName="Checklists"
    />
  );
};
