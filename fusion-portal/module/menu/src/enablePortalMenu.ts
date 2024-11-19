/* eslint-disable @typescript-eslint/no-explicit-any */
import type { IModulesConfigurator } from '@equinor/fusion-framework-module';

import { menuModule } from './module';
/**
 * Method for enabling the PortalMenu module
 * @param configurator - configuration object
 */
export const enablePortalMenu = (configurator: IModulesConfigurator<any, any>): void => {
	configurator.addConfig({
		module: menuModule,
	});
};
