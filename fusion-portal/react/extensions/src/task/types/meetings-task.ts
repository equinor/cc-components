export type MeetingType = 'GeneralMeeting' | 'GeneralSeries' | 'ReviewMeeting';

export enum ActionState {
	New = 'New',
	Active = 'Active',
	OnHold = 'OnHold',
	Deferred = 'Deferred',
	NotCompleted = 'NotCompleted',
	ReadyForCloseOut = 'ReadyForCloseOut',
	Completed = 'Completed',
}

export type MeetingActionPriority = 'Normal' | 'Low' | 'High' | 'Critical';

type ActionMeeting = {
	id: string;
	isDisabled: boolean;
	plannedDateUtc: string;
	title: string;
	project?: {
		name?: string;
	};
};

export type MeetingPerson = {
	id: string;
	name: string;
	jobTitle: string;
	department: string;
	mail: string;
};
export type MeetingAction = {
	id: string;
	title: string;
	description: string;
	category: string;
	meetingType: MeetingType;
	completedReason: string | null;
	state: ActionState;
	meeting: ActionMeeting;
	priority: MeetingActionPriority;
	percentStatus?: number;
	lastModifiedUtc?: string;
	createdBy: MeetingPerson;
	completedBy: MeetingPerson | null;
	dueDateUtc?: string;
	isCompleted: boolean;
	projectId?: string;

	contextId?: string;
	isDeleted: boolean;
	isArchived: boolean;
};
