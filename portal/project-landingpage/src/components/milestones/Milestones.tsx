import { Card, EdsProvider, Table, Typography } from '@equinor/eds-core-react';
import { DateTime } from 'luxon';

import { LoadingSkeleton } from './LoadingSection';
import { useMilestoneQuery } from './use-presence-query';


import { sortByDate, sortMilestones } from './utils';
import { useMemo } from 'react';
import { DataInfo } from '@equinor/project-portal-common';
import styled from 'styled-components';
import { Message } from '@equinor/fusion-portal-react-components';

function verifyDate(date?: string | null): string {
	return new Date(date || '').toString() !== 'Invalid Date'
		? DateTime.fromJSDate(new Date(date || '')).toFormat('dd LLL yyyy')
		: '-';
}

const Styled = {
	Wrapper: styled.div`
		max-height: 350px;
		overflow: auto;
		display: 'grid';
	`,
	NoWrap: styled(Table.Cell)`
		overflow: hidden;
		text-overflow: ellipsis;
	`,
	Table: styled(Table)`
		width: 100%;

		white-space: nowrap;
		min-width: fit-content;
		table-layout: fixed;
	`,
};

export const Milestones = () => {
	const { data, isLoading, error } = useMilestoneQuery();

	const milestones = useMemo(() => {
		return data?.sort(sortMilestones).sort(sortByDate) || [];
	}, [data]);

	return (
		<Card elevation="raised">
			<Card.Header>
				<Typography variant="h5">Milestones</Typography>
				<DataInfo
					title="Milestones"
					azureUniqueId="9dfcc1c8-1b9c-4b53-8325-6b2a7786dfaf"
					access="Internal"
					dataSource="ProCoSys"
				/>
			</Card.Header>
			{error ? (
				error.error.code === 'NoDataAccess' ? (
					<Message
						type="Warning"
						title={error.error.message}
						messages={
							error.error?.accessRequirements
								? error.error.accessRequirements.map((a) => `${a.code} - ${a.description}`)
								: []
						}
					></Message>
				) : error.error.exceptionType === 'NotFoundError' ? (
					<Message type="Error" title={error.title} messages={[error.detail]}></Message>
				) : (
					<Message type="Error" title={error.message}></Message>
				)
			) : (
				<Card.Content>
					<EdsProvider density="compact">
						<Styled.Wrapper>
							<Styled.Table>
								<Table.Head sticky>
									<Table.Row>
										<Table.Cell width={150}>Milestone</Table.Cell>
										<Table.Cell>Description</Table.Cell>
										<Table.Cell width={120}>Planned</Table.Cell>
										<Table.Cell width={120}>Forecast</Table.Cell>
										<Table.Cell width={120}>Actual</Table.Cell>
									</Table.Row>
								</Table.Head>
								<Table.Body>
									{isLoading ? (
										<LoadingSkeleton />
									) : milestones.length > 0 ? (
										milestones.map((milestone) => {
											const datePlanned = verifyDate(milestone.datePlanned);
											const dateForecast = verifyDate(milestone.dateForecast);
											const dateActual = verifyDate(milestone.dateActual);
											return (
												<Table.Row key={milestone.milestone}>
													<Styled.NoWrap title={milestone.milestone}>
														{milestone.milestone}
													</Styled.NoWrap>
													<Styled.NoWrap title={milestone.description}>
														{milestone.description}
													</Styled.NoWrap>
													<Table.Cell title={datePlanned}>{datePlanned}</Table.Cell>
													<Table.Cell title={dateForecast}>{dateForecast}</Table.Cell>
													<Table.Cell title={dateActual}>{dateActual}</Table.Cell>
												</Table.Row>
											);
										})
									) : (
										<Table.Row>
											<Table.Cell colSpan={5}>
												<Message
													type="NoContent"
													title="No content - There are no milestones awaitable"
												></Message>
											</Table.Cell>
										</Table.Row>
									)}
								</Table.Body>
							</Styled.Table>
						</Styled.Wrapper>
					</EdsProvider>
				</Card.Content>
			)}
		</Card>
	);
};
