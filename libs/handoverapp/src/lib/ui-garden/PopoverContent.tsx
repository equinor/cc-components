import { HandoverPackage } from '@cc-components/handovershared';
import {
  FlagIcon,
  SizeIcons,
  StyledPopoverContainer,
  StyledPopoverProgressBar,
  StyledPopoverProjectDescription,
  StyledPopoverProjectTitle,
  StyledPopoverStatus,
  WarningIcon,
} from '@cc-components/shared/common';

import { getTextColor } from '../utils-garden';
import {
  StyledFlagUnsignedAction,
  StyledIconsContainer,
  StyledStatuses,
  StyledWarningContainer,
  StyledWarningText,
} from './garden.styles';
import { ItemOptions } from './types';

type PopoverContentProps = {
  data: HandoverPackage;
  itemOptions: ItemOptions;
};
export const PopoverContent = ({
  data,
  itemOptions: {
    barColor,
    commStatusColor,
    mcPackageColor,
    showWarningIcon,
    size,
    status,
    textColor,
  },
}: PopoverContentProps) => {
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
      <StyledPopoverProgressBar barColor={barColor} textColor={textColor}>
        <strong>{`Milestone: ${status}`}</strong>
        <span>
          <SizeIcons color={getTextColor(status)} size={size} />

          <strong> {`Volume: ${data.volume} (${size})`}</strong>
        </span>
      </StyledPopoverProgressBar>
      {(showWarningIcon || data.hasUnsignedActions) && (
        <StyledIconsContainer>
          {showWarningIcon && (
            <StyledWarningContainer>
              <WarningIcon />
              <StyledWarningText>
                <strong>NB:</strong>
                <p>RFCC with MC status OS</p>
              </StyledWarningText>
            </StyledWarningContainer>
          )}
          {data.hasUnsignedActions && (
            <StyledFlagUnsignedAction>
              <FlagIcon color={textColor} /> <p>Unsigned actions</p>
            </StyledFlagUnsignedAction>
          )}
        </StyledIconsContainer>
      )}
      <StyledStatuses>
        <h5>MC status</h5>
        <StyledPopoverStatus color={mcPackageColor}>
          {['OS', 'OK', 'PA'].includes(data.mechanicalCompletionStatus)
            ? data.mechanicalCompletionStatus
            : 'PB'}
        </StyledPopoverStatus>

        <h5>CommPkg status</h5>
        <StyledPopoverStatus color={commStatusColor}>
          {['OS', 'OK', 'PA'].includes(data.status) ? data.status : 'PB'}
        </StyledPopoverStatus>
      </StyledStatuses>
    </StyledPopoverContainer>
  );
};
