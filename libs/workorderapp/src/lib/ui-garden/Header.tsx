import { CustomHeaderView } from '@equinor/workspace-fusion/garden';
import { memo } from 'react';
import styled from 'styled-components';

const StyledHeaderContent = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  font-weight: 600;
`;

const StyledCount = styled.h2`
  color: #000000;
  font-weight: 300;
  font-size: 0.8rem;
  margin-left: 0.8em;
`;

const StyledHeaderText = styled.h2`
  white-space: pre-line;
  font-size: 16px;
`;

const WorkOrderHeader = (props: CustomHeaderView) => {
  const { header } = props;

  return (
    <StyledHeaderContent>
      <StyledHeaderText>{header.name}</StyledHeaderText>
      <StyledCount>({header.count})</StyledCount>
    </StyledHeaderContent>
  );
};

export const GardenHeader = memo(WorkOrderHeader);
