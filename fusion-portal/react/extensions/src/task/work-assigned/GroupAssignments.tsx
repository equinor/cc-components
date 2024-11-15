import { Typography } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';
import { DateTime } from 'luxon';
import styled from 'styled-components';
import { FusionTask } from '../types/fusion-task';

const StyledRightText = styled.div`
	> p {
		text-align: right;
	}
`;

const StyledTaskItem = styled.a`
	gap: 1rem;
	display: flex;
	margin-bottom: 0.5rem;
	justify-content: space-between;
	padding: 0.5rem 0;
	border-top: 1px solid ${tokens.colors.ui.background__medium.hex};
	text-decoration: none;
	cursor: pointer;

	:hover > div > p {
		color: ${tokens.colors.interactive.focus.hex};
	}
`;

interface GroupAssignmentsProps {
	assignments: FusionTask[];
}

export const GroupAssignments = ({ assignments }: GroupAssignmentsProps) => {
	return (
		<>
			{assignments.map((assignment) => (
				<StyledTaskItem
					key={assignment.id}
					href={assignment.url}
					onClick={(e) => {
						e.preventDefault();
					}}
				>
					<div>
						<Typography>{assignment.title}</Typography>
						<Typography variant="overline">{assignment.sourceSystem.subSystem}</Typography>
					</div>
					<StyledRightText>
						<Typography variant="overline">
							{DateTime.fromJSDate(new Date(assignment.created)).toRelative()
								? DateTime.fromJSDate(new Date(assignment.created)).toRelative()
								: '-'}
						</Typography>
						<Typography variant="overline">{assignment.category}</Typography>
					</StyledRightText>
				</StyledTaskItem>
			))}
		</>
	);
};
