import { getSwcrStatusColor, SwcrPackage } from '@cc-components/swcrshared';
import { PopoverWrapper } from '@cc-components/shared/common';
import { CustomItemView } from '@equinor/workspace-fusion/garden';
import { memo, useMemo, useRef, useState } from 'react';
import { StyledItemWrapper, StyledRoot } from './garden.styles';
import { itemContentColors } from '@cc-components/shared/mapping';
import { PopoverContent } from './Popover';

export const SwcrItem = (props: CustomItemView<SwcrPackage>) => {
  const [isOpen, setIsOpen] = useState(false);
  const [hoverTimeout, setHoverTimeout] = useState<ReturnType<typeof setTimeout> | null>(
    null
  );
  const anchorRef = useRef<HTMLAnchorElement | null>(null);

  const {
    columnExpanded,
    data,
    isSelected,
    onClick,
    depth,
    width: itemWidth = 300,
    displayName,
    parentRef,
  } = props;

  const statusColor = getSwcrStatusColor(data.status);
  const textColor = ['Closed - Rejected', 'Closed'].includes(data.status)
    ? itemContentColors.Dark
    : itemContentColors.Light;
  const width = useMemo(() => (depth ? 100 - depth * 3 : 100), [depth]);
  const maxWidth = useMemo(() => itemWidth * 0.95, [itemWidth]);

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
          href={data.swcrUrl || undefined}
          target="_blank"
          rel="noopener noreferrer"
          ref={anchorRef}
          onMouseOver={() => {
            hoverTimeout && !isOpen && clearTimeout(hoverTimeout);
            setHoverTimeout(setTimeout(() => setIsOpen(true), 700));
          }}
          onMouseOut={() => {
            hoverTimeout && clearTimeout(hoverTimeout);
            setIsOpen(false);
          }}
          style={{ width: `${columnExpanded ? 100 : width}%`, maxWidth }}
          $backgroundColor={statusColor}
          $textColor={textColor}
          onClick={handleClick}
          $isSelected={isSelected}
        >
          {displayName}
        </StyledItemWrapper>
        {columnExpanded && (
          <>
            {data.title}{' '}
            {data.estimatedManHours > 0 ? `(${data.estimatedManHours}h)` : ''}
          </>
        )}
      </StyledRoot>

      {isOpen && (
        <PopoverWrapper
          close={() => setIsOpen(false)}
          isOpen={isOpen}
          width={itemWidth}
          parentRef={parentRef}
          popoverTitle={`${data.softwareChangeRecordNo}`}
          anchorRef={anchorRef}
        >
          <PopoverContent swcr={data} />
        </PopoverWrapper>
      )}
    </>
  );
};
export default memo(SwcrItem);
