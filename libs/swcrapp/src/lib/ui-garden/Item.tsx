import { tokens } from '@equinor/eds-tokens';
import { CustomItemView } from '@equinor/workspace-fusion/garden';
import { memo, useMemo } from 'react';
import { ExtendedGardenFields, SwcrPackage } from '../types';
import { getSwcrStatusColor } from '../utils-statuses';
import { StyledItemWrapper, StyledRoot } from './garden.styles';

export const SwcrItem = (props: CustomItemView<SwcrPackage, ExtendedGardenFields>) => {
  const {
    columnExpanded,
    data,
    isSelected,
    onClick,
    depth,
    width: itemWidth = 300,
  } = props;

  const statusColor = getSwcrStatusColor(data.status);
  const textColor = ['Closed - Rejected', 'Closed'].includes(data.status)
    ? tokens.colors.text.static_icons__primary_white.rgba
    : tokens.colors.text.static_icons__default.rgba;
  const width = useMemo(() => (depth ? 100 - depth * 3 : 100), [depth]);
  const maxWidth = useMemo(() => itemWidth * 0.95, [itemWidth]);

  return (
    <StyledRoot>
      <StyledItemWrapper
        style={{ width: `${columnExpanded ? 100 : width}%`, maxWidth }}
        backgroundColor={statusColor}
        textColor={textColor}
        onClick={onClick}
        isSelected={isSelected}
      >
        {data['swcrNo']}
      </StyledItemWrapper>
      {columnExpanded && (
        <>
          {data.title}{' '}
          {parseInt(data.estimatedManhours) > 0 ? `(${data.estimatedManhours}h)` : ''}
        </>
      )}
    </StyledRoot>
  );
};

export const GardenItem = memo(SwcrItem);
