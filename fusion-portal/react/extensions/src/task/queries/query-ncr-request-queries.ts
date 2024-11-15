import { IHttpClient } from '@equinor/fusion-framework-module-http';
import { Task } from '../types/task';
import { QueryTaskResponse } from '../types/ query-task';
import { verifyDate } from '../utils/time';

export async function getQueryAndNCRequest(client: IHttpClient, signal?: AbortSignal): Promise<Task[]> {
	const response = await client.fetch('/persons/me/tasks', { signal });
	const tasks: QueryTaskResponse[] = await response.json();

	return tasks.map((task) => ({
		id: task.id,
		title: task.title || 'Task with no title',
		description: task.taskGroup?.query.name,
		state: task.state,
		type: task.taskGroup?.query.queryType,
		source: 'Query & NC Request',
		dueDate: verifyDate(task.dueDate),
		isExternal: false,
		href: [
			'/apps/query',
			task.taskGroup?.query.project.contextId || '',
			task.taskGroup?.query.queryType.toLowerCase(),
			task.taskGroup?.query.id,
		].join('/'),
		isOverdue: isTaskOverdue(task.dueDate),
		project: task.taskGroup?.query.project.name,
	}));
}

export const isTaskOverdue = (dueDate?: string | Date | null | undefined): boolean | undefined => {
	if (!dueDate) return;

	if (typeof dueDate === 'string') {
		dueDate = new Date(dueDate);
	}

	return !!(
		!isMinDateTimeOffset(dueDate) &&
		new Date(dueDate.getFullYear(), dueDate.getMonth(), dueDate.getDate()) < new Date()
	);
};

export const isMinDateTimeOffset = (dueDate: Date | null | undefined): boolean =>
	new Date('0001-01-01T00:00:00+00:00').getTime() == dueDate?.getTime();
