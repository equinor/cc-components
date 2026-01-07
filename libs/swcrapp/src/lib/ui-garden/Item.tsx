import { getSwcrStatusColor, SwcrPackage } from '@cc-components/swcrshared';
import { tokens } from '@equinor/eds-tokens';
import { CustomItemView } from '@equinor/workspace-fusion/garden';
import { memo, useMemo } from 'react';
import { StyledItemWrapper, StyledRoot } from './garden.styles';
import { itemContentColors } from '@cc-components/shared/mapping';

export const SwcrItem = (props: CustomItemView<SwcrPackage>) => {
  const {
    columnExpanded,
    data,
    isSelected,
    onClick,
    depth,
    width: itemWidth = 300,
    displayName,
  } = props;
  console.log('Url:', props.data.swcrUrl);

  const statusColor = getSwcrStatusColor(data.status);
  const textColor = ['Closed - Rejected', 'Closed'].includes(data.status)
    ? itemContentColors.Dark
    : itemContentColors.Light;
  const width = useMemo(() => (depth ? 100 - depth * 3 : 100), [depth]);
  const maxWidth = useMemo(() => itemWidth * 0.95, [itemWidth]);

  const handleClick = (event: React.MouseEvent) => {
    if ((event.ctrlKey || event.metaKey) && data.swcrUrl) {
      window.open(data.swcrUrl, '_blank');
    } else {
      onClick?.();
    }
  };

  return (
    <StyledRoot>
      <StyledItemWrapper
        style={{ width: `${columnExpanded ? 100 : width}%`, maxWidth }}
        $backgroundColor={statusColor}
        $textColor={textColor}
        onClick={handleClick}
        $isSelected={isSelected}
      >
        {displayName}
      </StyledItemWrapper>
      {columnExpanded && (
        <>
          {data.title} {data.estimatedManHours > 0 ? `(${data.estimatedManHours}h)` : ''}
        </>
      )}
    </StyledRoot>
  );
};
export default memo(SwcrItem);
