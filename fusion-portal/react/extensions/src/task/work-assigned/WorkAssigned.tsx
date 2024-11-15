import { Card, Typography } from '@equinor/eds-core-react';
import styled from 'styled-components';
import { Tasks } from '../Tasks';
import { useDivHeight } from '../hooks/use-client-width';

const StyledCard = styled(Card)`
	display: block;
`;

const Styles = {
	Content: styled(Card.Content)`
		display: block;
		overflow: hidden;
		width: auto;
	`,
};
export const WorkAssigned = () => {
	const { ref, divHeight } = useDivHeight();
	return (
		<StyledCard ref={ref} elevation="raised">
			<Card.Header>
				<Typography variant="h5">My Work Assigned</Typography>
			</Card.Header>
			<Styles.Content>
				<Tasks height={divHeight - 500} />
			</Styles.Content>
		</StyledCard>
	);
};
