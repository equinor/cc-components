import { PortalAppsConfigConfigurator } from './configurator';
import { IPortalAppConfigProvider, PortalAppConfigProvider } from './provider';
import type { Module } from '@equinor/fusion-framework-module';

export type PortalAppConfig = Module<'portalAppConfig', IPortalAppConfigProvider, PortalAppsConfigConfigurator>;

export const modulePortalApps: PortalAppConfig = {
	name: 'portalAppConfig',
	configure: () => new PortalAppsConfigConfigurator(),
	initialize: async (args): Promise<IPortalAppConfigProvider> => {
		const config = await (args.config as PortalAppsConfigConfigurator).createConfigAsync(args);
		return new PortalAppConfigProvider(config);
	},
};

export default modulePortalApps;

declare module '@equinor/fusion-framework-module' {
	interface Modules {
		portalAppConfig: PortalAppConfig;
	}
}
