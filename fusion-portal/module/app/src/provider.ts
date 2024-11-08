import { BehaviorSubject, Observable, firstValueFrom } from 'rxjs';
import { IPortalAppsClient } from './portal-apps-client';
import { PortalAppsConfiguration } from './configurator';

export interface IPortalAppConfigProvider {
	getAppKeys(args?: { contextId?: string }): Promise<void>;
	appKeys$: Observable<string[] | undefined>;
	contextTypes: string[];
	portalId: string;
	isContextPortal: boolean;
	isCli: boolean;
}

export class PortalAppConfigProvider implements IPortalAppConfigProvider {
	#portalClient: IPortalAppsClient;

	#appKeys$ = new BehaviorSubject<string[] | undefined>(undefined);

	public contextTypes: string[] = [];
	public portalId: string;
	public isContextPortal: boolean;
	public isCli: boolean;
	public env: string = "CI"

	get appKeys$(): Observable<string[] | undefined> {
		return this.#appKeys$;
	}

	constructor(protected args: PortalAppsConfiguration) {
		this.#portalClient = args.client;
		this.isContextPortal = args.portalConfig.contextTypes.length > 0;
		this.env = args.portalConfig.env;
		this.isCli = args.portalConfig.portalId === 'cli';
		this.portalId = args.portalConfig.portalId;
		this.contextTypes = args.portalConfig.contextTypes;
	}

	public async getAppKeys(args?: { contextId?: string }) {
		if (this.isContextPortal && args?.contextId) {
			this.#appKeys$.next(
				await firstValueFrom(this.#portalClient.getAppKeysByContextId({ contextId: args.contextId }))
			);
		} else {
			this.#appKeys$.next(await firstValueFrom(this.#portalClient.getAppKeys()));
		}
	}
}
