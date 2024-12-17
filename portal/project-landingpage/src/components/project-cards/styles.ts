import { Card } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';
import styled from 'styled-components';

export const StyledCardWrapper = styled(Card)<{ color?: string }>`
	display: flex;
	flex-direction: column;
	background-color: ${({ color }) => color};
	overflow: hidden;
`;
export const StyledCardWithBackgroundWrapper = styled(Card)<{ imageURL?: string }>`
	background-image: linear-gradient(rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 0.8)),
		url(${({ imageURL }) => imageURL || ''});
	background-repeat: no-repeat;
	background-size: cover;
	display: flex;
	flex-direction: column;

	overflow: hidden;
`;

export const StyledHeader = styled(Card.Header)`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	> :not(:first-child) {
		margin-left: 0px;
	}
`;

export const StyledContent = styled(Card.Content)`
	display: flex;
	flex-direction: row;
	gap: 2rem;
`;

export const StyledContentRow = styled.div`
	display: flex;
	justify-content: space-between;
	padding-bottom: 1rem;
	margin-left: 2rem;
`;

export const StyledContentItem = styled.div`
	flex: 1;
`;

const OPACITY_ALPHA = 'cc';

export const StyledCard = styled(Card)`
	width: 450px;
	padding: 1rem;
	background-color: ${tokens.colors.ui.background__default.hex + OPACITY_ALPHA};
`;
