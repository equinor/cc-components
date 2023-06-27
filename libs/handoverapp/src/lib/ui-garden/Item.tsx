import { HandoverPackage } from '@cc-components/handovershared';
import { FlagIcon, PopoverWrapper, WarningIcon } from '@cc-components/shared/common';
import { CustomItemView } from '@equinor/workspace-fusion/garden';
import { memo, useMemo, useRef, useState } from 'react';
import { getDotsColor, getItemSize, getTextColor} from '../utils-garden';
// import { getStatus } from '../utils-statuses';
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
  } = props;
  //TODO Context.MAXSIZE
  const size = getItemSize(data.volume, 100 || 0);

  // const status = getStatus(data);
  const backgroundColor = useMemo(
    () => createProgressGradient(data, data.commissioningPackageStatus),
    [data, data.commissioningPackageStatus]
  );
  const textColor = getTextColor(data.commissioningPackageStatus);

  const mcPackageColor = getDotsColor(data.mechanicalCompletionStatus);
  const commStatusColor = getDotsColor(data.dynamicCommissioningStatus);

  const showWarningIcon = data.mechanicalCompletionStatus === 'OS' && data.commissioningPackageStatus === 'RFC Accepted';

  const width = useMemo(() => (depth ? 100 - depth * 3 : 100), [depth]);
  const maxWidth = useMemo(() => itemWidth * 0.98, [itemWidth]);

  const options: ItemOptions = {
    size,
    status : data.commissioningPackageStatus,
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
          onMouseOver={() => {
            hoverTimeout && !isOpen && clearTimeout(hoverTimeout);
            setHoverTimeout(setTimeout(() => setIsOpen(true), 700));
          }}
          onMouseOut={() => {
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
          <StyledItemText>{data.commissioningPackageNo}</StyledItemText>
          <StyledStatusCircles mcColor={mcPackageColor} commColor={commStatusColor} />
        </StyledItemWrapper>

        {columnExpanded && data.description}
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
