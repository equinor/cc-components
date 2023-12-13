import { CustomHeaderView } from '@equinor/workspace-fusion/garden';
import { memo } from 'react';
import styled from 'styled-components';

const HeaderContent = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  font-weight: 600;
`;
const Count = styled.span`
  color: #000000;
  font-weight: 300;
  font-size: 0.8rem;
  margin-left: 0.8em;
`;
const WorkOrderHeader = (props: CustomHeaderView) => {
  const { header } = props;

  return (
    <HeaderContent>
      <div style={{ whiteSpace: 'pre-line' }}>{header.name}</div>
      <Count>({header.count})</Count>
    </HeaderContent>
  );
};

export const GardenHeader = memo(WorkOrderHeader);
