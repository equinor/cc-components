import styled from 'styled-components';
import { useMemo } from 'react';
import { Message, ProgressLoader } from '@equinor/fusion-portal-react-components';
import { Task, TaskSource } from '../types/task';
import { TaskItem } from './TaskItem';
import { Typography } from '@equinor/eds-core-react';


const Style = {
	Wrapper: styled.div`
		height: 100%;
		overflow: hidden;
		position: relative;
		display: flex;
		flex-direction: column;
	`,
	List: styled.div`
		width: 100%;
		display: flex;
		flex-direction: column;
	`,
	NoContentWrapper: styled.div`
		display: flex;
		flex-direction: column;
		min-height: 300px;
		justify-content: center;
	`,
	TaskList: styled.div<{ height?: number }>`
		overflow-x: hidden;
		overflow-y: auto;
		height: ${({ height }) => (height ? `${height}px` : 'calc(100vh - 170px)')};
	`,
};

export const TaskList = ({
	source,
	tasks,
	height,
	isLoading,
}: {
	source?: TaskSource;
	tasks: Task[];
	height?: number;
	isLoading?: boolean;
}) => {
	const assignments = useMemo(() => tasks?.filter((item) => (source ? item.source === source : true)), [tasks]);

	if (isLoading) {
		return <ProgressLoader title={`Loading ${source ? source : ''} tasks.`} />;
	}

	return (
		<div style={{ display: 'contents' }}>
			<Style.TaskList height={height}>
				{assignments.length > 0 ? (
					assignments.map((item) => <TaskItem key={item.id} {...item} />)
				) : (
					<Style.NoContentWrapper>
						<Message title={`No work assigned`} type="Info" center>

								It appears you don´t have any {source ? source.toLowerCase() + ' tasks' : 'tasks'}

						</Message>
					</Style.NoContentWrapper>
				)}
			</Style.TaskList>
		</div>
	);
};
