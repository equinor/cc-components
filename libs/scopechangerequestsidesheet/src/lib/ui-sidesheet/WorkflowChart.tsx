import { ScopeChangeRequest } from '@cc-components/scopechangerequestshared';
import { Icon } from '@equinor/eds-core-react';
import { check, arrow_forward } from '@equinor/eds-icons';
import { tokens } from '@equinor/eds-tokens';
type WorkflowChartProps = {
  scopechange?: ScopeChangeRequest | undefined;
  error?: Error | null;
};
Icon.add({ check, arrow_forward });
export const WorkflowChart = ({
  scopechange,
  error,
}: WorkflowChartProps): JSX.Element => {
  return (
    <div>
      {scopechange?.workflowSteps?.map((x) => {
        return x.isCurrent || x.isCompleted ? (
          <div>
            <b>
              {x.isCompleted ? (
                <>
                  <Icon
                    name={check.name}
                    size={16}
                    color={tokens.colors.interactive.primary__resting.hsla}
                  />
                  {x.name}
                </>
              ) : (
                <>
                  <Icon
                    name={arrow_forward.name}
                    size={16}
                    color={tokens.colors.interactive.primary__resting.hsla}
                  />
                  {x.name}
                </>
              )}
            </b>
          </div>
        ) : (
          <div> {x.name} </div>
        );
      })}
    </div>
  );
};
