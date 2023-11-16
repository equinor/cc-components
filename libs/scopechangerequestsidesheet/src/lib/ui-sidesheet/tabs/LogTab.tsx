import {
  DateCell,
  DescriptionCell,
  StyledTabContent,
  TabTable,
} from '@cc-components/shared';
import { StyledContentWrapper } from '@cc-components/sharedcomponents';
import { Checkbox } from '@equinor/eds-core-react';
import { LogEntry, ScopeChangeRequest } from '@cc-components/scopechangerequestshared';
import { WorkflowChart } from './requestTab/workflow/WorkflowChart';
import { VerticalLine } from './requestTab/requestTab.styles';

type LogTabProps = {
  logEntry?: LogEntry[] | undefined;
  isFetching?: boolean;
  error?: Error | null;
};

export const Logtab = ({ logEntry, error, isFetching }: LogTabProps): JSX.Element => {
  return (
    <div>
      {logEntry?.map((s) => {
        return (
          <div>
            <DateCell dateString={s.createdAtUtc}></DateCell>
            <DescriptionCell
              description={s.createdByAzureOid || 'No creator'}
            ></DescriptionCell>
            <div>{s.details || 'No details'}</div>
            <div>{s.title || 'No title'}</div>
            <hr></hr>
          </div>
        );
      })}
    </div>
  );
};
