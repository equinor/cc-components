export type QueryTaskResponse = {
	id: string;
	title: string;
	description?: string;
	selectedOption: {
		category: 'Positive' | 'Neutral' | 'Negative';
		displayName: string;
	};
	options: {
		category: 'Positive' | 'Neutral' | 'Negative';
		displayName: string;
	}[];
	state: string;
	assignedTo?: {
		id: string;
		name: string;
		mail: string;
		department: string;
		jobTitle: string;
		officeLocation: string;
		mobilePhone: string;
		accountType: string;
		isExpired?: boolean;
	};
	created?: string;
	dueDate?: string;
	closed?: string;
	closedBy?: {
		id: string;
		name: string;
		mail: string;
		department: string;
		jobTitle: string;
		officeLocation: string;
		mobilePhone: string;
		accountType: string;
		isExpired?: boolean;
	};
	taskGroup?: {
		id: string;
		name: string;
		query: {
			contract: {
				id: string;
				name: string;
				number: string;
				orgId: string;
				originatorName: string;
				projectMasterId?: string;
			};
			id: string;
			name: string;
			project: {
				id: string;
				projectMasterId: string;
				name: string;
				pmNumber: string;
				orgId?: string;
				contextId: string;
			};
			queryType: QueryType;
		};
		completed?: string;
		completionThreshold: number;
		tasks: Omit<QueryTaskResponse, 'tasks'>[];
	};
};

export type QueryTask = {
	id: string;
	title: string;
	state: string;
	description?: string;
	dueDate?: Date | null;
	assignedTo?: {
		id: string;
		name: string;
	};
	query?: {
		id: string;
		name: string;
		contextId: string;
		type: QueryType;
	};
	projectName?: string;
	contractName?: string;
};

export enum QueryType {
	Technical = 'Technical',
	Site = 'Site',
	Commissioning = 'Commissioning',
	Document = 'Document',
	NonConformance = 'NonConformance',
}
