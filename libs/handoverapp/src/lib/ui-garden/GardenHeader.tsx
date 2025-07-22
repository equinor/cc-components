import { Typography } from '@equinor/eds-core-react';
import styled from 'styled-components';
import { tokens } from '@equinor/eds-tokens';
import { CustomHeaderView } from '@equinor/workspace-fusion/garden';
import { memo } from 'react';

const StyledHeaderContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 4px;
`;

const StyledCount = styled(Typography).withConfig({ displayName: 'cc-apps-' })`
  color: ${tokens.colors.text.static_icons__default.hex};
  font-weight: 300;
  color: inherit;
`;

const StyledHeaderText = styled(Typography).withConfig({ displayName: 'cc-apps-' })`
  white-space: pre-line;
  font-weight: 500;
  color: inherit;
`;

const Header = (props: CustomHeaderView) => {
  const { header } = props;

  return (
    <StyledHeaderContent>
      <StyledHeaderText variant="h6">{header.name}</StyledHeaderText>
      <StyledCount group="navigation" variant="label">
        RFOC: {header.completedCount ?? 0}/{header.count}
      </StyledCount>
    </StyledHeaderContent>
  );
};

export const GardenHeader = memo(Header);
