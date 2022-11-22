import { PopoverWrapper, statusColorMap } from '@cc-components/shared';
import { CustomItemView } from '@equinor/workspace-fusion/garden';
import { memo, useMemo, useRef, useState } from 'react';
import { CustomGroupByKeys, ExtendedGardenFields, Loop } from '../types';
import {
  StyledItemText,
  StyledItemWrapper,
  StyledRoot,
  StyledStatusCircles,
} from './garden.styles';
import { PopoverContent } from './Popover';
const createProgressBackground = (progress: number) => {
  const standardColor = '#ffffff';
  return `linear-gradient(90deg, #d9eaf2 ${progress}%, ${standardColor} ${progress}%)`;
};
const LoopGardenItem = (
  props: CustomItemView<Loop, ExtendedGardenFields, CustomGroupByKeys>
) => {
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
    controller: { getDisplayName },
  } = props;

  const width = useMemo(() => (depth ? 100 - depth * 3 : 100), [depth]);
  const maxWidth = useMemo(() => itemWidth * 0.98, [itemWidth]);

  const linear = createProgressBackground((data.loopContentProgress ?? 0) * 100);

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
          backgroundColor={linear}
          onClick={onClick}
          style={{ width: `${columnExpanded ? 100 : width}%`, maxWidth }}
          isSelected={isSelected}
        >
          <StyledItemText>{getDisplayName(data).replace('@LOOP-', '')}</StyledItemText>
          <StyledStatusCircles
            mcColor={
              data.loopContentStatus ? statusColorMap[data.loopContentStatus] : null
            }
            commColor={data.status ? statusColorMap[data.status] : null}
          />
        </StyledItemWrapper>

        {columnExpanded && data.description}
      </StyledRoot>

      {isOpen && (
        <PopoverWrapper
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
