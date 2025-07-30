import { TabTable } from '../../../../../../table-helpers/src/lib/table/TabTable/TabTable';
import { StyledContentWrapper } from '@cc-components/sharedcomponents';
import { columns } from './columns';
import { MccrBase } from './types';
import { ReactElement } from 'react';

type MccrTabProps<T> = {
  mccr: T[] | undefined;
  isFetching: boolean;
  error: Error | null;
};
export const MccrTab = <T extends MccrBase>({
  error,
  isFetching,
  mccr,
}: MccrTabProps<T>): ReactElement => {
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
