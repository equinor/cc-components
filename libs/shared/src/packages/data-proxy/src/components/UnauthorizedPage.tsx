import styled from 'styled-components';
import { FusionDataProxyError } from '../types/fusionDataProxyError';

type UnauthorizedErrorProps = {
  error: FusionDataProxyError;
};
export function UnathorizedPage({ error }: UnauthorizedErrorProps) {
  return (
    <StyledFusionError>
      <StyledErrorTitle>{error.error.message}</StyledErrorTitle>
      <div>
        <div>Requirements:</div>
        {error.error.accessRequirements.map((s) => (
          <div key={s.code}>{s.code}</div>
        ))}
      </div>
    </StyledFusionError>
  );
}

const StyledErrorTitle = styled.h1`
  max-width: 500px;
`;

const StyledFusionError = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
