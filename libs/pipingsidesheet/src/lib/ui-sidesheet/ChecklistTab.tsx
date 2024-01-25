import { TabTable } from '@cc-components/shared';
import { StyledContentWrapper } from '@cc-components/sharedcomponents';
import { Checklist } from '@cc-components/pipingshared';
import { checklistColumns } from './checklistColumns';

type ChecklistTabProps = {
  checklists: Checklist[] | undefined;
  isFetching: boolean;
  error: Error | null;
};
export const ChecklistTab = ({
  checklists,
  error,
  isFetching,
}: ChecklistTabProps): JSX.Element => {
  return (
    <StyledContentWrapper>
      <TabTable
        columns={checklistColumns}
        error={error}
        isFetching={isFetching}
        packages={checklists}
        resourceName="Checklist"
      />
    </StyledContentWrapper>
  );
};
