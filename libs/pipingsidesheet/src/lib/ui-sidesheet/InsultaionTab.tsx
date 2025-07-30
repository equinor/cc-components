import { InsulationTagResponse } from '@cc-components/pipingshared';
import { TabTable } from '@cc-components/shared';
import { StyledContentWrapper } from '@cc-components/sharedcomponents';
import { insulationsColumns } from './insulationsColumns';
import { ReactElement } from 'react';

type InsulationTabProps = {
  insulationTags: InsulationTagResponse | undefined;
  isFetching: boolean;
  error: Error | null;
};

export const InsultaionTab = ({
  insulationTags,
  error,
  isFetching,
}: InsulationTabProps): ReactElement => {
  return (
    <StyledContentWrapper>
      {insulationTags?.pipeInsulationTags ? <h4>Pipe insulations:</h4> : ''}
      <TabTable
        columns={insulationsColumns}
        error={error}
        isFetching={isFetching}
        packages={insulationTags?.pipeInsulationTags}
        resourceName="Pipe insulations"
      />
    </StyledContentWrapper>
  );
};
