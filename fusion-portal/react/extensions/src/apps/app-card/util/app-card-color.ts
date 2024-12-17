import { tokens } from '@equinor/eds-tokens';
import { AppManifest } from '@equinor/fusion-portal-module-app-config';

export const getAppCardColor = (app: Partial<AppManifest>) => {
	const appColor = app.isDisabled
		? tokens.colors.interactive.disabled__text.hex
		: app.category?.color || tokens.colors.interactive.primary__resting.hex;
	const appColors = {
		['--app-color' as PropertyKey]: appColor,
		['--app-color-skeleton' as PropertyKey]: appColor + '33',
	};
	return appColors;
};
