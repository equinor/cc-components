import { IHttpClient } from '@equinor/fusion-framework-module-http';
import { FusionTask } from '../types/fusion-task';
import { PimsTask } from '../types/pims-task';
import { ProcosysTasks } from '../types/procosys-task';
import { Task } from '../types/task';

import { verifyDate } from '../utils/time';
import { isTaskOverdue } from './query-ncr-request-queries';

export async function getFusionTasks(client: IHttpClient, signal?: AbortSignal): Promise<Task[]> {
	const response = await client.fetch('/persons/me/tasks', { signal });
	const fusionTask: FusionTask[] = await response.json();
	return fusionTask.map((task) => ({
		id: task.id,
		title: task.title,
		description: task.body.payload,
		category: task.category,
		source: 'Meetings',
		type: task.category,
		state: task.state.toString(),
		dueDate: verifyDate(task.dueDate),
		ceratedDate: verifyDate(task.created),
		isOverdue: isTaskOverdue(task.dueDate),
	}));
}

export async function getPimsTasks(client: IHttpClient, signal?: AbortSignal): Promise<PimsTask[]> {
	const response = await client.fetch('/persons/me/tasks/pims', { signal });
	return await response.json();
}

export async function getProCoSysAssignments(client: IHttpClient, signal?: AbortSignal): Promise<Task[]> {
	const response = await client.fetch('/persons/me/tasks/procosys', { signal });

	const fusionTask: ProcosysTasks[] = (await response.json()) || [];

	return fusionTask.map((task) => ({
		id: task.id,
		title: task.todo,
		source: 'ProCoSys',
		description: task.todoDescription,
		category: task.category,
		type: task.category,
		state: task.taskTypeKey,
		isExternal: true,
		href: task.url,
		dueDate: verifyDate(task.dueDate),
		isOverdue: isTaskOverdue(task.dueDate),
		project: task.projectDescription,
	}));
}
