import type { AppModuleInitiator } from '@equinor/fusion-framework-app';
import { enableContext } from '@equinor/fusion-framework-react-app/context';
import { enableFeatureFlagging } from '@equinor/fusion-framework-module-feature-flag';
import { createLocalStoragePlugin } from '@equinor/fusion-framework-module-feature-flag/plugins';
import { enableNavigation } from '@equinor/fusion-framework-module-navigation';

interface Client {
  baseUri: string;
  defaultScopes: string[];
}

export const configure: AppModuleInitiator = (configurator, { env }) => {
  const { basename, config } = env;

  enableContext(configurator);
  enableNavigation(configurator, basename);

  enableFeatureFlagging(configurator, (builder) => {
    builder.addPlugin(
      createLocalStoragePlugin([
        {
          key: 'project-prediction',
          title: 'Allocated Projects',
          description:
            'When enabled you will get your allocated projects on the portal landing page',
          enabled: true,
        },
      ])
    );
  });

  configurator.onInitialized((f) => console.log(f));
};

export default configure;
