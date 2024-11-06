import styled from 'styled-components';
import { Icon, Progress } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';

import { StyledTabContent } from '@cc-components/shared';

import { useWorkOrderDescription } from '../utils-sidesheet/useWorkOrderDescription';

type WorkOrderDescriptionProps = {
  workOrderId: string;
};

export const WorkOrderDescription = (props: WorkOrderDescriptionProps): JSX.Element => {
  const { workOrderId } = props;

  const { data, isFetching, error } = useWorkOrderDescription(workOrderId);

  return (
    <StyledTabContent>
      <h3>Description</h3>

      {isFetching && (
        <NoResourceData>
          <Progress.Circular />
          <InfoText>Fetching description</InfoText>
        </NoResourceData>
      )}

      {error && (
        <NoResourceData>
          <Icon
            name="error_outlined"
            size={40}
            color={tokens.colors.interactive.primary__resting.hsla}
          />
          <InfoText>Failed to load description</InfoText>
        </NoResourceData>
      )}

      {!isFetching && data && !data.description && (
        <NoResourceData>
          <Icon
            name="info_circle"
            size={40}
            color={tokens.colors.interactive.primary__resting.hsla}
          />
          <InfoText>No description</InfoText>
        </NoResourceData>
      )}

      {!isFetching && data && <StyledDescription>{data.description}</StyledDescription>}
    </StyledTabContent>
  );
};

const StyledDescription = styled.p`
  padding: 0rem 1rem;
`;

export const NoResourceData = styled.div`
  text-align: center;
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 10px;
`;

export const InfoText = styled.h3`
  margin: 0;
`;
