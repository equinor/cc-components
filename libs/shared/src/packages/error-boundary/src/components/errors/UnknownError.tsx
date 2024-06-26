import styled from 'styled-components';
import { error_outlined } from '@equinor/eds-icons';
import { Icon, Typography } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';

Icon.add({ error_outlined });

type UnknownErrorProps = {
  error: Error;
};

export function UnknownError(props: UnknownErrorProps) {
  const { error } = props;

  console.error(error);

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
        An unknown error occured.
      </Typography>
      <Typography>{error.message}</Typography>
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
