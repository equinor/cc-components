import { Typography } from '@equinor/eds-core-react';
import styled from 'styled-components';

import { RelationsTypes, useCurrentContext, useRelationsByType } from '@equinor/fusion-portal-react-context';
import { InfoIcon } from '@equinor/fusion-portal-react-components';

const Styles = {
	Heading: styled.div`
		padding: 0.5rem 1rem;
		display: flex;
		justify-content: space-between;
	`,
	LinkWrapper: styled.span`
		display: flex;
		align-items: center;
		gap: 0.5rem;
	`,
	Nav: styled.nav`
		padding: 0 1rem;
		gap: 0.5rem;
		display: flex;
		flex-wrap: wrap;
	`,
};

export const ContextRelationNavigation = ({
	title,
	type,
	path,
}: {
	title: string;
	path: string;
	type: RelationsTypes;
}) => {
	const currentContext = useCurrentContext();

	const { relations } = useRelationsByType(type, currentContext?.id);

	if (relations.length === 0) return null;

	return (
		<div>
			<Styles.Heading>
				<Typography variant="h5">{title}</Typography>
				<InfoIcon message={`The following links, navigates to the related ${title.toLowerCase()}`} />
			</Styles.Heading>
			<Styles.Nav>
				{relations.map((item, index) => (
					<Styles.LinkWrapper key={item.id}>
						<Typography link title={item.title} href={`/${path}/${item.id}`}>
							{item.title}
						</Typography>
						{relations.length > index + 1 && <span>|</span>}
					</Styles.LinkWrapper>
				))}
			</Styles.Nav>
		</div>
	);
};
