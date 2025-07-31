import { CommissioningStatus, TagSize } from '../../types';
import { Statuses } from './popoverContent.styles';
import {
  StyledPopoverContainer,
  StyledPopoverProgressBar,
  StyledPopoverStatus,
  SizeIcons,
  StyledPopoverProjectTitle,
  StyledPopoverProjectDescription,
  StyledDetailsRow,
} from '@cc-components/shared/common';
import { McPackage } from '../../../../../mechanicalcompletionshared';
import { ReactElement } from 'react';

type ItemOptions = {
  size: TagSize;
  backgroundColor: string;
  contentsColor: string;
  mcDotColor: string;
  commDotColor: string;
  status: string;
};

type PopoverContentProps = {
  data: McPackage;
  options: ItemOptions;
};

export const PopoverContent = ({
  data,
  options: { size, backgroundColor, contentsColor, mcDotColor, commDotColor, status },
}: PopoverContentProps): ReactElement => {
  return (
    <StyledPopoverContainer>
      <StyledDetailsRow>
        <StyledPopoverProjectTitle>Project: </StyledPopoverProjectTitle>
        <p>
          {data.project}, {data.projectDescription}
        </p>
      </StyledDetailsRow>
      <StyledDetailsRow>
        <StyledPopoverProjectTitle>Facility: </StyledPopoverProjectTitle>
        <p>{data.facility}</p>
      </StyledDetailsRow>
      <StyledDetailsRow>
        <StyledPopoverProjectTitle>Description: </StyledPopoverProjectTitle>
        <StyledPopoverProjectDescription>
          {data.description}
        </StyledPopoverProjectDescription>
      </StyledDetailsRow>
      <hr />
      <StyledPopoverProgressBar $barColor={backgroundColor} $textColor={contentsColor}>
        <span>
          <strong>Milestone: {status}</strong>
        </span>
        <span>
          <SizeIcons color={contentsColor} size={size} />
          <strong>
            Volume: {data.tagVolume} ({size})
          </strong>
        </span>
      </StyledPopoverProgressBar>
      <Statuses>
        <h5>MC status</h5>
        <StyledPopoverStatus $color={mcDotColor}>
          {['OS', 'OK', 'PA'].includes(data.mechanicalCompletionStatus)
            ? data.mechanicalCompletionStatus
            : 'PB'}
        </StyledPopoverStatus>

        <h5>Comm status</h5>
        <StyledPopoverStatus $color={commDotColor}>
          {['OS', 'OK', 'PA'].includes(data.commpkgStatus) ? data.commpkgStatus : 'PB'}
        </StyledPopoverStatus>
      </Statuses>
    </StyledPopoverContainer>
  );
};
