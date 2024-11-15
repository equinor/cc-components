import { CircularProgress, Typography } from '@equinor/eds-core-react';
import styled from 'styled-components';

const StyledWrapper = styled.div`
	display: flex;
	flex-direction: column;
	gap: 1rem;
	justify-content: center;
	align-items: center;
`;

type ProgressLoaderProps = {
	title: string;
	size?: 16 | 24 | 32 | 40 | 48;
};

export function ProgressLoader({ title, size }: ProgressLoaderProps) {
	return (
		<StyledWrapper>
			<CircularProgress size={size} />
			<Typography variant="h5"> {title}</Typography>
		</StyledWrapper>
	);
}
