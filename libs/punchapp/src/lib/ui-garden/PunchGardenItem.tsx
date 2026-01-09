import { memo, ReactElement, useMemo } from 'react';
import {
  StyledDescription,
  StyledItemText,
  StyledPunchItem,
  StyledRoot,
} from './punchGardenItem.styles';
import { CustomItemView } from '@equinor/workspace-fusion/garden';
import { getDotsColor } from '../utils-garden/getDotsColor';
import {
  punchStatusColors,
  punchStatusTextColors,
} from '../utils-statuses/punchStatusColors';
import { Punch } from '@cc-components/punchshared';
import { FlagIcon } from '@cc-components/shared/common';
import { getStatusCircle } from '@cc-components/shared';

function PunchGardenItem(props: CustomItemView<Punch>): ReactElement {
  const {
    data,
    depth,
    columnExpanded,
    onClick,
    isSelected,
    displayName,
    width: itemWidth = 300,
    colorAssistMode,
  } = props;
  const statusColor = punchStatusColors[data.status];
  const textColor = punchStatusTextColors[data.status];
  const width = useMemo(() => (depth ? 100 - depth * 3 : 100), [depth]);
  const maxWidth = useMemo(() => itemWidth * 0.95, [itemWidth]);

  const status = getStatusCircle(data.category, colorAssistMode);

  const handleClick = (event: React.MouseEvent) => {
    if (!event.ctrlKey && !event.metaKey && event.button === 0) {
      event.preventDefault();
      onClick?.();
    }
  };

  return (
    <StyledRoot>
      <StyledPunchItem
        href={data.punchUrl || undefined}
        target="_blank"
        rel="noopener noreferrer"
        style={{ width: `${columnExpanded ? 100 : width}%`, maxWidth }}
        backgroundColor={statusColor}
        textColor={textColor}
        onClick={handleClick}
        isSelected={isSelected}
      >
        {data.materialRequired && <FlagIcon color={textColor} />}
        <StyledItemText>{displayName}</StyledItemText>
        <div style={{ display: 'flex', gap: '4px', height: '14px', marginLeft: 'auto' }}>
          {status}
        </div>
      </StyledPunchItem>
      {columnExpanded && (
        <StyledDescription title={data.description ?? ''}>
          {data.description}
        </StyledDescription>
      )}
    </StyledRoot>
  );
}
export default memo(PunchGardenItem);
