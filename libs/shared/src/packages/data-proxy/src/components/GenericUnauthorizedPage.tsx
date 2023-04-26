import styled from 'styled-components';
import { FusionDataProxyError } from '../types/fusionDataProxyError';
import { error_outlined } from '@equinor/eds-icons';
import { Icon, Typography } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';

Icon.add({ error_outlined });

export function GenericUnathorizedPage() {
  return (
    <StyledFusionError>
      <Icon
        name={error_outlined.name}
        size={48}
        color={tokens.colors.interactive.warning__resting.hex}
      />
      <Typography
        variant="h1"
        group="heading"
        color={tokens.colors.interactive.warning__resting.hex}
        bold
        lines={2}
      >
        Looks like you do not have access to the selected context or the selected context
        is missing data
      </Typography>
    </StyledFusionError>
  );
}

const StyledFusionError = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2em;
`;

const StyledList = styled.ul`
  padding-inline-start: 1em;
`;
