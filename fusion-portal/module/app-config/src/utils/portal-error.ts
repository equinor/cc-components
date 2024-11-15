type PortalErrorType = 'not_found' | 'unauthorized' | 'unknown';

export class PortalLoadError extends Error {
	static fromHttpResponse(response: Response, options?: ErrorOptions) {
		switch (response.status) {
			case 401:
				return new PortalLoadError('unauthorized', 'failed to load portal, request not authorized', options);
			case 404:
				return new PortalLoadError('not_found', 'portal not found', options);
			default:
				return new PortalLoadError('unknown', `failed to load portal, status code ${response.status}`, options);
		}
	}

	constructor(public readonly type: PortalErrorType, message?: string, options?: ErrorOptions) {
		super(message, options);
		this.name = 'PortalLoadError';
	}
}
