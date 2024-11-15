import { Typography, Icon } from '@equinor/eds-core-react';
import { time, warning_outlined } from '@equinor/eds-icons';
import { tokens } from '@equinor/eds-tokens';
import styled from 'styled-components';
import { Task } from '../types/task';
import { useTaskCount } from '../hooks/use-task-count';

const Style = {
	KpiWrapper: styled.div`
		display: flex;
		width: 100%;
	`,
	KpiItem: styled.div`
		flex: 1;
		width: 50px;
	`,

	Kpi: styled.div`
		display: flex;
		flex-direction: row;
		gap: 0.5rem;
	`,
	Title: styled(Typography)`
		color: ${tokens.colors.text.static_icons__tertiary.hex};
		font-size: 12px;
		line-height: 16px;
	`,
};

export const TaskKPI = ({ tasks }: { tasks: Task[] }) => {
	const counts = useTaskCount(tasks);
	return (
		<Style.KpiWrapper>
			<Style.KpiItem>
				<Style.Kpi>
					<Typography variant="h5">{tasks.length}</Typography>
					<Icon data={time} />
				</Style.Kpi>
				<Style.Title>All pending tasks</Style.Title>
			</Style.KpiItem>

			<Style.KpiItem>
				<Style.Kpi>
					<Typography variant="h5">{counts.Meetings}</Typography>
					<Icon data={warning_outlined} />
				</Style.Kpi>
				<Style.Title>Meetings</Style.Title>
			</Style.KpiItem>
			<Style.KpiItem>
				<Style.Kpi>
					<Typography variant="h5">{counts.Review}</Typography>
					<Icon data={warning_outlined} />
				</Style.Kpi>
				<Style.Title>Reviews</Style.Title>
			</Style.KpiItem>
			<Style.KpiItem>
				<Style.Kpi>
					<Typography variant="h5">{counts.PIMS}</Typography>
					<Icon data={warning_outlined} />
				</Style.Kpi>
				<Style.Title>PIMS</Style.Title>
			</Style.KpiItem>
			<Style.KpiItem>
				<Style.Kpi>
					<Typography variant="h5">{counts.ProCoSys}</Typography>
					<Icon data={warning_outlined} />
				</Style.Kpi>
				<Style.Title>ProCoSys</Style.Title>
			</Style.KpiItem>
			<Style.KpiItem>
				<Style.Kpi>
					<Typography variant="h5">{counts['Query & NC Request']}</Typography>
					<Icon data={warning_outlined} />
				</Style.Kpi>
				<Style.Title>Query & NC Request</Style.Title>
			</Style.KpiItem>
		</Style.KpiWrapper>
	);
};
