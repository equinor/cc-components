import { CircularProgress, Tabs } from '@equinor/eds-core-react';
import { FC, useState } from 'react';
import styled from 'styled-components';

import { useAssignment } from './hooks/use-assignment';

import { TabNav } from './components/TaskNav';
import { TaskList } from './components/TaskList';
import { useTaskCount } from './hooks/use-task-count';

interface TasksProps {
	height?: number;
}

const Style = {
	Wrapper: styled.div`
		height: 100%;
		position: relative;
		display: flex;
		flex-direction: column;
	`,
	Header: styled.div`
		display: flex;
	`,

	TaskListWrapper: styled.div`
		flex: 2;
		overflow: hidden;
		padding-bottom: 1rem;
	`,
	CircularProgress: styled(CircularProgress)`
		padding: 4px;
	`,
};

export const Tasks: FC<TasksProps> = ({ height }) => {
	const { assignments, isLoading } = useAssignment();

	const [activeTab, setActiveTab] = useState(0);

	const handleChange = (index: number) => {
		setActiveTab(index);
	};
	const count = useTaskCount(assignments);

	return (
		<Style.Wrapper>
			<Style.Header></Style.Header>
			<Style.TaskListWrapper>
				<Tabs activeTab={activeTab} onChange={handleChange}>
					<TabNav>
						<Tabs.Tab>All ({assignments.length})</Tabs.Tab>
						<Tabs.Tab>
							Meeting Actions
							{isLoading.meetingsActions ? (
								<Style.CircularProgress size={16} />
							) : (
								<> ({count.Meetings})</>
							)}
						</Tabs.Tab>
						<Tabs.Tab>
							Review
							{isLoading.reviewActions ? <Style.CircularProgress size={16} /> : <> ({count.Review})</>}
						</Tabs.Tab>
						<Tabs.Tab>
							PIMS {isLoading.pims ? <Style.CircularProgress size={16} /> : <> ({count.PIMS})</>}
						</Tabs.Tab>
						<Tabs.Tab>
							ProCoSys
							{isLoading.procosysTasks ? <Style.CircularProgress size={16} /> : <> ({count.ProCoSys})</>}
						</Tabs.Tab>
						<Tabs.Tab>
							Query & NC Request
							{isLoading.queryAndNCRRequests ? (
								<Style.CircularProgress size={16} />
							) : (
								<> ({count['Query & NC Request']}) </>
							)}
						</Tabs.Tab>
					</TabNav>
					<Tabs.Panels>
						<Tabs.Panel>
							<TaskList
								tasks={assignments}
								height={height}
								isLoading={Object.values(isLoading).every((isLoading) => isLoading === true)}
							/>
						</Tabs.Panel>
						<Tabs.Panel>
							<TaskList
								tasks={assignments}
								source="Meetings"
								height={height}
								isLoading={isLoading.meetingsActions}
							/>
						</Tabs.Panel>
						<Tabs.Panel>
							<TaskList
								tasks={assignments}
								source="Review"
								height={height}
								isLoading={isLoading.reviewActions}
							/>
						</Tabs.Panel>
						<Tabs.Panel>
							<TaskList tasks={assignments} source="PIMS" height={height} isLoading={isLoading.pims} />
						</Tabs.Panel>
						<Tabs.Panel>
							<TaskList
								tasks={assignments}
								source="ProCoSys"
								height={height}
								isLoading={isLoading.procosysTasks}
							/>
						</Tabs.Panel>
						<Tabs.Panel>
							<TaskList
								tasks={assignments}
								source="Query & NC Request"
								height={height}
								isLoading={isLoading.queryAndNCRRequests}
							/>
						</Tabs.Panel>
					</Tabs.Panels>
				</Tabs>
			</Style.TaskListWrapper>
		</Style.Wrapper>
	);
};
