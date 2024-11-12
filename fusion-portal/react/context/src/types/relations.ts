 
 
/* eslint-disable @typescript-eslint/no-explicit-any */

export type RelationsTypes =
	| 'EquinorTask'
	| 'Contract'
	| 'ProjectMaster'
	| 'PimsDomain'
	| 'Project'
	| 'OrgChart'
	| 'Facility';

export type RelationReturnType<T extends RelationsTypes> = T extends 'ProjectMaster'
	? Relations<ProjectMaster>
	: T extends 'Facility'
	? Relations<Facility>
	: T extends 'OrgChart'
	? Relations<OrgChart>
	: T extends 'EquinorTask'
	? Relations<EquinorTask>
	: T extends 'Contract'
	? Relations<Contract>
	: T extends 'Project'
	? Relations
	: T extends 'PimsDomain'
	? Relations<PimsDomain>
	: Relations;

export interface Relations<T = unknown> {
	relationSource: string;
	relationType?: any;
	id: string;
	externalId: string;
	source?: any;
	type: Type;
	value: T extends object ? T : Value;
	title: string;
	isActive: boolean;
	isDeleted: boolean;
	created: string;
	updated?: string;
}

export type ProjectMaster = {
	facilities: string[];
	projectCategory: string;
	cvpid: string;
	documentManagementId: string;
	phase: string;
	portfolioOrganizationalUnit: string;
} & Record<string, unknown>;

interface Value {
	identity?: string;
	sapPlant?: string;
	schema?: string;
	subFacilities?: string[];
	parentFacility?: any;
	contractNumber?: string;
	companyName?: string;
	startDate?: string;
	endDate?: string;
	projectMasterId?: string;
	isValid?: boolean;
	taskName?: string;
	taskType?: string;
	taskState?: string;
	orgChartId?: string;
	orgUnitSapId?: string;
	orgUnitShortName?: string;
	orgUnitName?: string;
	orgUnitDepartment?: string;
	orgUnitFullDepartment?: string;
	orgUnitType?: string;
	domainId?: string;
	dgPhase?: string;
	siteCode?: string;
	projectIdentifier?: string;
	wbs?: string;
}

export interface Contract {
	contractNumber?: number;
	companyName?: string;
	startDate?: string;
	endDate?: string;
	projectMasterId?: string;
	isValid: boolean;
}

export interface Facility {
	identity: string;
	sapPlant: string;
	schema: string;
	subFacilities?: string[];
	parentFacility?: string[];
}

export interface OrgChart {
	orgChartId?: string;
	domainId?: string;
	dgPhase?: string;
}

interface EquinorTask {
	taskName?: string;
	taskType?: string;
	taskState?: string;
	orgChartId?: string;
	orgUnitSapId?: string;
	orgUnitShortName?: string;
	orgUnitName?: string;
	orgUnitDepartment?: string;
	orgUnitFullDepartment?: string;
	orgUnitType?: string;
	projectMasterId?: string;
}

interface PDP {
	siteCode: string;
	projectIdentifier: string;
}

interface PimsDomain {
	domainId?: string;
	projectMasterId?: string;
}

interface Type {
	id: string;
	isChildType: boolean;
	parentTypeIds: string[];
}
