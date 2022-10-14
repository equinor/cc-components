import {
  FlagIcon,
  SizeIcons,
  StyledPopoverContainer,
  StyledPopoverProgressBar,
  StyledPopoverStatus,
} from '@cc-components/shared';
import { memo } from 'react';
import { WorkOrder } from '../../types';
import {
  StyledStatuses,
  StyledHoldBy,
  StyledProjectTitle,
  StyledProjectDescription,
} from './popover.styles';
type ItemSize = 'small' | 'medium' | 'large';

type ItemOptions = {
  size: ItemSize;
  barColor: string;
  textColor: string;
  milestone: string;
  matStatus: string;
  matColor: string;
  mccrColor: string;
};
type WorkOrderPopoverProps = {
  data: WorkOrder;
  itemOptions: ItemOptions;
};
const WorkOrderPopoverWrapper = ({ data, itemOptions }: WorkOrderPopoverProps) => {
  const { barColor, textColor, milestone, size, matStatus, matColor, mccrColor } =
    itemOptions;
  return (
    <StyledPopoverContainer>
      <StyledProjectTitle>Project (ProCoSys)</StyledProjectTitle>
      <p>
        {data.projectIdentifier}, {data.projectDescription}
      </p>
      <StyledProjectDescription>{data.description}</StyledProjectDescription>
      <hr />
      <StyledPopoverProgressBar barColor={barColor} textColor={textColor}>
        <strong>Status: {milestone}</strong>

        <div>
          <SizeIcons size={size} color={textColor} />
          <strong>
            Volume: {data.estimatedHours} ({size})
          </strong>
        </div>
      </StyledPopoverProgressBar>
      {data.holdBy && (
        <StyledHoldBy>
          <FlagIcon color={'black'} /> Hold by
        </StyledHoldBy>
      )}
      <StyledStatuses>
        <h5>Material status</h5>
        <StyledPopoverStatus color={matColor}>
          {matStatus === 'NOT_AVAILABLE'
            ? 'NA'
            : matStatus === 'AVAILABLE'
            ? 'AV'
            : matStatus === 'OK'
            ? 'OK'
            : 'OS'}
        </StyledPopoverStatus>
        <h5>MCCR status</h5>
        <StyledPopoverStatus color={mccrColor}>
          {['OS', 'PB', 'PA'].includes(data.mccrStatus || '') ? data.mccrStatus : 'OK'}
        </StyledPopoverStatus>
      </StyledStatuses>
    </StyledPopoverContainer>
  );
};

export const WorkOrderPopover = memo(WorkOrderPopoverWrapper);
