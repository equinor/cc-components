import { TabTable } from '../../../table';
import { StyledContentWrapper } from '../tabs.styles';
import { columns } from './columns';
import { McBase } from './types';

type McTabProps<T> = {
  mc: T[] | undefined;
  isFetching: boolean;
  error: Error | null;
};
export const McTab = <T extends McBase>({ error, isFetching, mc }: McTabProps<T>) => {
  return (
    <StyledContentWrapper>
      <TabTable
        columns={columns}
        error={error}
        isFetching={isFetching}
        packages={mc}
        resourceName="MC"
      />
    </StyledContentWrapper>
  );
};
