import { colorMap } from '@cc-components/shared/mapping';
import { PackageStatus, PopoverWrapper, getStatusCircle } from '@cc-components/shared';
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

  const anchorRef = useRef<HTMLAnchorElement | null>(null);

  const {
    data,
    onClick,
    columnExpanded,
    depth,
    width: itemWidth = 300,
    isSelected,
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

  const handleClick = (event: React.MouseEvent) => {
    if (!event.ctrlKey && !event.metaKey && event.button === 0) {
      event.preventDefault();
      onClick?.();
    }
  };

  return (
    <>
      <StyledRoot>
        <StyledItemWrapper
          href={data.heatTraceCableUrl || undefined}
          target="_blank"
          rel="noopener noreferrer"
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
          onClick={handleClick}
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
          width={itemWidth}
          parentRef={parentRef}
          popoverTitle={`${data.heatTraceCableDescription}`}
          close={() => setIsOpen(false)}
          anchorRef={anchorRef}
        />
      )}
    </>
  );
};

export const GardenItem = memo(HeattraceGardenItem);
