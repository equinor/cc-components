import { InsulationBox } from '@cc-components/pipingshared';
import { StyledContentWrapper, TabTable } from '@cc-components/shared';
import { insulationsColumns } from './insulationsColumns';

type InsulationTabProps = {
  pipeInsulations: InsulationBox[] | undefined;
  boxInsulations: InsulationBox[] | undefined;
  isFetching: boolean;
  error: Error | null;
};
export const InsultaionTab = ({
  pipeInsulations,
  boxInsulations,
  error,
  isFetching,
}: InsulationTabProps): JSX.Element => {
  return (
    <StyledContentWrapper>
      {pipeInsulations ? <h3>Pipe insulations:</h3> : ''}
      <TabTable
        columns={insulationsColumns}
        error={error}
        isFetching={isFetching}
        packages={pipeInsulations}
        resourceName="Pipe insulations"
      />
      {boxInsulations ? <h4>Box insulations:</h4> : ''}
      <TabTable
        columns={insulationsColumns}
        error={error}
        isFetching={isFetching}
        packages={boxInsulations}
        resourceName="Insulation boxes"
      />
    </StyledContentWrapper>
  );
};
