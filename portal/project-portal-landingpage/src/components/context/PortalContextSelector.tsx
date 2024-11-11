import { Button } from '@equinor/eds-core-react';
import styled from 'styled-components';

import {
  ContextProvider,
  ContextSelector,
  useCurrentContext,
} from '@equinor/fusion-portal-react-context';
import { getContextPageURL } from '@equinor/project-portal-common';
import { NavigationModule } from '@equinor/fusion-framework-module-navigation';
import { useFramework } from '@equinor/fusion-framework-react';

const StyledWrapper = styled.div`
  display: flex;
  width: 50vw;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 0.5rem;

  > fwc-searchable-dropdown-provider {
    flex: 1;
  }

  @media only screen and (max-width: 60rem) {
    width: 80vw;
  }
  @media only screen and (max-width: 45rem) {
    width: 90vw;
    flex-direction: column;
  }
`;

const StyledButton = styled(Button)`
  white-space: nowrap;
`;
const StyledActionWrapper = styled.div`
  min-width: 120px;
`;

/**
 * PortalContextSelector component provides a UI for selecting and navigating to different contexts within the portal.
 * It utilizes the current context and framework modules to render a button that navigates to the selected context's page.
 *
 * @returns {JSX.Element} The rendered PortalContextSelector component.
 */
export const PortalContextSelector = () => {
  const currentContext = useCurrentContext();
  const { modules } = useFramework<[NavigationModule]>();

  return (
    <ContextProvider>
      <StyledWrapper>
        <ContextSelector />
        <StyledActionWrapper>
          {currentContext && (
            <StyledButton
              variant="ghost"
              onClick={() => {
                modules.navigation.push(getContextPageURL(currentContext));
              }}
            >
              Go to {currentContext.title}
            </StyledButton>
          )}
        </StyledActionWrapper>
      </StyledWrapper>
    </ContextProvider>
  );
};
