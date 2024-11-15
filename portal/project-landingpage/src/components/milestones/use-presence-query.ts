import { IHttpClient } from '@equinor/fusion-framework-module-http';
import { useFramework } from '@equinor/fusion-framework-react';
import { useQuery } from '@tanstack/react-query';


export type Milestones = {
	siteCodes: string[];
	projectIdentifier: string;
	milestone: string;
	description: string;
	datePlanned: string | null;
	dateForecast: string | null;
	dateActual: string | null;
	contractMilestone: string;
};

type MilestoneError = {
	error: {
		message: string;
		code: string;
		exceptionType?: string;
		accessRequirements: {
			code: string;
			description: string;
		}[];
	};
	title: string;
	detail: string;
	message: string;
};

export async function getMilestones(
	client: IHttpClient,
	contextId?: string,
	signal?: AbortSignal
): Promise<Milestones[] | undefined> {
	if (!contextId) return;

	const res = await client.fetch(`/api/contexts/${contextId}/milestones`, { signal });

	if (res.status === 403) {
		const error = (await res.json()) as MilestoneError;
		throw error;
	}
	if (res.status === 404) {
		const error = (await res.json()) as MilestoneError;
		throw error;
	}

	const data = (await res.json()) as Milestones[];
	if (res.status === 400 && (data as unknown as { detail: string }).detail.includes('Forbidden')) {
		throw new Error('No access');
	}

	if (res.status === 424 && (data as unknown as { detail: string }).detail.includes('Forbidden')) {
		throw new Error('No access');
	}

	if (!res.ok) throw new Error('Unknown Error');

	return data;
}

export const useMilestoneQuery = () => {
	const client = useFramework().modules.serviceDiscovery.createClient('data-proxy');
	const { currentContext } = useFramework().modules.context;
	const contextId = currentContext?.id;

	return useQuery<Milestones[] | undefined, MilestoneError, Milestones[]>({
		queryKey: ['milestones', contextId],
		queryFn: async ({ signal }) => getMilestones(await client, contextId, signal),
		enabled: Boolean(contextId),
	});
};
