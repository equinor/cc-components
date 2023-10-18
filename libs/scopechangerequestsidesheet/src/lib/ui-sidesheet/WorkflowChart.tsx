import { ScopeChangeRequest } from '@cc-components/scopechangerequestshared';

type WorkflowChartProps = {
  scopechange?: ScopeChangeRequest | undefined;
  error?: Error | null;
};
export const WorkflowChart = ({
  scopechange,
  error,
}: WorkflowChartProps): JSX.Element => {
  return (
    <div>
      {scopechange?.workflowSteps?.map((x) => {
        return x.isCurrent || x.isCompleted ? (
          <div>
            <b> {'>>> ' + x.name} </b>
          </div>
        ) : (
          <div> {x.name} </div>
        );
      })}
    </div>
  );
};
