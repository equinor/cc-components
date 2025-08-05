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
import {
  GrayStatusIcon,
  GreenStatusIcon,
  OrangeStatusIcon,
  RedStatusIcon,
} from '@cc-components/shared';

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

  const getStatusCircle = (status: string | null, showVisualIndicator: boolean) => {
    switch (status) {
      case 'PB':
      case 'M05':
      case 'M06':
      case 'M07':
      case 'M09':
        return <OrangeStatusIcon visualIndicator={showVisualIndicator} />;
      case 'PA':
      case 'M02':
      case 'M03':
      case 'M04':
        return <RedStatusIcon visualIndicator={showVisualIndicator} />;
      case 'OK':
      case 'M10':
      case 'M11':
      case 'MN':
        return <GreenStatusIcon visualIndicator={showVisualIndicator} />;
      default:
        return <GrayStatusIcon visualIndicator={showVisualIndicator} />;
    }
  };

  const status = getStatusCircle(data.category, colorAssistMode);
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
