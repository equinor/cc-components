import { BehaviorSubject, Observable, firstValueFrom } from 'rxjs';
import { IPortalAppsClient } from './portal-apps-client';
import { PortalAppsConfiguration } from './configurator';

export interface IPortalAppConfigProvider {
	getAppKeys(args?: { contextId?: string }): Promise<void>;
	appKeys$: Observable<string[] | undefined>;
	getPortalContextTypes(): string[];
	portalId: string;
	getPortalEnv(): string;
	getIsContextPortal(): boolean;
}

export class PortalAppConfigProvider implements IPortalAppConfigProvider {
	#portalClient: IPortalAppsClient;

	#appKeys$ = new BehaviorSubject<string[] | undefined>(undefined);

	public contextTypes: string[] = [];
	public portalId: string;
	private isContextPortal: boolean;

	private env: string = "CI"

	get appKeys$(): Observable<string[] | undefined> {
		return this.#appKeys$;
	}

	public getPortalEnv() {
		return this.env;
	}

	public getPortalContextTypes() {
		return	this.contextTypes;
	}
	public getIsContextPortal() {
		return	this.isContextPortal;
	}

	constructor(protected args: PortalAppsConfiguration) {
		this.#portalClient = args.client;
		this.isContextPortal = args.portalConfig.contextTypes.length > 0;
		this.env = args.portalConfig.env;
		this.portalId = args.portalConfig.id || 'cli';
		this.contextTypes = args.portalConfig.contextTypes.map((contextType) => contextType.type);
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
