import { AppManifest as FusionAppManifest } from '@equinor/fusion-framework-module-app';

export type AppCategory = {
	id?: string;
	displayName: string | null;
	color: string | null;
	defaultIcon: string | null;
	apps: AppManifest[];
};

export type AppManifestResponse = {
	key: string;
	contextTypes: ContextType[];
	appManifest: AppManifest;
};

export type AppManifest = FusionAppManifest & {
	isDisabled?: boolean;
	url?: string;
};

export interface AppGroup {
	name: string;
	accentColor: string;
	order: number;
	apps: AppManifest[];
}

export type ContextType = { type: string };
