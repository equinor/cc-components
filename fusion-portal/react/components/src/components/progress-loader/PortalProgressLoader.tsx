import { StarProgress, Typography } from '@equinor/eds-core-react';
import styled from 'styled-components';

const StyledWrapper = styled.div`
	display: flex;
	flex-direction: column;
	gap: 1rem;
	justify-content: center;
	align-items: center;
	height: 85vh;
`;

const StyledProgress = styled(StarProgress)`
	height: auto;
	width: 85px;
`;

type ProgressLoaderProps = {
	title: string;
};

export function PortalProgressLoader({ title }: ProgressLoaderProps) {
	return (
		<StyledWrapper>
			<StyledProgress />
			<Typography variant="h5"> {title}</Typography>
		</StyledWrapper>
	);
}
