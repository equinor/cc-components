import { Loop } from '@cc-components/loopshared';
import {
  PopoverWrapper,
} from '@cc-components/shared/common';
import { getStatusCircle } from '@cc-components/shared';
import { statusColorMap } from '@cc-components/shared/mapping';
import { CustomItemView } from '@equinor/workspace-fusion/garden';
import { memo, useMemo, useRef, useState } from 'react';
import {
  StyledDescription,
  StyledItemText,
  StyledItemWrapper,
  StyledRoot,
} from './garden.styles';
import { PopoverContent } from './Popover';
import { itemContentColors } from '@cc-components/shared/mapping';

const createProgressBackground = (progress: number) => {
  const standardColor = '#ffffff';
  return `linear-gradient(90deg, #d9eaf2 ${progress}%, ${standardColor} ${progress}%)`;
};
const LoopGardenItem = (props: CustomItemView<Loop>) => {
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

  const linear = createProgressBackground((data.loopContentProgress ?? 0) * 100);

  const mcStatus = getStatusCircle(data.loopContentStatus, colorAssistMode);
  const comStatus = getStatusCircle(data.status, colorAssistMode);

  return (
    <>
      <StyledRoot>
        <StyledItemWrapper
          ref={anchorRef}
          onMouseOver={() => {
            hoverTimeout && !isOpen && clearTimeout(hoverTimeout);
            setHoverTimeout(setTimeout(() => setIsOpen(true), 700));
          }}
          onMouseOut={() => {
            hoverTimeout && clearTimeout(hoverTimeout);
            setIsOpen(false);
          }}
          backgroundColor={linear}
          textColor={itemContentColors.Light}
          onClick={onClick}
          style={{ width: `${columnExpanded ? 100 : width}%`, maxWidth }}
          isSelected={isSelected}
        >
          <StyledItemText>{displayName.replace('@LOOP-', '')}</StyledItemText>
          <div
            style={{ display: 'flex', gap: '4px', height: '14px', marginLeft: 'auto' }}
          >
            {mcStatus}
            {comStatus}
          </div>
        </StyledItemWrapper>

        {columnExpanded && (
          <StyledDescription title={data.description ?? ''}>
            {data.description}
          </StyledDescription>
        )}
      </StyledRoot>

      {isOpen && (
        <PopoverWrapper
          close={() => setIsOpen(false)}
          isOpen={isOpen}
          rowStart={rowStart}
          columnStart={columnStart}
          width={itemWidth}
          parentRef={parentRef}
          popoverTitle={`${data.loopNo}`}
        >
          <PopoverContent loop={data} />
        </PopoverWrapper>
      )}
    </>
  );
};

export const GardenItem = memo(LoopGardenItem);
