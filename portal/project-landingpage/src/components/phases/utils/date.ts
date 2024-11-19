import { DateTime } from 'luxon';
import { tokens } from '@equinor/eds-tokens';

export const verifyDate = (date?: string | null | Date): string | undefined => {
	return date
		? new Date(date).toString() !== 'Invalid Date'
			? DateTime.fromJSDate(new Date(date)).toFormat('dd/MM/yyyy')
			: '-'
		: undefined;
};

export interface DateObject {
	dG1: Date;
	dG2: Date;
	dG3: Date;
	dG4: Date;
}

export function findActiveDate(dateObject?: DateObject): Date | undefined {
	if (!dateObject) return;

	const dG1 = new Date(dateObject.dG1);
	const dG2 = new Date(dateObject.dG2);
	const dG3 = new Date(dateObject.dG3);
	const dG4 = new Date(dateObject.dG4);

	if (isCurrentDateBetween(dG1, dG2)) {
		return dG1;
	} else if (isCurrentDateBetween(dG2, dG3)) {
		return dG2;
	} else if (isCurrentDateBetween(dG3, dG4)) {
		return dG3;
	} else {
		return dG4;
	}
}

export function isCurrentDateBetween(start: Date, end: Date): boolean {
	const currentDate = new Date();
	return currentDate >= start && currentDate <= end;
}

export function isGetActiveDateColor(currentDate?: Date | null, dGDate?: Date | null) {
	if (!currentDate || !dGDate) return;
	return verifyDate(currentDate) === verifyDate(dGDate) ? tokens.colors.interactive.success__resting.hex : undefined;
}
