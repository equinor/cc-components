import { TabTable } from '../../../table';
import { StyledContentWrapper } from '../tabs.styles';
import { columns } from './columns';
import { NcrBase } from './types';
type NcrTabProps<T> = {
  ncrs: T[] | undefined;
  isFetching: boolean;
  error: Error | null;
};
export const NcrTab = <T extends NcrBase>({
  error,
  isFetching,
  ncrs,
}: NcrTabProps<T>): JSX.Element => {
  return (
    <StyledContentWrapper>
      <TabTable
        columns={columns}
        error={error}
        isFetching={isFetching}
        packages={ncrs}
        resourceName="NCR"
      />
    </StyledContentWrapper>
  );
};
