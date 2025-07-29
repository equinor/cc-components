import { ScopeChangeRequest } from '@cc-components/scopechangerequestshared';
import { Icon } from '@equinor/eds-core-react';
import { check, arrow_forward } from '@equinor/eds-icons';
import { tokens } from '@equinor/eds-tokens';
import {
  StyledRequestColumn,
  StyledRequestTabWrapper,
  VerticalLine,
  WorklowIconAndLine,
} from '../requestTab.styles';
import { StyledWorkflowText } from '../requestTab.styles';
import { ReactElement } from 'react';

type WorkflowChartProps = {
  scopechange?: ScopeChangeRequest | undefined;
  error?: Error | null;
};
Icon.add({ check, arrow_forward });
export const WorkflowChart = ({
  scopechange,
  error,
}: WorkflowChartProps): ReactElement => {
  const workflowLen = scopechange?.workflowSteps?.length || 0;
  return (
    <>
      {scopechange?.workflowSteps?.map((x, i) => {
        return x.isCurrent || x.isCompleted ? (
          <>
            <>
              <b>
                {x.isCompleted ? (
                  <StyledWorkflowText>
                    <Icon
                      name={check.name}
                      size={16}
                      color={tokens.colors.interactive.primary__resting.hsla}
                    />
                    {x.name}
                  </StyledWorkflowText>
                ) : (
                  <StyledWorkflowText>
                    <Icon
                      name={arrow_forward.name}
                      size={16}
                      color={tokens.colors.interactive.primary__resting.hsla}
                    />
                    {x.name}
                  </StyledWorkflowText>
                )}
              </b>
            </>

            <WorklowIconAndLine>
              {i !== workflowLen - 1 && <VerticalLine active={x.isCurrent} />}
            </WorklowIconAndLine>
          </>
        ) : (
          <>
            {x.name}
            <WorklowIconAndLine>
              {i !== workflowLen - 1 && <VerticalLine active={x.isCurrent} />}
            </WorklowIconAndLine>
          </>
        );
      })}
    </>
  );
};
