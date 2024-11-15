import { Typography } from '@equinor/eds-core-react';
import { useCurrentContext } from '@equinor/fusion-portal-react-context';


import styled from 'styled-components';

export type ProjectMaster = {
	facilities: string[];
	projectCategory: string;
	cvpid: string;
	documentManagementId: string;
	phase: string;
	portfolioOrganizationalUnit: string;
} & Record<string, unknown>;

const Styles = {
	ContentItem: styled.div`
		margin-right: 1rem;
	`,
	Wrapper: styled.div`
		padding-top: 1rem;
		display: flex;
		flex-direction: row;
	`,
};

export const ProjectDetails = () => {
	const currentContext = useCurrentContext<ProjectMaster>();

	return (
		<Styles.Wrapper>
			<Styles.ContentItem>
				<Typography variant="overline">Context Type</Typography>
				<Typography>{currentContext?.type.id}</Typography>
			</Styles.ContentItem>
			<Styles.ContentItem>
				<Typography variant="overline">Category</Typography>
				<Typography>{currentContext?.value.projectCategory}</Typography>
			</Styles.ContentItem>
			<Styles.ContentItem>
				<Typography variant="overline">Phase</Typography>
				<Typography>{currentContext?.value.phase}</Typography>
			</Styles.ContentItem>
			<Styles.ContentItem>
				<Typography variant="overline">CVP ID</Typography>
				<Typography>{currentContext?.value.cvpid}</Typography>
			</Styles.ContentItem>
		</Styles.Wrapper>
	);
};
