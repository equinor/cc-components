import { FlagIcon, PopoverWrapper, getStatusCircle } from '@cc-components/shared';
import { WorkOrder } from '@cc-components/workordershared';
import { CustomItemView } from '@equinor/workspace-fusion/garden';
import { memo, ReactElement, useMemo, useRef, useState } from 'react';
import { getWorkOrderStatuses } from '../utils-garden';
import {
  StyledItemText,
  StyledItemWrapper,
  StyledRoot,
  StyledSizes,
  StyledDescription,
} from './garden.styles';
import { WorkOrderPopover } from './Popover';

const WorkorderItem = (props: CustomItemView<WorkOrder>): ReactElement => {
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
    isSelected,
    columnStart,
    rowStart,
    parentRef,
    width: itemWidth = 300,
    groupingKeys,
    displayName,
    colorAssistMode,
  } = props;

  const {
    backgroundColor,
    matColor,
    matStatus,
    mccrColor,
    progressBar,
    size,
    status,
    textColor,
    //TODO: group by keys
  } = useMemo(
    () => getWorkOrderStatuses(data, groupingKeys.at(0)!, groupingKeys.slice(1)),
    [data]
  );

  const width = useMemo(() => (depth ? 100 - depth * 3 : 100), [depth]);
  const maxWidth = useMemo(() => itemWidth * 0.98, [itemWidth]);

  const materialStatus = getStatusCircle(data.materialStatus, colorAssistMode);
  const mccrStatus = getStatusCircle(data.mccrStatus, colorAssistMode);

  return (
    <>
      <StyledRoot>
        <StyledItemWrapper
          backgroundColor={backgroundColor}
          textColor={textColor}
          background={progressBar}
          ref={anchorRef}
          onMouseOver={() => {
            hoverTimeout && !isOpen && clearTimeout(hoverTimeout);
            setHoverTimeout(setTimeout(() => setIsOpen(true), 1000));
          }}
          onMouseOut={() => {
            hoverTimeout && clearTimeout(hoverTimeout);
            setIsOpen(false);
          }}
          onClick={onClick}
          style={{ width: `${columnExpanded ? 100 : width}%`, maxWidth }}
          progressBackground={progressBar}
          isSelected={isSelected}
        >
          <StyledSizes size={size} color={textColor} />
          {data.holdBy && <FlagIcon color={textColor} />}
          <StyledItemText>{displayName}</StyledItemText>
          <div
            style={{ display: 'flex', gap: '4px', height: '14px', marginLeft: 'auto' }}
          >
            {materialStatus}
            {mccrStatus}
          </div>
        </StyledItemWrapper>
        {columnExpanded && (
          <StyledDescription title={data.description ?? ''}>
            {data.description}
          </StyledDescription>
        )}
      </StyledRoot>
      {isOpen && (
        <PopoverWrapper
          close={() => setIsOpen(false)}
          popoverTitle={`Wo.Number: ${data.workOrderNumber}`}
          width={itemWidth}
          parentRef={parentRef}
          isOpen={isOpen}
          anchorRef={anchorRef}
        >
          <WorkOrderPopover
            data={data}
            itemOptions={{
              barColor: backgroundColor,
              textColor: textColor,
              milestone: status,
              size,
              matStatus,
              matColor,
              mccrColor,
            }}
          />
        </PopoverWrapper>
      )}
    </>
  );
};

export const GardenItem = memo(WorkorderItem);
