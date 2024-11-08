import { AppCategory, AppManifest } from "@equinor/fusion-portal-module-app";


export const appsToAppCategory = (apps?: AppManifest[]): AppCategory[] => {
	if (!apps) {
		return [];
	}
	return apps.reduce((appCategories, appManifest) => {
		if (!appManifest.category?.id) {
			const category = appCategories.find((category) => category.id === 'undefined');

			if (category) {
				category.apps.push(appManifest);
			} else {
				appCategories.push({
					id: 'undefined',
					displayName: 'Unknown',
					color: null,
					defaultIcon: null,
					apps: [appManifest],
				});
			}

			return appCategories;
		}
		const category = appCategories.find((category) => appManifest.category?.id === category.id);
		if (category) {
			category.apps.push(appManifest);
			return appCategories;
		}

		if (appManifest.category) {
			appCategories.push({
				...appManifest.category,
				apps: [appManifest],
			});
		}

		return appCategories;
	}, [] as AppCategory[]);
};
