import { statusColorMap } from '@cc-components/shared';
import { McStatus } from '../types';
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
