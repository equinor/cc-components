import { useFramework } from '@equinor/fusion-framework-react-app/framework';
import { useQuery } from '@tanstack/react-query';
import { getPimsTasks } from '../work-assigned/assignment-queries';
import { getMyMeetingsActions, getMyReviewActions, myMeetingsActionSelector } from '../queries/fusion-meetings-queries';
import { getQueryAndNCRequest } from '../queries/query-ncr-request-queries';
import { Task } from '../types/task';
import { getFusionTasks, getProCoSysAssignments } from '../queries/fusion-task-queries';
import { useAppModule } from '@equinor/fusion-framework-react-app';

export const sortByDate = (a: Task, b: Task) => {
	if (a.isOverdue) {
		return -1;
	}

	// Handle null values for datePlanned
	if ((a.dueDate === undefined || a.dueDate === '') && (b.dueDate === undefined || b.dueDate === '')) {
		return 0; // No change in order
	}
	if (a.dueDate === undefined || a.dueDate === '') {
		return 1; // Null values go to the bottom
	}
	if (b.dueDate === undefined || b.dueDate === '') {
		return -1; // Null values go to the bottom
	}

	const aDateDue = new Date(a.dueDate);
	const bDateDue = new Date(b.dueDate);

	// Compare dates
	return aDateDue.getTime() - bDateDue.getTime();
};

export function useAssignment() {
	// const { data: fusionAssignments } = useAssignmentQuery();
	const { data: procosysTasks, isLoading: procosysTasksLoading } = useProCoSysTaskQuery();
	const { data: pimsTask, isLoading: pimsTaskLoading } = usePimsTaskQuery();

	const { data: meetingsActions, isLoading: meetingsActionsLoading } = useMeetingsActionsQuery();
	const { data: reviewActions, isLoading: reviewActionsLoading } = useReviewActionsQuery();

	const { data: queryAndNCRRequests, isLoading: queryAndNCRRequestsLoading } = useQueryAndNCRRequestQuery();

	return {
		assignments: [
			...(procosysTasks || []),
			...(reviewActions || []),
			...(meetingsActions || []),
			...(queryAndNCRRequests || []),
			...(pimsTask || []),
		].sort(sortByDate) as Task[],
		isLoading: {
			procosysTasks: procosysTasksLoading,
			meetingsActions: meetingsActionsLoading,
			reviewActions: reviewActionsLoading,
			queryAndNCRRequests: queryAndNCRRequestsLoading,
			pims: pimsTaskLoading,
		},
	};
}

export function useAssignmentQuery() {
	const client = useFramework().modules.serviceDiscovery.createClient('fusion-tasks');
	return useQuery({
		queryKey: ['Assignment', 'Fusion'],
		queryFn: async ({ signal }) => getFusionTasks(await client, signal),

		refetchInterval: 5000 * 60,
		staleTime: 2000 * 60,
	});
}

export function useProCoSysTaskQuery() {
	const client = useFramework().modules.serviceDiscovery.createClient('fusion-tasks');
	return useQuery({
		queryKey: ['Assignment', 'ProCoSys'],
		queryFn: async ({ signal }) => getProCoSysAssignments(await client, signal),

		refetchInterval: 5000 * 60,
		staleTime: 2000 * 60,
	});
}

export function usePimsTaskQuery() {
	const client = useFramework().modules.serviceDiscovery.createClient('fusion-tasks');
	return useQuery({
		queryKey: ['Assignment', 'Pims'],
		queryFn: async ({ signal }) => getPimsTasks(await client, signal),

		refetchInterval: 5000 * 60,
		staleTime: 2000 * 60,
	});
}

export function useMeetingsActionsQuery() {
	const client = useFramework().modules.serviceDiscovery.createClient('meeting');
	return useQuery({
		queryKey: ['Assignment', 'Meetings', 'Meetings-Actions'],
		queryFn: async ({ signal }) => getMyMeetingsActions(await client, signal),
		select: myMeetingsActionSelector,

		refetchInterval: 5000 * 60,
		staleTime: 2000 * 60,
	});
}
export function useReviewActionsQuery() {
	// todo: use the correct client / configure client
	const client = useAppModule('http').createClient('review');
	const contextClient = useFramework().modules.serviceDiscovery.createClient('context');
	return useQuery({
		queryKey: ['Assignment', 'Review', 'Review-Actions'],
		queryFn: async ({ signal }) => getMyReviewActions(await client, await contextClient, signal),

		refetchInterval: 5000 * 60,
		staleTime: 2000 * 60,
	});
}
export function useQueryAndNCRRequestQuery() {
	const client = useAppModule('http').createClient('query_api');
	return useQuery({
		queryKey: ['Assignment', 'Query', 'Query-Actions'],
		queryFn: async ({ signal }) => getQueryAndNCRequest(await client, signal),

		refetchInterval: 5000 * 60,
		staleTime: 2000 * 60,
	});
}
