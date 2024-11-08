import { HttpResponseError, IHttpClient } from '@equinor/fusion-framework-module-http';

import { Query } from '@equinor/fusion-query';
import { catchError, Observable } from 'rxjs';
import { queryValue } from '@equinor/fusion-query/operators';
import { PortalLoadError } from './utils/portal-error';

export interface IPortalAppsClient extends Disposable {
	getAppKeysByContextId(args: { contextId: string }): Observable<string[]>;
	getAppKeys(): Observable<string[]>;
}

export class PortalAppsClient implements IPortalAppsClient {
	#appKeysQuery: Query<string[]>;

	#contextAppKeysQuery: Query<string[]>;

	constructor(httpClient: IHttpClient, private portalId: string) {
		const expire = 1 * 60 * 1000;

		this.#appKeysQuery = new Query<string[]>({
			client: {
				fn: async () => {
					if (this.portalId === 'cli') return [];

					return await httpClient.json<string[]>(`/api/portals/${this.portalId}/appkeys`);
				},
			},
			key: () => `app-keys-${this.portalId}`,
			expire,
		});

		this.#contextAppKeysQuery = new Query<string[], { contextId: string }>({
			client: {
				fn: async (args) => {
					if (this.portalId === 'cli') return [];
					return await httpClient.json<string[]>(
						`/api/portals/${this.portalId}/contexts/${args.contextId}/appkeys`
					);
				},
			},
			key: (args) => `app-keys-${this.portalId}-${args.contextId}`,
			expire,
		});
	}

	getAppKeys(): Observable<string[]> {
		return this.#appKeysQuery.query(null).pipe(
			queryValue,
			catchError((err) => {
				// Extract the cause since the error will be a `QueryError`
				const { cause } = err;

				// Handle specific errors and throw a `PortalLoadError` if applicable
				if (cause instanceof PortalLoadError) {
					throw cause;
				}
				if (cause instanceof HttpResponseError) {
					throw PortalLoadError.fromHttpResponse(cause.response, { cause });
				}
				// Throw a generic `PortalLoadError` for unknown errors
				throw new PortalLoadError('unknown', 'failed to load portal apps', {
					cause,
				});
			})
		);
	}

	getAppKeysByContextId(args: { contextId: string }): Observable<string[]> {
		return this.#contextAppKeysQuery.query(args).pipe(
			queryValue,
			catchError((err) => {
				// Extract the cause since the error will be a `QueryError`
				const { cause } = err;

				// Handle specific errors and throw a `PortalLoadError` if applicable
				if (cause instanceof PortalLoadError) {
					throw cause;
				}
				if (cause instanceof HttpResponseError) {
					throw PortalLoadError.fromHttpResponse(cause.response, { cause });
				}
				// Throw a generic `PortalLoadError` for unknown errors
				throw new PortalLoadError('unknown', 'failed to load portal apps', {
					cause,
				});
			})
		);
	}

	[Symbol.dispose]() {
		console.warn('PortalAppsClient disposed');
		this.#appKeysQuery.complete();
		this.#contextAppKeysQuery.complete();
	}
}
