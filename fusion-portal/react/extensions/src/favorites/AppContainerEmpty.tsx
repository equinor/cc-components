import styled from 'styled-components';
import { tokens } from '@equinor/eds-tokens';
import { Typography } from '@equinor/eds-core-react';
import { PropsWithChildren } from 'react';

const emptyFrameHeight = '14.75rem';

const Styled = {
	EmptyFrame: styled.div`
		border: 1px dashed ${tokens.colors.ui.background__medium.hex};
		border-radius: 0.25rem;
		width: 100%;
		height: ${emptyFrameHeight};
		padding: ${tokens.spacings.comfortable.medium};
		display: flex;
		align-items: center;
		justify-content: center;
	`,
	FrameContent: styled(Typography)`
		color: ${tokens.colors.text.static_icons__tertiary.hex};
		text-align: center;
	`,
};

export const AppContainerEmpty = ({ children }: PropsWithChildren): JSX.Element => {
	return (
		<Styled.EmptyFrame>
			<Styled.FrameContent group="paragraph" variant="body_short">
				{children}
			</Styled.FrameContent>
		</Styled.EmptyFrame>
	);
};
