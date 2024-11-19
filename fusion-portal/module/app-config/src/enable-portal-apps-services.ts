import type { IModulesConfigurator } from '@equinor/fusion-framework-module';

import { modulePortalApps } from './module';
import { PortalAppsConfigConfigurator } from './configurator';

export type PortalAppConfigBuilderCallback = (builder: PortalAppsConfigConfigurator) => void | Promise<void>;

/**
 * Method for enabling the portal apps module
 * @param configurator - configuration object
 */
export const enablePortalAppConfig = (
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	configurator: IModulesConfigurator<any, any>,
	builder?: PortalAppConfigBuilderCallback
): void => {
	configurator.addConfig({
		module: modulePortalApps,
		configure: (configurator) => {
			builder && builder(configurator);
		},
	});
};
