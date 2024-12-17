import { useObservableState } from '@equinor/fusion-observable/react';
import { Observable, combineLatestWith, map } from 'rxjs';
import { useCallback, useEffect, useMemo } from 'react';


import {  AppModule } from '@equinor/fusion-framework-module-app';
import type { AppManifest, AppCategory } from '@equinor/fusion-portal-module-app-config';
import { menuFavoritesController } from '../utils/menuFavorites';
import { getDisabledApps, getPinnedAppsKeys } from '../utils';
import { usePortalApps } from './use-portal-apps';
import { useFramework } from '@equinor/fusion-framework-react-app/framework';

export const useApps = () => {
	const { apps, appCategories, isLoading } = usePortalApps();
	const { app } = useFramework<[AppModule]>().modules;

	const favorite$ = useMemo(
		() =>
			app?.getAppManifests({ filterByCurrentUser: true }).pipe(
				combineLatestWith(menuFavoritesController.favorites$),
				map(([apps, favorites]) => apps.filter((app) => favorites.includes(app.appKey)))
			),
		[apps]
	) as Observable<AppManifest[]>;

	useEffect(() => {
		const sub = menuFavoritesController.cleanFavorites();
		return () => sub.unsubscribe();
	}, []);

	const favorites = useObservableState(favorite$).value || [];

	const disabledAppKeys = useMemo(() => {
		const enabledApps = (appCategories?.map((group) => group.apps) ?? []).flat();
		return getDisabledApps(enabledApps, favorites ?? [])
			.filter((app) => app.isDisabled)
			.map((app) => app.appKey);
	}, [appCategories, favorites]);

	const isPinned = useCallback(
		(appKey: string) => {
			const enabledApps = (appCategories?.map((group) => group.apps) ?? []).flat();
			return getPinnedAppsKeys(enabledApps, favorites ?? []).includes(appKey);
		},
		[appCategories, favorites]
	);

	const isDisabled = useCallback(
		(key: string) => {
			return disabledAppKeys.includes(key);
		},
		[disabledAppKeys]
	);

	const favoritesWithDisabled =
		useMemo(() => favorites.map((p) => ({ ...p, isDisabled: isDisabled(p.appKey) })), [favorites, isDisabled]) ||
		[];

	const appGroupsWithPinned = useMemo(() => {
		return (appCategories || []).map((group) => ({
			...group,
			apps: group.apps.map((app) => ({ ...app, isPinned: isPinned(app.appKey) })),
		})) as AppCategory[];
	}, [isPinned, appCategories]);

	return {
		apps,
		appGroups: appGroupsWithPinned,
		favorites: favoritesWithDisabled,
		disabledAppKeys,
		isDisabled,
		hasFavorites: favorites?.length,
		isLoading,
		addFavorite: menuFavoritesController.onClickFavorite,
	};
};
