import { CustomHeaderView } from '@equinor/workspace-fusion/garden';
import { memo } from 'react';
import styled from 'styled-components';
import { tokens } from '@equinor/eds-tokens';

const HeaderContent = styled.div`
  font-weight: 600;
`;

const Count = styled.span`
  color: ${tokens.colors.text.static_icons__default};
  font-weight: 300;
  font-size: 0.8rem;
  margin-left: 0.8em;
`;

const HandoverGardenHeader = (props: CustomHeaderView) => {
  const { header } = props;

  return (
    <HeaderContent>
      <div>
        {header.name} 
      </div>
      <Count>({header.count})</Count>
    </HeaderContent>
  );
};

export const GardenHeader = memo(HandoverGardenHeader);
