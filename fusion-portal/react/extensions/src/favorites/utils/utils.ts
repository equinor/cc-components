import { AppManifest } from '@equinor/fusion-framework-app';

export const sortByCategoryAndIsDisabled = (favorites: (AppManifest & { isDisabled: boolean })[]) => {
	return favorites
		.sort((a, b) => {
			// Sort Disabled apps to bottom
			return (a.category?.displayName || '') > (b.category?.displayName || '') ? -1 : 1;
		})
		.sort((a) => {
			// Sort Disabled apps to bottom
			return a.isDisabled ? 1 : -1;
		});
};
