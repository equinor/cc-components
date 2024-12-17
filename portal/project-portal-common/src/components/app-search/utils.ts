import { AppManifest } from '@equinor/fusion-framework-react/app';
import defaultIcon from './defaultIcon';

export const getGreeting = () => {
	const currTime = new Date();
	const currHours = currTime.getHours();

	if (currHours >= 5 && currHours < 12) {
		return 'Good morning';
	} else if (currHours >= 12 && currHours < 17) {
		return 'Good afternoon';
	} else {
		return 'Good evening';
	}
};

export const getSearchAppIcon = (app: AppManifest): string => {
	const appIcon = app.visualization?.icon
		? app.visualization?.icon !== ''
			? app.visualization?.icon
			: app.category?.defaultIcon
		: app.category?.defaultIcon;
	const appColor = app.visualization?.color || app.category?.color || '#000000';

	const searchIconStyles = {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		width: '1.625rem',
		height: '1.625rem',
		backgroundColor: appColor + '33',
		color: appColor,
		padding: '0.375rem',
		lineHeight: '0',
		position: 'relative',
		borderRadius: '0.25rem',
	};

	const iconElement = document.createElement('div');

	Object.assign(iconElement.style, searchIconStyles);

	iconElement.innerHTML = appIcon ?? defaultIcon;

	return iconElement.outerHTML;
};
