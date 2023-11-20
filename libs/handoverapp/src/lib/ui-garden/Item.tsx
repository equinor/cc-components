import { HandoverPackage } from '@cc-components/handovershared';
import { FlagIcon, PopoverWrapper, WarningIcon } from '@cc-components/shared/common';
import { CustomItemView } from '@equinor/workspace-fusion/garden';
import { memo, useMemo, useRef, useState } from 'react';
import { getDotsColor, getItemSize, getTextColor } from '../utils-garden';

import { createProgressGradient } from '../utils-statuses/mcProgress';
import {
  StyledItemText,
  StyledItemWrapper,
  StyledRoot,
  StyledSizes,
  StyledStatusCircles,
  StyledWarningIconWrapper,
} from './garden.styles';
import { PopoverContent } from './PopoverContent';
import { ItemOptions } from './types';

const HandoverItem = (props: CustomItemView<HandoverPackage>) => {
  const [isOpen, setIsOpen] = useState(false);
  const hoverTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const anchorRef = useRef<HTMLDivElement | null>(null);

  const {
    data,
    onClick,
    columnExpanded,
    width: itemWidth = 300,
    depth,
    isSelected,
    rowStart,
    columnStart,
    parentRef,
  } = props;

  const size = getItemSize(data.volume, 100 || 0);

  const backgroundColor = useMemo(
    () => createProgressGradient(data),
    [data, data.commissioningPackageStatus]
  );
  const textColor = getTextColor(data.commissioningPackageStatus);

  const mcPackageColor = getDotsColor(data.mechanicalCompletionStatus);
  const commStatusColor = getDotsColor(data.status);

  const showWarningIcon =
    data.mechanicalCompletionStatus === 'OS' &&
    data.commissioningPackageStatus === 'RFC Accepted';

  const width = useMemo(() => (depth ? 100 - depth * 3 : 100), [depth]);
  const fittedWidth = useMemo(() => itemWidth * 0.98, [itemWidth]);

  const options: ItemOptions = {
    size,
    status: data.commissioningPackageStatus,
    barColor: backgroundColor,
    textColor,
    mcPackageColor,
    commStatusColor,
    showWarningIcon,
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
          ref={anchorRef}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          backgroundColor={backgroundColor}
          textColor={textColor}
          onClick={onClick}
          style={{
            minWidth: fittedWidth,
          }}
          isSelected={isSelected}
        >
          <StyledSizes size={size} color={textColor} />
          {data.hasUnsignedActions && <FlagIcon color={textColor} />}
          <StyledItemText>{data.commissioningPackageNo}</StyledItemText>
          {showWarningIcon && (
            <StyledWarningIconWrapper>
              <WarningIcon />
            </StyledWarningIconWrapper>
          )}
          <StyledStatusCircles mcColor={mcPackageColor} commColor={commStatusColor} />
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
          rowStart={rowStart}
          columnStart={columnStart}
          width={itemWidth}
          parentRef={parentRef}
          popoverTitle={`Comm.pkg ${data.commissioningPackageNo}`}
        >
          <PopoverContent data={data} itemOptions={options} />
        </PopoverWrapper>
      )}
    </>
  );
};

export const GardenItem = memo(HandoverItem);
