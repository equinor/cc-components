import { PopoverWrapper } from '@cc-components/shared/common';
import { statusColorMap } from '@cc-components/shared/mapping';
import { CustomItemView } from '@equinor/workspace-fusion/garden';
import { memo, useMemo, useRef, useState } from 'react';
import { McPackage } from '../../../../mechanicalcompletionshared';
import { getItemContentsColor } from '../utils-garden/getItemContentsColor';
import { getTagSize } from '../utils-garden/getTagSize';
import { commStatusColors } from '../utils-statuses/commStatusColors';
import { PopoverContent } from './Popover/PopoverContent';
import {
  StyledItemText,
  StyledItemWrapper,
  StyledRoot,
  StyledSizes,
  StyledStatusCircles,
} from './garden.styles';

const McGardenItem = (props: CustomItemView<McPackage>) => {
  const {
    data,
    onClick,
    columnExpanded,
    depth,
    width: itemWidth = 100,
    isSelected,
    rowStart,
    columnStart,
    parentRef,
  } = props;

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const hoverTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const size = getTagSize(data, 10);
  const status = data.commissioningStatus;
  const backgroundColor = commStatusColors[status];
  const contentsColor = getItemContentsColor(status);
  const mcDotColor = statusColorMap[data.mechanicalCompletionStatus];
  const commDotColor = statusColorMap[data.commpkgStatus];
  const width = useMemo(() => (depth ? 100 - depth * 3 : 100), [depth]);
  const maxWidth = useMemo(() => itemWidth * 0.98, [itemWidth]);

  const options = {
    size,
    backgroundColor,
    contentsColor,
    mcDotColor,
    commDotColor,
    status,
  };

  const handleMouseEnter = () => {
    // Clear any existing timeouts
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    // Set the new timeout
    hoverTimeoutRef.current = setTimeout(() => {
      if (!isOpen) setIsOpen(true);
    }, 500);
  };

  const handleMouseLeave = () => {
    // Clear the timeout
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null; // Reset the timeout ref to null
    }
    // Close the popover immediately
    setIsOpen(false);
  };

  return (
    <>
      <StyledRoot>
        <StyledItemWrapper
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onClick={onClick}
          backgroundColor={backgroundColor}
          textColor={contentsColor}
          isSelected={isSelected}
          style={{ width: `${columnExpanded ? 100 : width}%`, maxWidth }}
        >
          <StyledSizes color={contentsColor} size={size} />
          <StyledItemText> {data.mechanicalCompletionPackageNo}</StyledItemText>

          <StyledStatusCircles mcColor={mcDotColor} commColor={commDotColor} />
        </StyledItemWrapper>
        {columnExpanded && (
          <StyledItemText title={data.description ?? ''}>
            {data.description}
          </StyledItemText>
        )}
      </StyledRoot>
      {isOpen && (
        <PopoverWrapper
          close={() => setIsOpen(false)}
          isOpen={isOpen}
          width={itemWidth}
          parentRef={parentRef}
          rowStart={rowStart}
          columnStart={columnStart}
          popoverTitle={`Mc.pkg: ${data.mechanicalCompletionPackageNo}`}
        >
          <PopoverContent data={data} options={options} />
        </PopoverWrapper>
      )}
    </>
  );
};

export const GardenItem = memo(McGardenItem);
