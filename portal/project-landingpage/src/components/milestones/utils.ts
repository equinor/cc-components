import { Milestones } from './use-presence-query';

export const sortMilestones = (a: Milestones, b: Milestones) => {
	// Compare milestones
	return a.milestone.localeCompare(b.milestone);
};

export const sortByDate = (a: Milestones, b: Milestones) => {
	// Handle null values for datePlanned
	if ((a.datePlanned === null || a.datePlanned === '') && (b.datePlanned === null || b.datePlanned === '')) {
		return 0; // No change in order
	}
	if (a.datePlanned === null || a.datePlanned === '') {
		return 1; // Null values go to the bottom
	}
	if (b.datePlanned === null || b.datePlanned === '') {
		return -1; // Null values go to the bottom
	}

	const aDatePlanned = new Date(a.datePlanned);
	const bDatePlanned = new Date(b.datePlanned);

	// Compare dates
	return aDatePlanned.getTime() - bDatePlanned.getTime();
};
