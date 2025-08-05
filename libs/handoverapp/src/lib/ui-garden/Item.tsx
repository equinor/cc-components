import { HandoverPackage } from '@cc-components/handovershared';
import {
  FlagIcon,
  PopoverWrapper,
  WarningIcon,
} from '@cc-components/shared/common';
import { getStatusCircle } from '@cc-components/shared';
import { CustomItemView } from '@equinor/workspace-fusion/garden';
import { memo, useMemo, useRef, useState } from 'react';
import { getDotsColor, getItemSize, getTextColor } from '../utils-garden';

import { createProgressGradient } from '../utils-statuses/mcProgress';
import {
  StyledItemText,
  StyledItemWrapper,
  StyledRoot,
  StyledSizes,
  StyledWarningIconWrapper,
} from './garden.styles';
import { PopoverContent } from './PopoverContent';
import { ItemOptions } from './types';
import { colorMap } from '@cc-components/shared/mapping';

const HandoverItem = (args: CustomItemView<HandoverPackage>) => {
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
    colorAssistMode,
  } = args;

  const size = getItemSize(data.volume, 100);

  const backgroundColor = useMemo(() => {
    if (
      [
        'RFRC Accepted',
        'RFRC Sent',
        'DCC Accepted',
        'DCC Sendt',
        'TAC Sent',
        'TAC Accepted',
        'TAC Rejected',
      ].includes(data.commissioningPackageStatus)
    ) {
      return colorMap[data.commissioningPackageStatus];
    }
    return createProgressGradient(data);
  }, [data, data.commissioningPackageStatus]);
  const textColor = getTextColor(data.commissioningPackageStatus);

  const mcPackageColor = getDotsColor(data.mechanicalCompletionStatus);
  const commStatusColor = getDotsColor(data.status);



  const mcStatusCircle = getStatusCircle(
    data.mechanicalCompletionStatus,
    colorAssistMode
  );
  const commStatusCircle = getStatusCircle(
    data.commissioningPackageStatus,
    colorAssistMode
  );

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
          <div
            style={{ display: 'flex', gap: '4px', height: '14px', marginLeft: 'auto' }}
          >
            {mcStatusCircle}
            {commStatusCircle}
          </div>
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
