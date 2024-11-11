type PersonBasePosition = {
	id: string;
	name: string;
	type: string;
	discipline: string;
};
export type PersonPosition = {
	id: string;
	name: string;
	positionExternalId: string;
	parentPositionId?: string;
	obs: string;
	project: PersonProject;
	taskOwnerIds: string[];
	basePosition: PersonBasePosition;
	positionId: string;
	appliesFrom: Date | null;
	appliesTo: Date | null;
	workload: number | null;
	isTaskOwner: boolean;
};

type PersonProject = {
	id: string;
	name: string;
	domainId: string;
	type: string;
};
type PersonContract = {
	id: string;
	name: string;
	companyId?: string;
	companyName: string;
	contractNumber: string;
	project: PersonProject;
};
type PersonRoleScope = {
	type: string;
	value?: string;
	valueType?: string;
};

export type PersonRole = {
	name: string;
	displayName: string;
	sourceSystem: string;
	type: string;
	isActive: boolean;
	activeToUtc?: string;
	onDemandSupport: boolean;
	scope: PersonRoleScope;
};

export type Role = PersonRole & {
	errorMessage?: string;
};

type PersonAccountType = 'Consultant' | 'Employee' | 'External' | 'Local';
type PersonCompany = {
	id: string;
	name: string;
};
export type PersonDetails = {
	azureUniqueId: string;
	accountClassification: string;
	name: string;
	mail: string | null;
	jobTitle: string | null;
	department: string | null;
	mobilePhone: string | null;
	officeLocation: string | null;
	upn: string;
	managerAzureUniqueId: string;
	accountType: PersonAccountType;
	company: PersonCompany;
	roles?: PersonRole[];
	contracts?: PersonContract[];
	positions?: PersonPosition[];
};
