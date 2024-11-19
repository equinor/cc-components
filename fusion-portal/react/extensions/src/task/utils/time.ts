import { DateTime } from 'luxon';

export const verifyDate = (date?: string | null): string | undefined => {
	return date
		? new Date(date).toString() !== 'Invalid Date'
			? DateTime.fromJSDate(new Date(date)).toFormat('dd/MM/yyyy')
			: '-'
		: undefined;
};
