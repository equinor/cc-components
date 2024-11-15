import styled from 'styled-components';
import { tokens } from '@equinor/eds-tokens';

import { Typography } from '@equinor/eds-core-react';
import { AppSearchBar } from './AppSearchBar';

export const Styled = {
	Main: styled.main`
		z-index: 1;
		display: flex;
		align-items: flex-start;
		flex-direction: column;
		justify-content: center;
		position: relative;
		height: 110px;
		width: 100%;
		row-gap: ${tokens.spacings.comfortable.small};
	`,
	Content: styled.div`
		padding: ${tokens.spacings.comfortable.medium};
	`,

	BarContainer: styled.div`
		width: inherit;
	`,
	Position: styled.div`
		position: absolute;
		width: inherit;
	`,
};

export const AppSearch = (): JSX.Element => {
	return (
		<Styled.Main>
			<Styled.Position>
				<Styled.Content>
					<Typography group="heading" variant="h5">
						Which app are you looking for?
					</Typography>
				</Styled.Content>
				<Styled.BarContainer>
					<AppSearchBar />
				</Styled.BarContainer>
			</Styled.Position>
		</Styled.Main>
	);
};

export default AppSearch;
