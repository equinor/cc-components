import { CommissioningStatus, McPackage, TagSize } from '../../types';
import { Statuses } from './popoverContent.styles';
import {
  StyledPopoverContainer,
  StyledPopoverProgressBar,
  StyledPopoverStatus,
  SizeIcons,
  StyledPopoverProjectTitle,
  StyledPopoverProjectDescription,
} from '@cc-components/shared';
type ItemOptions = {
  status: CommissioningStatus;
  backgroundColor: string;
  contentsColor: string;
  size: TagSize;
  mcDotColor: string;
  commDotColor: string;
};
type PopoverContentProps = {
  data: McPackage;
  options: ItemOptions;
};
export const PopoverContent = ({
  data,
  options: { backgroundColor, contentsColor, size, status, commDotColor, mcDotColor },
}: PopoverContentProps): JSX.Element => {
  return (
    <StyledPopoverContainer>
      <StyledPopoverProjectTitle>Project (ProCoSys)</StyledPopoverProjectTitle>
      <p>
        {data.projectIdentifier}, {data.projectDescription}
      </p>
      <StyledPopoverProjectDescription>
        {data.description}
      </StyledPopoverProjectDescription>
      <hr />
      <StyledPopoverProgressBar barColor={backgroundColor} textColor={contentsColor}>
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
        <StyledPopoverStatus color={mcDotColor}>
          {['OS', 'OK', 'PA'].includes(data.mcStatus) ? data.mcStatus : 'PB'}
        </StyledPopoverStatus>

        <h5>Comm status</h5>
        <StyledPopoverStatus color={commDotColor}>
          {['OS', 'OK', 'PA'].includes(data.commPkgStatus) ? data.commPkgStatus : 'PB'}
        </StyledPopoverStatus>
      </Statuses>
    </StyledPopoverContainer>
  );
};
