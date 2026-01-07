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
import { PackageStatus, PopoverWrapper, getStatusCircle } from '@cc-components/shared';
import { getPipetestStatusColors } from '../utils-garden/getPipetestStatusColors';
import { itemContentColors } from '@cc-components/shared/mapping';

const PipetestGardenItem = (props: CustomItemView<Pipetest>) => {
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
    rowStart,
    columnStart,
    parentRef,
    displayName,
    colorAssistMode,
  } = props;

  const width = useMemo(() => (depth ? 100 - depth * 3 : 100), [depth]);
  const maxWidth = useMemo(() => itemWidth * 0.98, [itemWidth]);

  const colors = getPipetestStatusColors(data);

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
          href={data.checklistUrl || undefined}
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
          backgroundColor={colors.backgroundColor}
          onClick={handleClick}
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
          width={itemWidth}
          parentRef={parentRef}
          popoverTitle={data.description}
          close={() => setIsOpen(false)}
          anchorRef={anchorRef}
        />
      )}
    </>
  );
};

export const GardenItem = memo(PipetestGardenItem);
