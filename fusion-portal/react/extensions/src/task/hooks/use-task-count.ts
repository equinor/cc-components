import { useMemo } from 'react';
import { Task, TaskSource } from '../types/task';

export const useTaskCount = (tasks: Task[]) => {
	return useMemo(() => {
		const count: Record<TaskSource, number> = {
			Meetings: 0,
			PIMS: 0,
			ProCoSys: 0,
			Review: 0,
			'Query & NC Request': 0,
		};

		tasks.forEach((a) => {
			count[a.source]++;
		});

		return count;
	}, [tasks]);
};
