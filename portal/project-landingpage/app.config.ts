import { defineAppConfig } from '@equinor/fusion-framework-cli';

export default defineAppConfig(() => ({
	environment: {
		portalClient: {
			baseUri: 'https://backend-fusion-project-portal-test.radix.equinor.com',
			defaultScopes: ['api://02f3484c-cad0-4d1d-853d-3a9e604b38f3/access_as_user'],
		},
		ccApiClient: {
			baseUri: 'https://backend-fusion-data-gateway-test.radix.equinor.com',
			defaultScopes: ['api://ed6de162-dd30-4757-95eb-0ffc8d34fbe0/access_as_user'],
		}
	},
}));
