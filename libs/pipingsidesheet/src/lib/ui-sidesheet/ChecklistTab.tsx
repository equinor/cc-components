import { TabTable } from '@cc-components/shared';
import { StyledContentWrapper } from '@cc-components/sharedcomponents';
import { Checklist } from '@cc-components/pipingshared';
import { checklistColumns } from './checklistColumns';
import { ReactElement } from 'react';

type ChecklistTabProps = {
  checklists: Checklist[] | undefined;
  isFetching: boolean;
  error: Error | null;
};

export const ChecklistTab = ({
  checklists,
  error,
  isFetching,
}: ChecklistTabProps): ReactElement => {
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
