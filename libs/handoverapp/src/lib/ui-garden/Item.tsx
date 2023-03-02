import { HandoverPackage } from '@cc-components/handovershared';
import { FlagIcon, PopoverWrapper, WarningIcon } from '@cc-components/shared/common';
import { CustomItemView } from '@equinor/workspace-fusion/garden';
import { memo, useMemo, useRef, useState } from 'react';
import { ExtendedGardenFields, HandoverCustomGroupByKeys } from '../types';
import { getDotsColor, getItemSize, getTextColor } from '../utils-garden';
import { getStatus } from '../utils-statuses';
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

const HandoverItem = (
  props: CustomItemView<
    HandoverPackage,
    ExtendedGardenFields,
    HandoverCustomGroupByKeys,
    Record<'maxVolume', number>
  >
) => {
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
    controller,
  } = props;
  const [hoverTimeout, setHoverTimeout] = useState<ReturnType<typeof setTimeout> | null>(
    null
  );
  const anchorRef = useRef<HTMLDivElement | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const { useContext, getDisplayName } = controller;
  const context = useContext();
  const size = getItemSize(data.volume, context?.maxVolume || 0);

  const status = getStatus(data);
  const backgroundColor = useMemo(
    () => createProgressGradient(data, status),
    [data, status]
  );
  const textColor = getTextColor(status);

  const mcPackageColor = getDotsColor(data.mcStatus);
  const commStatusColor = getDotsColor(data.commpkgStatus);

  const showWarningIcon = data.mcStatus === 'OS' && status === 'RFCC Accepted';

  const width = useMemo(() => (depth ? 100 - depth * 3 : 100), [depth]);
  const maxWidth = useMemo(() => itemWidth * 0.98, [itemWidth]);

  const options: ItemOptions = {
    size,
    status,
    barColor: backgroundColor,
    textColor,
    mcPackageColor,
    commStatusColor,
    showWarningIcon,
  };

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
          textColor={textColor}
          onClick={onClick}
          style={{ width: `${columnExpanded ? 100 : width}%`, maxWidth }}
          isSelected={isSelected}
        >
          {showWarningIcon && (
            <StyledWarningIconWrapper>
              <WarningIcon />
            </StyledWarningIconWrapper>
          )}
          <StyledSizes size={size} color={textColor} />
          {data.hasUnsignedActions && <FlagIcon color={textColor} />}
          <StyledItemText>{getDisplayName(data)}</StyledItemText>
          <StyledStatusCircles mcColor={mcPackageColor} commColor={commStatusColor} />
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
          popoverTitle={`Comm.pkg ${data.commpkgNo}`}
        >
          <PopoverContent data={data} itemOptions={options} />
        </PopoverWrapper>
      )}
    </>
  );
};

export const GardenItem = memo(HandoverItem);
