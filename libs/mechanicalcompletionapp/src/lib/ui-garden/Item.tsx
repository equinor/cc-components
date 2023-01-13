import { McPackage } from '@cc-components/mechanicalcompletionshared';
import { PopoverWrapper, statusColorMap } from '@cc-components/shared';
import { CustomItemView } from '@equinor/workspace-fusion/garden';
import { memo, useMemo, useState } from 'react';
import { CustomGroupByKeys, ExtendedGardenFields } from '../types';
import { getItemContentsColor } from '../utils-garden/getItemContentsColor';
import { getTagSize } from '../utils-garden/getTagSize';
import { getCommissioningStatus } from '../utils-statuses';
import { commStatusColors } from '../utils-statuses/commStatusColors';
import {
  StyledItemText,
  StyledItemWrapper,
  StyledRoot,
  StyledSizes,
  StyledStatusCircles,
} from './garden.styles';
import { PopoverContent } from './Popover/PopoverContent';

const McGardenItem = (
  props: CustomItemView<
    McPackage,
    ExtendedGardenFields,
    CustomGroupByKeys,
    Record<'averageTagVolume', number>
  >
) => {
  const {
    columnExpanded,
    columnStart,
    controller,
    data,
    isSelected,
    onClick,
    parentRef,
    rowStart,
    depth,
    width: itemWidth = 300,
  } = props;
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [hoverTimeout, setHoverTimeout] = useState<ReturnType<typeof setTimeout> | null>(
    null
  );
  const { useContext, getDisplayName } = controller;

  const context = useContext();
  const size = useMemo(
    () => getTagSize(data, context?.['averageTagVolume'] || 0),
    [context, data]
  );
  const status = useMemo(() => getCommissioningStatus(data), [data]);
  const backgroundColor = useMemo(() => commStatusColors[status], [status]);
  const contentsColor = useMemo(() => getItemContentsColor(status), [status]);
  const mcDotColor = useMemo(() => statusColorMap[data.mcStatus], [data.mcStatus]);
  const commDotColor = useMemo(
    () => statusColorMap[data.commPkgStatus],
    [data.commPkgStatus]
  );
  const width = useMemo(() => (depth ? 100 - depth * 3 : 97), [depth]);
  const maxWidth = useMemo(() => itemWidth * 0.98, [itemWidth]);
  const options = {
    status,
    backgroundColor,
    contentsColor,
    size,
    mcDotColor,
    commDotColor,
  };
  return (
    <>
      <StyledRoot>
        <StyledItemWrapper
          onMouseEnter={() => {
            hoverTimeout && !isOpen && clearTimeout(hoverTimeout);
            setHoverTimeout(setTimeout(() => setIsOpen(true), 700));
          }}
          onMouseLeave={() => {
            hoverTimeout && clearTimeout(hoverTimeout);
            setIsOpen(false);
          }}
          onClick={onClick}
          backgroundColor={backgroundColor}
          textColor={contentsColor}
          isSelected={isSelected}
          style={{ width: `${columnExpanded ? 100 : width}%`, maxWidth }}
        >
          <StyledSizes color={contentsColor} size={size} />
          <StyledItemText> {getDisplayName(data)}</StyledItemText>

          <StyledStatusCircles mcColor={mcDotColor} commColor={commDotColor} />
        </StyledItemWrapper>
        {columnExpanded && data.description}
      </StyledRoot>
      {isOpen && (
        <PopoverWrapper
          isOpen={isOpen}
          width={itemWidth}
          parentRef={parentRef}
          rowStart={rowStart}
          columnStart={columnStart}
          popoverTitle={`Mc.pkg: ${data.mcPkgNumber}`}
        >
          <PopoverContent data={data} options={options} />
        </PopoverWrapper>
      )}
    </>
  );
};

export const GardenItem = memo(McGardenItem);
