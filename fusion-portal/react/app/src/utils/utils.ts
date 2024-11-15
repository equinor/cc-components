import { tokens } from '@equinor/eds-tokens';
import { AppCategory, AppManifest } from '@equinor/fusion-portal-module-app-config';

import { OperatorFunction, filter } from 'rxjs';

export const getColumnCount = (MAX: number, appGroup?: AppCategory[]) => {
	const count =
		appGroup?.reduce((acc, group) => {
			return acc + group.apps.length;
		}, 0) || 0;
	return Math.ceil(count / MAX);
};

export const appGroupArraySort = (a: AppCategory, b: AppCategory) => {
	if ((a.displayName || '') < (b.displayName || '')) {
		return -1;
	} else if ((a.displayName || '') > (b.displayName || '')) {
		return 1;
	} else {
		return 0;
	}
};

// Returns an array of disabled apps based on the enabled apps and favorites
export function getDisabledApps(enabledApps: AppManifest[], favorites: AppManifest[]) {
	// Extract all app keys from the enabledApps array
	const allAppKeys = enabledApps.map((app) => app.appKey);

	// Filter out the favorites that are not present in the enabledApps array
	return favorites
		.filter((favorite) => !allAppKeys.includes(favorite.appKey))
		.map(
			(disabledApp): AppManifest => ({
				...disabledApp,
				description: disabledApp.description ?? '',
				isDisabled: true,
				isPinned: true,
			})
		);
}
// Returns an array of disabled apps based on the enabled apps and favorites
export function getPinnedAppsKeys(apps: AppManifest[], favorites: AppManifest[]) {
	// Extract all app keys from the enabledApps array
	const allAppKeys = apps.map((app) => app.appKey);

	// Filter out the favorites that are not present in the enabledApps array
	return favorites.filter((favorite) => allAppKeys.includes(favorite.appKey)).map((f) => f.appKey);
}

export function getPinnedAppsGroup(enabledApps: AppManifest[], disabledApps: AppManifest[], favorites: AppManifest[]) {
	const pinnedApps = favorites.reduce(
		(acc, curr) => {
			const enabledApp =
				enabledApps.find((app) => app.appKey === curr.appKey) ??
				disabledApps.find((app) => app.appKey === curr.appKey);

			if (enabledApp) {
				return {
					...acc,
					apps: [...acc.apps, enabledApp],
				};
			}
			return acc;
		},
		{
			defaultIcon: null,
			displayName: 'Pinned Apps',
			color: tokens.colors.infographic.substitute__pink_salmon.hex,
			apps: [],
		} as AppCategory
	);

	pinnedApps.apps.sort((a, b) => (a.displayName ?? '').localeCompare(b.displayName ?? ''));

	return pinnedApps;
}

export function filterEmpty<T>(): OperatorFunction<T | null | undefined, T> {
	return filter((value): value is T => value !== undefined && value !== null);
}
