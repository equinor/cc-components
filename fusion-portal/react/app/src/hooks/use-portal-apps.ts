import { useObservableState } from '@equinor/fusion-observable/react';
import { useEffect, useMemo } from 'react';
import { combineLatestWith, map } from 'rxjs';
import { AppModule } from '@equinor/fusion-framework-module-app';
import { PortalAppConfig } from '@equinor/fusion-portal-module-app';
import { useAppModule } from '@equinor/fusion-framework-react-app';
import { appsToAppCategory } from '../utils/appsToAppCategory';

import { useFramework } from '@equinor/fusion-framework-react-app/framework';

export const usePortalApps = () => {
	const { app, context } = useFramework<[PortalAppConfig, AppModule]>().modules;
	const portalConfig = useAppModule<PortalAppConfig>('portalAppConfig');

	if (!portalConfig) {
		const error = new Error('PortalApps module is required');
		error.name = 'PortalApps Module is Missing';
		throw error;
	}

	useEffect(() => {
		if (!portalConfig.isContextPortal) {
			portalConfig.getAppKeys();
		}

		const sub = context.currentContext$.subscribe((context) => {
			portalConfig.isContextPortal && portalConfig.getAppKeys({ contextId: context?.id });
		});

		return () => sub.unsubscribe();
	}, [portalConfig, context]);

	const {
		value: apps,
		error,
		complete,
	} = useObservableState(
		useMemo(
			() =>
				portalConfig.appKeys$.pipe(
					combineLatestWith(app.getAppManifests({ filterByCurrentUser: true })),
					map(([filter, appManifests]) =>
						appManifests?.filter((app) => (portalConfig.isCli ? true : filter?.includes(app.appKey)))
					)
				),
			[portalConfig, app]
		)
	);

	// Organize apps into categories using memoized the result
	const appCategories = useMemo(() => {
		return appsToAppCategory(apps);
	}, [apps]);

	return {
		apps,
		appCategories,
		error,
		isLoading: !complete && !apps,
	};
};
