import { IHttpClient } from '@equinor/fusion-framework-module-http';
import { PimsTask } from '../types/pims-task';
import { Task } from '../types/task';
import { verifyDate } from '../utils/time';
import { isTaskOverdue } from '../queries/query-ncr-request-queries';

export async function getPimsTasks(client: IHttpClient, signal?: AbortSignal): Promise<Task[]> {
	const response = await client.fetch('/persons/me/tasks/pims', { signal });

	const tasks: PimsTask[] = await response.json();
	return tasks.map((task) => ({
		id: task.id,
		title: task.title,
		source: 'PIMS',
		href: task.url,
		dueDate: verifyDate(task.deadlineDate),
		isOverdue: isTaskOverdue(task.deadlineDate),
		project: task.projectMaster.name,
		isExternal: true,
	}));
}
