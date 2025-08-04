import { Loop } from '@cc-components/loopshared';
import {
  StyledDetailsRow,
  StyledPopoverContainer,
  StyledPopoverProjectDescription,
  StyledPopoverProjectTitle,
  StyledPopoverStatus,
} from '@cc-components/shared/common';
import { statusColorMap } from '@cc-components/shared/mapping';
import { StyledStatuses, StyledNoStatus } from './garden.styles';

type PopoverContentProps = {
  loop: Loop;
};
export const PopoverContent = ({ loop }: PopoverContentProps) => {
  return (
    <StyledPopoverContainer>
      <StyledDetailsRow>
        <StyledPopoverProjectTitle>Project: </StyledPopoverProjectTitle>
        <p>
          {loop.project}, {loop.projectDescription}
        </p>
      </StyledDetailsRow>
      <StyledDetailsRow>
        <StyledPopoverProjectTitle>Facility: </StyledPopoverProjectTitle>
        <p>{loop.facility}</p>
      </StyledDetailsRow>
      <StyledDetailsRow>
        <StyledPopoverProjectTitle>Description: </StyledPopoverProjectTitle>
        <StyledPopoverProjectDescription>
          {loop.description}
        </StyledPopoverProjectDescription>
      </StyledDetailsRow>
      <hr />

      <StyledStatuses>
        <h5>MC content status</h5>
        {loop.loopContentStatus ? (
          <StyledPopoverStatus $color={statusColorMap[loop.loopContentStatus]}>
            {loop.loopContentStatus}
          </StyledPopoverStatus>
        ) : (
          <StyledNoStatus size="medium" />
        )}
        <h5>Loop checklist status</h5>
        {loop.status ? (
          <StyledPopoverStatus $color={statusColorMap[loop.status]}>
            {loop.status}
          </StyledPopoverStatus>
        ) : (
          <StyledNoStatus size="medium" />
        )}
      </StyledStatuses>
    </StyledPopoverContainer>
  );
};
