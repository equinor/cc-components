import { TabTable } from '../../../../../../table-helpers/src/lib/table/TabTable/TabTable';
import { StyledContentWrapper } from '@cc-components/sharedcomponents';
import { columns } from './columns';
import { NcrBase } from './types';
import { ReactElement } from 'react';

type NcrTabProps<T> = {
  ncrs: T[] | undefined;
  isFetching: boolean;
  error: Error | null;
};
/**
 * Preconfigured table for showing NCR data
 */
export const NcrTab = <T extends NcrBase>({
  error,
  isFetching,
  ncrs,
}: NcrTabProps<T>): ReactElement => {
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
