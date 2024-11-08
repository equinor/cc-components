import type { IModulesConfigurator } from '@equinor/fusion-framework-module';

import { modulePortalApps } from './module';
import { PortalAppsConfigConfigurator } from './configurator';

export type PortalAppsBuilderCallback = (builder: PortalAppsConfigConfigurator) => void | Promise<void>;

/**
 * Method for enabling the portal apps module
 * @param configurator - configuration object
 */
export const enablePortalApps = (
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	configurator: IModulesConfigurator<any, any>,
	builder?: PortalAppsBuilderCallback
): void => {
	configurator.addConfig({
		module: modulePortalApps,
		configure: (configurator) => {
			builder && builder(configurator);
		},
	});
};
