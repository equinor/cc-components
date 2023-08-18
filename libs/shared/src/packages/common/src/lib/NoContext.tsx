import styled from 'styled-components';
import { useModuleCurrentContext } from '@equinor/fusion-framework-react-module-context';
import { useLayoutEffect } from 'react';

const StyledNoContext = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const NoContext = () => {
  const { setCurrentContext } = useModuleCurrentContext();

  useLayoutEffect(() => {
    if (window.location.href.includes('localhost')) {
      setCurrentContext('ce31b83a-b6cd-4267-89f3-db308edf721e');
    }
  }, [window.location.href]);

  return (
    <StyledNoContext>
      <h2>Choose a valid context</h2>
    </StyledNoContext>
  );
};
