import Position from './Position';
import OrgProjectDates from './OrgProjectDates';
import OrgProjectDescription from './OrgProjectDescription';
import OrgProjectLink from './OrgProjectLink';

type OrgProjectProperties = {
	pimsWriteSyncEnabled?: boolean;
	disableSync?: boolean;
	orgAdminEnabled?: boolean;
	resourceOwnerRequestsEnabled?: boolean;
};

export type OrgProject = {
	dates: OrgProjectDates;
	director: Position;
	directorPositionId: string;
	domainId: string;
	name: string;
	projectId: string;
	projectType: string;
	properties: OrgProjectProperties | null;
	description?: OrgProjectDescription;
	links?: OrgProjectLink[];
	lineOrganisation?: {
		task: {
			id: string;
			name: string;
		};
		orgUnit: {
			sapId: string;
			name: string;
			fullDepartment: string;
		};
	};
};
