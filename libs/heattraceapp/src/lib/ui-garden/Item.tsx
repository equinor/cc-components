import { colorMap } from '@cc-components/shared/mapping';
import {
  PackageStatus,
  PopoverWrapper,
  getStatusCircle,
} from '@cc-components/shared';
import { CustomItemView } from '@equinor/workspace-fusion/garden';
import { memo, useMemo, useRef, useState } from 'react';
import {
  StyledDescription,
  StyledItemText,
  StyledItemWrapper,
  StyledRoot,
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
    colorAssistMode,
  } = props;

  const {
    backgroundColor,
    textColor,
    //TODO: group by keys
  } = useMemo(() => getHeatTraceStatuses(data), [data]);
  const width = useMemo(() => (depth ? 100 - depth * 3 : 100), [depth]);
  const maxWidth = useMemo(() => itemWidth * 0.98, [itemWidth]);



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
          $backgroundColor={backgroundColor}
          color={textColor}
          onClick={onClick}
          style={{ width: `${columnExpanded ? 100 : width}%`, maxWidth }}
          $isSelected={isSelected}
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
