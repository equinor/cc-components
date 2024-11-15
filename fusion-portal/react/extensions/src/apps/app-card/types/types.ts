import { AppManifest as Manifest } from '@equinor/fusion-framework-module-app';

export type AppCardType = 'item' | 'card' | 'portal';

type AppCategory = {
	id: string;
	name: string;
};

export type PinnedApp = {
	id: string;
	key: string;
	name: string;
	shortName?: string;
	description?: string;
	hide: boolean;
	icon?: string;
	accentColor?: string;
	appCategory: AppCategory;
};

export type FrequentApp = {
	key: string;
	name: string;
	shortName?: string;
	description?: string;
	hide: boolean;
	icon?: string;
	accentColor?: string;
	appCategory: AppCategory;
};

export type AppManifest = Manifest & {
	isPinned: boolean;
	contextId?: string;
	contextName?: string;
	color?: string;
	url?: string;
};

export type PortalsManifest = {
	identifier: string;
	name: string;
	description?: string;
	url: string;
	icon?: string;
	accentColor?: string;
};
