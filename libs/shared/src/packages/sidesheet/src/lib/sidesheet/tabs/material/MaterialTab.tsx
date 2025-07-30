import { TabTable } from '../../../../../../table-helpers/src/lib/table/TabTable';
import { StyledContentWrapper } from '@cc-components/sharedcomponents';
import { columns } from './columns';
import { MaterialBase } from './types';
import { ReactElement } from 'react';
type MaterialTabProps<T> = {
  material: T[] | undefined;
  isFetching: boolean;
  error: Error | null;
};
export const MaterialTab = <T extends MaterialBase>({
  error,
  isFetching,
  material,
}: MaterialTabProps<T>): ReactElement => {
  return (
    <StyledContentWrapper>
      <TabTable
        columns={columns}
        error={error}
        isFetching={isFetching}
        packages={material}
        resourceName="Material"
      />
    </StyledContentWrapper>
  );
};
