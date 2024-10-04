import { TabTable } from '../../../../../../table-helpers/src/lib/table/TabTable/TabTable';
import { StyledContentWrapper } from '@cc-components/sharedcomponents';
import { columns } from './columns';
import { NotificationBase } from './types';

type NotificationTabProps<T> = {
  notifications: T[] | undefined;
  isFetching: boolean;
  error: Error | null;
};
export const NotificationTab = <T extends NotificationBase>({
  error,
  isFetching,
  notifications,
}: NotificationTabProps<T>): JSX.Element => {
  return (
    <StyledContentWrapper>
      <TabTable
        columns={columns}
        error={error}
        isFetching={isFetching}
        packages={notifications}
        resourceName="Notification"
      />
    </StyledContentWrapper>
  );
};
