import { tokens } from '@equinor/eds-tokens';
import { Tooltip } from '@equinor/eds-core-react';
import { useRef } from 'react';
import styled from 'styled-components';

import { WorkflowStep } from './workflowStep';

interface WorkflowDotProps {
  step: WorkflowStep;
}

export const WorkflowDot = (props: WorkflowDotProps) => {
  const { color, textColor, isActive, circleText, popoverText } = props.step;

  return (
    <StepCircleWrapper>
      <Tooltip title={popoverText}>
        <StepCircle color={color} textColor={textColor} isActive={isActive}>
          {circleText}
        </StepCircle>
      </Tooltip>
    </StepCircleWrapper>
  );
};

type StepCircleProps = {
  color: string;
  textColor: string;
  isActive: boolean;
};

const StepCircleWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const StepCircle = styled.div<StepCircleProps>`
  height: 16px;
  width: 16px;
  border-radius: 17px;
  font-size: 11px;
  color: ${(p) => `${p.textColor}`};
  line-height: 18px;
  text-align: center;
  background: ${(p) => p.color};
  outline: ${(p) =>
    !p.isActive ? `1px dashed ${tokens.colors.ui.background__medium.hex}` : null};
  cursor: ${(p) => (!p.isActive ? 'not-allowed' : 'pointer')};
`;
