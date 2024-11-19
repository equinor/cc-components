/* eslint-disable class-methods-use-this */
import { BaseConfigBuilder, ConfigBuilderCallback, ConfigBuilderCallbackArgs } from '@equinor/fusion-framework-module';

import { IPortalAppsClient, PortalAppsClient } from './portal-apps-client';
import { ContextType } from './types/portal-apps-types';

export interface PortalAppsConfiguration {
	portalConfig: PortalConfig;
	client: IPortalAppsClient;
}

export interface IPortal{
	portalAppConfig: PortalConfig;
}

type PortalConfig = {
	id?: string;
	contextTypes: ContextType[];
	env: string;
};

export class PortalAppsConfigConfigurator extends BaseConfigBuilder<PortalAppsConfiguration> {
	public setClient(client: IPortalAppsClient) {
		this._set('client', async () => client);
	}

	selPortalConfig(config_or_callback: Promise<PortalConfig> | ConfigBuilderCallback<PortalConfig>) {
		const cb = typeof config_or_callback === 'object' ? () => config_or_callback : config_or_callback;

		this._set('portalConfig', cb);
	}

	/**
	 * Create an HTTP client based on the provided parameters.
	 * @param clientId - Identifier for the client.
	 * @param init - Configuration builder callback arguments.
	 * @returns An instance of the HTTP client.
	 */
	private async _createHttpClient(clientId: string, init: ConfigBuilderCallbackArgs) {
		const http = await init.requireInstance('http');

		if (http.hasClient(clientId)) {
			return http.createClient(clientId);
		} else {
			/** load service discovery module */
			const serviceDiscovery = await init.requireInstance('serviceDiscovery');
			return await serviceDiscovery.createClient(clientId);
		}
	}

	protected override async _processConfig(
		config: Partial<PortalAppsConfiguration>,
		_init: ConfigBuilderCallbackArgs
	) {
		const httpClient = await this._createHttpClient('portal-client', _init);

		if (!config.portalConfig) {
			throw new Error('portalAppConfig is required');
		}

		if (!config.client) {
			config.client = new PortalAppsClient(httpClient, config.portalConfig.id || 'cli');
		}

		return config as PortalAppsConfiguration;
	}
}
