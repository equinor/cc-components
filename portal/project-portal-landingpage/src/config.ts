import type { AppModuleInitiator } from '@equinor/fusion-framework-app';
import { enableContext } from '@equinor/fusion-framework-react-app/context';
import { enableFeatureFlagging } from '@equinor/fusion-framework-module-feature-flag';
import { createLocalStoragePlugin } from '@equinor/fusion-framework-module-feature-flag/plugins';
import { enableNavigation } from '@equinor/fusion-framework-module-navigation';
import { enablePortalAppConfig, IPortal } from '@equinor/fusion-portal-module-app-config';

interface Client {
  baseUri: string;
  defaultScopes: string[];
}
interface Environment { portalClient: Client  }

export const configure: AppModuleInitiator = (configurator, { env }) => {
  const { basename, config } = env;
	const environment = config?.environment as Environment | undefined;

	if (!environment) {
		throw new Error('Failed to load environment config for project-portal-landingpage');
	}

  enableContext(configurator, async (builder) => {
    try {
      const { current } = await builder.requireInstance<{ current: IPortal }>('portalConfig');
      builder.setContextType(current.portalAppConfig.contextTypes.map((ct) => ct.type));
    } catch (error) {
      console.error('Failed to load portal config', error);
    }

  });
  enableNavigation(configurator, basename);
	configurator.configureHttpClient('portal-client', environment.portalClient);

	enablePortalAppConfig(configurator, (builder) => {
		builder.selPortalConfig(async (arg) => {
			try {
				const { current } = (arg.ref as { portalServices: { current: IPortal }})?.portalServices;
				return current.portalAppConfig;
			} catch (error) {
				console.error('Failed to load portal config', error);
				return { id: "cli", contextTypes: [{ type: "ProjectMaster" }], env: "ci" };
			}
		});
	});

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


};

export default configure;
