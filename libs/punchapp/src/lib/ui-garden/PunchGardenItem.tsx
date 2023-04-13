import { memo, useMemo } from 'react';
import {
  StyledItemText,
  StyledPunchItem,
  StyledRoot,
  StyledStatusCircles,
} from './punchGardenItem.styles';
import { CustomItemView } from '@equinor/workspace-fusion/garden';
import { getDotsColor } from '../utils-garden/getDotsColor';
import {
  punchStatusColors,
  punchStatusTextColors,
} from '../utils-statuses/punchStatusColors';
import { Punch } from '@cc-components/punchshared';
import { FlagIcon } from '@cc-components/shared/common';

function PunchGardenItem(props: CustomItemView<Punch>): JSX.Element {
  const {
    data,
    depth,
    columnExpanded,
    onClick,
    isSelected,
    displayName,
    width: itemWidth = 300,
  } = props;
  const statusColor = punchStatusColors[data.status];
  const textColor = punchStatusTextColors[data.status];
  const width = useMemo(() => (depth ? 100 - depth * 3 : 100), [depth]);
  const maxWidth = useMemo(() => itemWidth * 0.95, [itemWidth]);
  const punchTypeColor = getDotsColor(data.category);
  return (
    <StyledRoot>
      <StyledPunchItem
        style={{ width: `${columnExpanded ? 100 : width}%`, maxWidth }}
        backgroundColor={statusColor}
        textColor={textColor}
        onClick={onClick}
        isSelected={isSelected}
      >
        {data.materialRequired && <FlagIcon color={textColor} />}
        <StyledItemText>{displayName}</StyledItemText>
        <StyledStatusCircles typeColor={punchTypeColor} />
      </StyledPunchItem>
      {columnExpanded && <>{data.description}</>}
    </StyledRoot>
  );
}
export default memo(PunchGardenItem);
