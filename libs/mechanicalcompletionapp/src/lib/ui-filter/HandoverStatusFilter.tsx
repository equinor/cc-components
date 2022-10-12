import { CommissioningStatus } from '../types';
import { commStatusColors } from '../utils-statuses/commStatusColors';
import { Container, StatusColor, Title } from './filter.styles';

type HandoverStatusFilterProps = {
  status: CommissioningStatus;
};
export const HandoverStatusFilter = ({ status }: HandoverStatusFilterProps) => {
  return (
    <Container>
      <StatusColor color={commStatusColors[status]} />
      <Title title={status.toString()}>{status}</Title>
    </Container>
  );
};
