import styled from 'styled-components';
import { WorkflowDot } from './WorkflowDot';
import { WorkflowStep } from './workflowStep';

export interface WorkflowVisualProps {
  workflowSteps: WorkflowStep[];
}

export const WorkflowVisual = (props: WorkflowVisualProps) => {
  const { workflowSteps } = props;
  return (
    <>
      <WorkflowStepContainer>
        {workflowSteps
          .sort((a, b) => a.sortOrder - b.sortOrder)
          .map((x) => {
            return (
              <WorkflowStep>
                <WorkflowDot step={x} />
              </WorkflowStep>
            );
          })}
      </WorkflowStepContainer>
    </>
  );
};

const WorkflowStepContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const WorkflowStep = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 2px;
`;
