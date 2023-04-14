import { TabTable } from '../../../../../../table-helpers/src/lib/table/TabTable';
import { StyledContentWrapper } from '../tabs.styles';
import { columns } from './columns';
import { MaterialBase } from './types';
type MaterialTabProps<T> = {
  material: T[] | undefined;
  isFetching: boolean;
  error: Error | null;
};
export const MaterialTab = <T extends MaterialBase>({
  error,
  isFetching,
  material,
}: MaterialTabProps<T>): JSX.Element => {
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
