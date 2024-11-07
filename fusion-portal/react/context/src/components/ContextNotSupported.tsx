import { Icon, Typography } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';
import styled from 'styled-components';
import { error_outlined } from '@equinor/eds-icons';

const Styles = {
	Wrapper: styled.div`
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1rem;
		justify-content: center;
	`,
	Content: styled.div`
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.5rem;
		justify-content: center;
	`,
};

export function ContextNotSupported(props: { contexts: string[] }) {
	return (
		<Styles.Wrapper>
			<Icon
				data-testid="icon"
				size={40}
				color={tokens.colors.text.static_icons__tertiary.hex}
				data={error_outlined}
			/>
			<Styles.Content>
				<Typography
					color={tokens.colors.text.static_icons__default.hex}
					variant={'h3'}
					aria-label={`No Context message`}
				>
					Context not supported
				</Typography>

				<Typography>
					Place select a context of type {props.contexts.join('or ')} for this page to work.
				</Typography>
			</Styles.Content>
		</Styles.Wrapper>
	);
}
