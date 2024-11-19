import { Icon, Typography } from '@equinor/eds-core-react';

import styled from 'styled-components';

import { IconData } from '@equinor/eds-icons';
import { tokens } from '@equinor/eds-tokens';
import { PropsWithChildren } from 'react';
import { ContextItem } from '@equinor/fusion-framework-module-context';
import { getBackgroundURL, getGreeting } from '../../utils';

import { useCurrentContext } from '@equinor/fusion-portal-react-context';
import { useCurrentUserInfo } from '@equinor/fusion-portal-react-utils';

export const StyledBackgroundWrapper = styled.section<{ imageurl?: string }>`
	background-image: linear-gradient(rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 0.8)),
		url(${({ imageurl }) => imageurl || ''});
	width: 100%;
	height: 180px;
	background-repeat: no-repeat;
	background-size: cover;
	display: flex;
	flex-direction: column;

	overflow: hidden;
`;


const Styles = {
	Wrapper: styled.div`
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		> :not(:first-child) {
			margin-left: 0px;
		}
		margin: 2rem;
	`,
	Header: styled.div`
		display: flex;
		gap: 0.5rem;
		align-items: center;
	`,
};



export function PageHeader<T extends Record<string, unknown>>({
	children,
	icon,
	contextImageResolver,
}: PropsWithChildren<{ icon: IconData; contextImageResolver: (context?: ContextItem<T>) => string }>) {
	const currentContext = useCurrentContext<T>();
	const { currentUserInfo } = useCurrentUserInfo();

	return (
		<StyledBackgroundWrapper imageurl={getBackgroundURL(contextImageResolver(currentContext))}>
			<Styles.Wrapper>
				<span>
					<Styles.Header>
						<Icon size={48} data={icon} color={tokens.colors.text.static_icons__default.hex} />
						<Typography variant="h1">{currentContext?.title}</Typography>
					</Styles.Header>
					<Typography variant="h6">
						{getGreeting()} {currentUserInfo?.name}
					</Typography>
				</span>
				{children}
			</Styles.Wrapper>
		</StyledBackgroundWrapper>
	);
}
