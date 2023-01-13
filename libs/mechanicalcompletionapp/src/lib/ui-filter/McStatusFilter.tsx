import { McStatus } from '@cc-components/mechanicalcompletionshared';
import { statusColorMap } from '@cc-components/shared';
import { Container, StatusColor, Title } from './filter.styles';

type McStatusFilterProps = {
  status: McStatus;
};

export const McStatusFilter = ({ status }: McStatusFilterProps): JSX.Element => {
  return (
    <Container>
      <StatusColor color={statusColorMap[status]} />
      <Title>{status}</Title>
    </Container>
  );
};
