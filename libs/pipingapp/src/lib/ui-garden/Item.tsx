import { colorMap } from '@cc-components/shared/mapping';
import { CustomItemView } from '@equinor/workspace-fusion/garden';
import { memo, useMemo, useRef, useState } from 'react';
import {
  StyledDescription,
  StyledItemText,
  StyledItemWrapper,
  StyledRoot,
  StyledStatusCircles,
} from './garden.styles';
import { Pipetest } from 'libs/pipingshared/dist/src';
import {
  PackageStatus,
  PopoverWrapper,
  GrayStatusIcon,
  GreenStatusIcon,
  OrangeStatusIcon,
  RedStatusIcon,
} from '@cc-components/shared';
import { getPipetestStatusColors } from '../utils-garden/getPipetestStatusColors';
import { itemContentColors } from '@cc-components/shared/mapping';

const PipetestGardenItem = (props: CustomItemView<Pipetest>) => {
  const [isOpen, setIsOpen] = useState(false);
  const [hoverTimeout, setHoverTimeout] = useState<ReturnType<typeof setTimeout> | null>(
    null
  );

  const anchorRef = useRef<HTMLDivElement | null>(null);
  const {
    data,
    onClick,
    columnExpanded,
    depth,
    width: itemWidth = 300,
    isSelected,
    rowStart,
    columnStart,
    parentRef,
    displayName,
    colorAssistMode,
  } = props;

  const width = useMemo(() => (depth ? 100 - depth * 3 : 100), [depth]);
  const maxWidth = useMemo(() => itemWidth * 0.98, [itemWidth]);

  const colors = getPipetestStatusColors(data);

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

  const mcStatus = getStatusCircle(data.mechanicalCompletionStatus, colorAssistMode);
  const comStatus = getStatusCircle(data.commissioningStatus, colorAssistMode);

  return (
    <>
      <StyledRoot>
        <StyledItemWrapper
          ref={anchorRef}
          onMouseEnter={() => {
            hoverTimeout && !isOpen && clearTimeout(hoverTimeout);
            setHoverTimeout(setTimeout(() => setIsOpen(true), 700));
          }}
          onMouseLeave={() => {
            hoverTimeout && clearTimeout(hoverTimeout);
            setIsOpen(false);
          }}
          backgroundColor={colors.backgroundColor}
          onClick={onClick}
          style={{ width: `${columnExpanded ? 100 : width}%`, maxWidth }}
          isSelected={isSelected}
          textColor={itemContentColors.Light}
        >
          <StyledItemText>{displayName}</StyledItemText>
          <div
            style={{ display: 'flex', gap: '4px', height: '14px', marginLeft: 'auto' }}
          >
            {mcStatus}
            {comStatus}
          </div>
        </StyledItemWrapper>

        {columnExpanded && (
          <StyledDescription title={data.id ?? ''}>{data.description}</StyledDescription>
        )}
      </StyledRoot>

      {isOpen && (
        <PopoverWrapper
          isOpen={isOpen}
          rowStart={rowStart}
          columnStart={columnStart}
          width={itemWidth}
          parentRef={parentRef}
          popoverTitle={data.description}
          close={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export const GardenItem = memo(PipetestGardenItem);
