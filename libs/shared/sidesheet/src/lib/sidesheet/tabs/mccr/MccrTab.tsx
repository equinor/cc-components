import { TabTable } from '@cc-components/shared/table-helpers';
import { StyledContentWrapper } from '../tabs.styles';
import { columns } from './columns';
import { MccrBase } from './types';

type MccrTabProps<T> = {
  mccr: T[] | undefined;
  isFetching: boolean;
  error: Error | null;
};
export const MccrTab = <T extends MccrBase>({
  error,
  isFetching,
  mccr,
}: MccrTabProps<T>): JSX.Element => {
  return (
    <StyledContentWrapper>
      <TabTable
        columns={columns}
        error={error}
        isFetching={isFetching}
        packages={mccr}
        resourceName="MCCR"
      />
    </StyledContentWrapper>
  );
};
