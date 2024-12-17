import { HTMLAttributeAnchorTarget } from 'react';
import { Skeleton, SkeletonSize, SkeletonVariant } from '@equinor/fusion-react-skeleton';
import styled from 'styled-components';
import { Styled as FavoriteStyled } from './FavoriteCard';
import { tokens } from '@equinor/eds-tokens';
import { Typography } from '@equinor/eds-core-react';

import AppIconContainer, { Styled as IconStyled } from './AppIcon';
import { getAppCardColor } from '../util/app-card-color';
import { AppManifest } from '../types/types';

 const Styled = {
	Portal: styled.a<{ $loading?: boolean }>`
		pointer-events: ${(props) => (props.$loading ? 'none' : 'auto')};
		position: relative;
		height: 100%;
		display: flex;
		flex-direction: row;
		align-items: center;
		border-radius: 0.25rem;
		box-shadow: ${tokens.elevation.raised};
		text-decoration: none;

		h5 {
			font-size: ${tokens.typography.heading.h5.fontSize};
		}

		div${IconStyled.AppIcon} {
			height: auto;
		}

		&:hover,
		&:focus {
			cursor: ${(props) => (props.$loading ? 'default' : 'pointer')};
			&:after {
				content: '';
				width: 100%;
				height: 0.25rem;
				position: absolute;
				bottom: 0;
				left: 0;
				background-color: var(--app-color, ${tokens.colors.interactive.primary__resting.hex});
				border-radius: 0 0 0.25rem 0.25rem;
				opacity: 0.3;
			}
		}
	`,
	Details: styled(FavoriteStyled.Details)`
		row-gap: ${tokens.spacings.comfortable.x_small};
		padding: ${tokens.spacings.comfortable.medium};
	`,
	Description: styled(Typography)`
		color: ${tokens.colors.text.static_icons__tertiary.hex};
	`,
};

const targetPortal = (appUrl: string | undefined): HTMLAttributeAnchorTarget => {
	const winOrigin = window.location.origin;
	if (appUrl) {
		const appOrigin = new URL(appUrl, winOrigin).origin;
		if (appOrigin !== winOrigin) return '_blank';
	}
	return '_self';
};

type PortalCardProps = {
	app: Partial<AppManifest>;
	onClick?: (app: Partial<AppManifest>) => void;
	isLoading?: boolean;
};

export const PortalCard = ({ app, onClick, isLoading }: PortalCardProps): JSX.Element => {
	return (
		<Styled.Portal
			$loading={isLoading}
			target={targetPortal(app.url)}
			href={app.url}
			style={getAppCardColor(app)}
			onClick={() => onClick && onClick(app)}
		>
			<AppIconContainer loading={isLoading} display="portal" app={app} />
			<Styled.Details>
				<FavoriteStyled.Name group="heading" variant="h5">
					{isLoading ? (
						<Skeleton size={SkeletonSize.Medium} variant={SkeletonVariant.Text} />
					) : (
						app.displayName
					)}
				</FavoriteStyled.Name>
				<Styled.Description group="paragraph" variant="caption">
					{isLoading ? (
						<Skeleton size={SkeletonSize.small} variant={SkeletonVariant.Text} />
					) : (
						app.description
					)}
				</Styled.Description>
			</Styled.Details>
		</Styled.Portal>
	);
};

export default PortalCard;
