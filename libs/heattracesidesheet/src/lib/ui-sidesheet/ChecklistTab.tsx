import { StyledContentWrapper, TabTable } from '@cc-components/shared';
import { CheckList } from '@cc-components/heattraceshared';
import { checklistColumns } from './checklistColumns';

type ChecklistTabProps = {
  checklists: CheckList[] | undefined;
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
      {checklists ? <h4>Pipetest checklist:</h4> : ''}
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
