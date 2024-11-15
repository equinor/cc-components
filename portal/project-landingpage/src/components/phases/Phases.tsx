import { Card, Typography } from '@equinor/eds-core-react';
import { useMemo } from 'react';
import { KpiCardItem } from './KpiItem';
import styled from 'styled-components';
import { useRelationsByType, useCurrentContext } from '@equinor/fusion-portal-react-context';

const Styles = {
	Content: styled(Card.Content).withConfig({ displayName: 'phase' })`
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		gap: 1rem;
		flex-wrap: wrap;
	`,
};

import { DateObject, findActiveDate, isGetActiveDateColor, verifyDate } from './utils/date';
import { useProjectDetails } from '../project-director/hooks/use-current-director';
import { NoProjectInfoAccessMessage } from '../messages/NoProjectInfoAccessMessage';

export const Phases = () => {
	const context = useCurrentContext();
	const { relations: equinorTask, error: relationsError } = useRelationsByType('OrgChart', context?.id);
	const { data, isLoading, error } = useProjectDetails(equinorTask[0]?.externalId);

	const current = useMemo(() => findActiveDate(data?.dates.gates as DateObject), [data]);

	if (relationsError && equinorTask.length === 0) return null;

	return (
		<Card elevation="raised">
			<Card.Header>
				<Typography variant="h5">Phases</Typography>
				<Typography variant="meta">
					{verifyDate(data?.dates.startDate)} - {verifyDate(data?.dates.endDate)}
				</Typography>
			</Card.Header>

			{error ? (
				<NoProjectInfoAccessMessage />
			) : (
				<Styles.Content>
					<KpiCardItem
						{...{
							title: 'DG1',
							value: verifyDate(data?.dates.gates.dG1),
							color: isGetActiveDateColor(current, data?.dates.gates.dG1),
							subTitle: 'Concept planning',
							isLoading: isLoading,
						}}
					/>
					<KpiCardItem
						{...{
							title: 'DG2',
							value: verifyDate(data?.dates.gates.dG2),
							color: isGetActiveDateColor(current, data?.dates.gates.dG2),
							subTitle: 'Definition',
							isLoading: isLoading,
						}}
					/>
					<KpiCardItem
						{...{
							title: 'DG3',
							value: verifyDate(data?.dates.gates.dG3),
							color: isGetActiveDateColor(current, data?.dates.gates.dG3),
							subTitle: 'Execution',
							isLoading: isLoading,
						}}
					/>
					<KpiCardItem
						{...{
							title: 'DG4',
							value: verifyDate(data?.dates.gates.dG4),
							color: isGetActiveDateColor(current, data?.dates.gates.dG4),
							subTitle: 'Operation',
							isLoading: isLoading,
						}}
					/>
				</Styles.Content>
			)}
		</Card>
	);
};
