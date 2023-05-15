//import { HandoverPackage } from '@cc-components/handovershared';
import { CustomHeaderView } from '@equinor/workspace-fusion/garden';
import { memo, useMemo } from 'react';
import styled from 'styled-components';
//import { getSubtitleHeader } from '../utils-garden';

const HeaderContent = styled.div`
  font-weight: 600;
`;

const Count = styled.span`
  color: #000000;
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
        <div>{''}</div>
      </div>
      <Count>({header.count})</Count>
    </HeaderContent>
  );
};

export const GardenHeader = memo(HandoverGardenHeader);
