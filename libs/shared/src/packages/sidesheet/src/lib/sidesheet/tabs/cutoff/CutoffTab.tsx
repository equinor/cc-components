import { StyledContentWrapper } from '@cc-components/sharedcomponents';
import { TabTable } from '../../../../../../table-helpers/src/lib/table/TabTable';
import { columns } from './columns';
import { CutoffBase } from './types';

type CutoffTabProps<T> = {
  cutoff: T[] | undefined;
  isFetching: boolean;
  error: Error | null;
};
export const CutoffTab = <T extends CutoffBase>({
  error,
  isFetching,
  cutoff: Cutoff,
}: CutoffTabProps<T>): JSX.Element => {
  return (
    <StyledContentWrapper>
      <TabTable
        columns={columns}
        error={error}
        isFetching={isFetching}
        packages={Cutoff}
        resourceName="Cutoff"
      />
    </StyledContentWrapper>
  );
};
