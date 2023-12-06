import { pipetestStatusColormap } from '@cc-components/shared/mapping';
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
  } = props;

  const width = useMemo(() => (depth ? 100 - depth * 3 : 100), [depth]);
  const maxWidth = useMemo(() => itemWidth * 0.98, [itemWidth]);

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
          backgroundColor={'green'}
          onClick={onClick}
          style={{ width: `${columnExpanded ? 100 : width}%`, maxWidth }}
          isSelected={isSelected}
        >
          <StyledItemText>{displayName.replace('@PIPETEST-', '')}</StyledItemText>
          <StyledStatusCircles
            mcColor={
              data.shortformCompletionStatus
                ? pipetestStatusColormap[data.shortformCompletionStatus]
                : null
            }
            commColor={
              data.shortformCompletionStatus
                ? pipetestStatusColormap[data.shortformCompletionStatus]
                : null
            }
          />
        </StyledItemWrapper>

        {columnExpanded && (
          <StyledDescription title={data.description ?? ''}>
            {data.description}
          </StyledDescription>
        )}
      </StyledRoot>

      {/* {isOpen && (
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
      )} */}
    </>
  );
};

export const GardenItem = memo(PipetestGardenItem);