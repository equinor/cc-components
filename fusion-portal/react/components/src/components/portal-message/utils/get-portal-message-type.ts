import { tokens } from '@equinor/eds-tokens';
import { PortalMessageType } from '../types/types';
import { error_outlined, file_description } from '@equinor/eds-icons';

export const getPortalMessageType = (type?: PortalMessageType) => {
	switch (type) {
		case 'Error':
			return { color: tokens.colors.interactive.danger__resting.hex, icon: error_outlined };
		case 'Info':
			return { color: tokens.colors.interactive.primary__resting.hex, icon: error_outlined };
		case 'Warning':
			return { color: tokens.colors.interactive.warning__resting.hex, icon: error_outlined };
		case 'NoContent':
			return { color: tokens.colors.interactive.primary__resting.hex, icon: file_description };
		default:
			return undefined;
	}
};
