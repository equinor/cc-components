import { useFramework } from '@equinor/fusion-framework-react';
import { useQuery } from '@tanstack/react-query';

import { OrgProject } from '@equinor/fusion-portal-react-utils';
import { useMemo } from 'react';
import { useRelationsByType } from '@equinor/fusion-portal-react-context';


export const useProjectDetails = (projectId?: string) => {
	const client = useFramework().modules.serviceDiscovery.createClient('org');

	return useQuery<OrgProject, Error>({
		queryKey: ['project ', projectId],
		queryFn: async () => {
			const response = await (await client).fetch(`projects/${projectId}`);

			if (response.status === 403) {
				const data = await response.json();
				throw new Error(data.error.message);
			}
			if (!response.ok) {
				throw Error('Error');
			}

			return await response.json();
		},
		enabled: Boolean(projectId),
		_defaulted: undefined,
	});
};

export const useCurrentDirector = (contextId?: string) => {
	const { relations: equinorTask } = useRelationsByType('OrgChart', contextId);

	const { data, isLoading, error } = useProjectDetails(equinorTask[0]?.externalId);

	const director = useMemo(() => {
		const currentDate = new Date();
		return data?.director?.instances.find((instance) => {
			const startDate = new Date(instance.appliesFrom);
			const endDate = new Date(instance.appliesTo);

			return currentDate >= startDate && currentDate <= endDate;
		});
	}, [data]);

	return { director, isLoading, error };
};
