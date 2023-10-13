import { colorMap, pipetestStatusColormap } from '@cc-components/shared/mapping';
import { PackageStatus, PopoverWrapper } from '@cc-components/shared';
import { CustomItemView } from '@equinor/workspace-fusion/garden';
import { memo, useMemo, useRef, useState } from 'react';
import {
  StyledDescription,
  StyledItemText,
  StyledItemWrapper,
  StyledRoot,
  StyledStatusCircles,
} from './garden.styles';
import { HeatTrace } from '@cc-components/heattraceshared';
import { getHeatTraceStatuses } from '../utils-garden/getHeatTraceStatuses';

const HeattraceGardenItem = (props: CustomItemView<HeatTrace>) => {
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

  const {
    backgroundColor,
    textColor,
    //TODO: group by keys
  } = useMemo(() => getHeatTraceStatuses(data), [data]);
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
          backgroundColor={backgroundColor}
          color={textColor}
          onClick={onClick}
          style={{ width: `${columnExpanded ? 100 : width}%`, maxWidth }}
          isSelected={isSelected}
        >
          <StyledItemText>{displayName}</StyledItemText>
          <StyledStatusCircles
            mcColor={
              data.mechanicalCompletionStatus
                ? colorMap[data.mechanicalCompletionStatus as PackageStatus]
                : null
            }
            commColor={
              data.commissioningStatus
                ? colorMap[data.commissioningStatus as PackageStatus]
                : null
            }
          />
        </StyledItemWrapper>

        {columnExpanded && (
          <StyledDescription title={data.heatTraceCableDescription ?? ''}>
            {data.heatTraceCableDescription}
          </StyledDescription>
        )}
      </StyledRoot>

      {isOpen && (
        <PopoverWrapper
          isOpen={isOpen}
          rowStart={rowStart}
          columnStart={columnStart}
          width={itemWidth}
          parentRef={parentRef}
          popoverTitle={`${data.heatTraceCableDescription}`}
          close={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export const GardenItem = memo(HeattraceGardenItem);
