import { useObservableState } from '@equinor/fusion-observable/react';
import { useEffect, useMemo } from 'react';
import { combineLatestWith, map } from 'rxjs';
import { AppModule } from '@equinor/fusion-framework-module-app';
import { PortalAppConfig } from '@equinor/fusion-portal-module-app-config';
import {  useAppModules } from '@equinor/fusion-framework-react-app';
import { appsToAppCategory } from '../utils/appsToAppCategory';
import {ContextModule} from "@equinor/fusion-framework-module-context"
import { useFramework } from '@equinor/fusion-framework-react-app/framework';



export const usePortalApps = () => {
	const { app } = useFramework<[ AppModule]>().modules;
	const { context, portalAppConfig } = useAppModules<[PortalAppConfig,  ContextModule]>();


	if (!portalAppConfig) {
		const error = new Error('PortalApps module is required');
		error.name = 'PortalApps Module is Missing';
		throw error;
	}

	useEffect(() => {
		if (!portalAppConfig.getIsContextPortal()) {
			portalAppConfig.getAppKeys();
		}

		const sub = context.currentContext$.subscribe((context) => {
			portalAppConfig.getIsContextPortal() && portalAppConfig.getAppKeys({ contextId: context?.id });
		});

		return () => sub.unsubscribe();
	}, [portalAppConfig, context]);

	const {
		value: apps,
		error,
		complete,
	} = useObservableState(
		useMemo(
			() =>
				portalAppConfig.appKeys$.pipe(
					combineLatestWith(app.getAppManifests({ filterByCurrentUser: true })),
					map(([filter, appManifests]) =>
						appManifests?.filter((app) => (portalAppConfig.portalId === "cli" ? true : filter?.includes(app.appKey)))
					)
				),
			[portalAppConfig, app]
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
