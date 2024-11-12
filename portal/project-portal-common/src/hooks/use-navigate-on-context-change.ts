import { useEffect } from 'react';
import { NavigationModule } from '@equinor/fusion-framework-module-navigation';
import { useFramework } from '@equinor/fusion-framework-react-app/framework';
import { EventModule } from '@equinor/fusion-framework-module-event';

import { getContextPageURL } from '../utils';

/**
 * Custom hook that listens for context changes and navigates to the appropriate URL.
 *
 * This hook uses the `useFramework` hook to access the `NavigationModule` and `EventModule`.
 * It sets up an event listener for the `onCurrentContextChanged` event, which triggers
 * navigation to a new URL based on the next context provided in the event details.
 *
 * @returns {void}
 */
export const useNavigateOnContextChange = () => {
  const { modules } = useFramework<[NavigationModule, EventModule]>();

  useEffect(() => {
    return modules.event.addEventListener('onCurrentContextChanged', (event) => {
      const url = new URL(getContextPageURL(event.detail.next), location.origin);

      modules.navigation.push(url);
    });
  }, [modules]);
};
