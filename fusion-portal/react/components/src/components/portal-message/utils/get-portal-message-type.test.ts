import { tokens } from '@equinor/eds-tokens';
import { getPortalMessageType } from './get-portal-message-type';
import { describe, it, expect } from 'vitest';
import { error_outlined, file_description } from '@equinor/eds-icons';

describe('getPortalMessageType', () => {
	it('should return the correct values for different message types', () => {
		expect(getPortalMessageType('Error')).toEqual({
			color: tokens.colors.interactive.danger__resting.hex,
			icon: error_outlined,
		});

		expect(getPortalMessageType('Info')).toEqual({
			color: tokens.colors.interactive.primary__resting.hex,
			icon: error_outlined,
		});

		expect(getPortalMessageType('Warning')).toEqual({
			color: tokens.colors.interactive.warning__resting.hex,
			icon: error_outlined,
		});

		expect(getPortalMessageType('NoContent')).toEqual({
			color: tokens.colors.interactive.primary__resting.hex,
			icon: file_description,
		});

		expect(getPortalMessageType(undefined)).toBeUndefined();
	});

	it('should return undefined when no type is provided', () => {
		expect(getPortalMessageType()).toBeUndefined();
	});
});
