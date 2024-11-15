import { IHttpClient } from '@equinor/fusion-framework-module-http';
import { Task } from '../types/task';

import { verifyDate } from '../utils/time';
import { ActionState, MeetingAction, MeetingType } from '../types/meetings-task';
import { isTaskOverdue } from './query-ncr-request-queries';

function stripHtml(html?: string) {
	const tmp = document.createElement('DIV');
	tmp.innerHTML = html || '';
	return tmp.textContent || tmp.innerText || '';
}

export async function getMyMeetingsActions(client: IHttpClient, signal?: AbortSignal): Promise<MeetingAction[]> {
	const response = await client.fetch('/persons/me/actions?api-version=4.0', { signal });

	const tasks: MeetingAction[] = await response.json();
	return tasks;
}

export function myMeetingsActionSelector(tasks: MeetingAction[]): Task[] {
	return tasks
		.filter((a) => a.state !== ActionState.Completed && a.state !== ActionState.NotCompleted)
		.map((task) => ({
			id: task.id,
			title: task.title,
			source: 'Meetings',
			description: stripHtml(task.description),
			href: `${location.origin}/apps/meetings/meeting/${task.meeting.id}/actions/${task.id}`,
			dueDate: verifyDate(task.dueDateUtc),
			isOverdue: isTaskOverdue(task.dueDateUtc),
			state: task.isArchived
				? 'Archived'
				: task.isCompleted
				? 'Completed'
				: task.isDeleted
				? 'Deleted'
				: 'Unknown',
			isExternal: false,
			project: task.meeting.project?.name,
			priority: task.priority,
		}));
}

export async function getMyReviewActions(
	client: IHttpClient,
	contextClient: IHttpClient,
	signal?: AbortSignal
): Promise<Task[]> {
	const response = await client.fetch('/persons/me/actions', { signal });

	const tasks: MeetingAction[] = await response.json();

	// Get all unique OrgChart context Ids
	const context = tasks.reduce((acc, task) => {
		if (task.contextId && !acc.includes(task.contextId)) {
			acc.push(task.contextId);
		}
		return acc;
	}, [] as string[]) as string[];

	// Resolve project master ids by OrgChart context Ids
	const contextResponse = (
		await Promise.all(
			context.map(
				async (contextId) =>
					await contextClient.json(`/contexts/${contextId}/relations?$filter=type eq ProjectMaster`, {
						signal,
					})
			)
		)
	).flat() as { id: string }[];

	//create context map OrgChart:ProjectMaster
	const map = context.reduce((acc, c, i) => {
		acc[c] = contextResponse[i].id;
		return acc;
	}, {} as Record<string, string>);
	return tasks.map((task) => ({
		id: task.id,
		title: task.title,
		source: 'Review',
		description: stripHtml(task.description),
		href: `${location.origin}/apps/reviews/${map[task.contextId || '']}/landingpage/actions/${task.id}`,
		dueDate: verifyDate(task.dueDateUtc),
		isOverdue: isTaskOverdue(task.dueDateUtc),
		state: task.state,
		project: task.meeting.project?.name,
		priority: task.priority,
	}));
}
