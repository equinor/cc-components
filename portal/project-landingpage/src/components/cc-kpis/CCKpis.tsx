import { Card, Icon, Typography } from '@equinor/eds-core-react';
import { IconData } from '@equinor/eds-icons';
import { tokens } from '@equinor/eds-tokens';
import { useHttpClient } from '@equinor/fusion-framework-react-app/http';
import { Message } from '@equinor/fusion-portal-react-components';
import { useCurrentContext } from '@equinor/fusion-portal-react-context';
import Skeleton from '@equinor/fusion-react-skeleton';


import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

export interface StatusItem {
	/** Title to be shown above the value */
	title: string;
	/** Value to be shown in the status bar */
	value: string | number;
	description?: string;
}

export const useAppKpi = (appKey: string, contextId?: string) => {
	const client = useHttpClient('cc-api');

	return useQuery<StatusItem[], Error>({
		queryKey: ['project-kpi ', appKey, contextId],
		refetchInterval: 8000 * 60,
		staleTime: 8000 * 60,
		queryFn: async ({ signal }) => {
			const res = await client.fetch(`/api/contexts/${contextId}/${appKey}/kpis`, {
				method: 'POST',
				body: JSON.stringify({
					filter: {
						groups: [],
						search: '',
					},
				}),
				signal,
				headers: {
					['content-type']: 'application/json',
				},
			});

			const data = await res.json();

			if (res.status === 403) {
				const error = Error("You don't have access to see project data.");
				throw error;
			}

			if (!res.ok) {
				const error = Error(data.detail);
				error.name = data.title;
				throw error;
			}

			return data?.map((s: StatusItem & { name: string }) => ({ ...s, title: s.name })) || [];
		},
		enabled: Boolean(contextId),
	});
};

const Styles = {
	Card: styled(Card)`
		padding-top: 1rem;
		padding-left: 50px;
		overflow: hidden;
	`,
	Content: styled(Card.Content)`
		display: flex;
		gap: 1.5rem;
		flex-wrap: wrap;
	`,
	Visual: styled.span<{ color: string }>`
		background-color: ${({ color }) => color + '33'};
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		position: absolute;
		left: 0;
		width: 50px;
		top: 0;
	`,
};

export const CCKpis = ({
	appKey,
	valueKey,
	title,
	visual,
}: {
	appKey: string;
	valueKey: string;
	title: string;
	visual: {
		icon: IconData;
		color: string;
	};
}) => {
	const context = useCurrentContext();

	const { data, error, isLoading } = useAppKpi(valueKey, context?.id);

	return (
		<Styles.Card elevation="raised">
			<Styles.Visual color={visual.color}>
				<Icon data={visual.icon} color={visual.color} />
			</Styles.Visual>

			<Card.Header>
				<Typography variant="h6">{title}</Typography>
				<Link to={`/apps/${appKey}/`} id={`${appKey}-button`}>
					<Typography variant="overline" color={tokens.colors.interactive.primary__resting.hex}>
						View in {title.toLowerCase()}
					</Typography>
				</Link>
			</Card.Header>
			{error && <Message title={error?.message} type="Warning" />}
			{isLoading && (
				<Styles.Content>
					{[1, 2, 3, 4, 5].map((i) => (
						<Skeleton key={i} size="xSmall" height="24px" variant="text" />
					))}
				</Styles.Content>
			)}
			{data && (
				<Styles.Content>
					{data.map((kpi) => (
						<div key={`${appKey}-${kpi.title}-${kpi.value}`} title={kpi.description}>
							<Typography variant="meta" color={tokens.colors.text.static_icons__tertiary.hex}>
								{kpi.title}
							</Typography>
							<Typography variant="h4">{kpi.value}</Typography>
						</div>
					))}
				</Styles.Content>
			)}
		</Styles.Card>
	);
};
