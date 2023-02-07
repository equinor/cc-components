import { Tooltip, Icon } from '@equinor/eds-core-react';
import { check, clear } from '@equinor/eds-icons';
Icon.add({ check, clear });
type AvailableItemCellProps = {
  available: string | null;
};
export const AvailableItemCell = ({
  available,
}: AvailableItemCellProps): JSX.Element | null => {
  if (available === null) {
    return null;
  }
  const refTitle = available === 'Y' ? 'Available' : 'Not Available';

  return (
    <Tooltip title={refTitle}>
      {available === 'Y' ? (
        <Icon color="green" name="check" />
      ) : (
        <Icon color="red" name="clear" />
      )}
    </Tooltip>
  );
};
