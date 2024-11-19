import { Skeleton, SkeletonSize, SkeletonVariant } from '@equinor/fusion-react-skeleton';
import styled from 'styled-components';
import { tokens } from '@equinor/eds-tokens';
import { Link } from 'react-router-dom';
import { Typography } from '@equinor/eds-core-react';

import AppIconContainer, { Styled as IconStyled } from './AppIcon';
import PinButtonContainer from './PinButton';
import { AppManifest } from '../types/types';


 export const Styled = {
	Favorite: styled(Link)<{ $loading?: boolean }>`
		pointer-events: ${(props) => (props.$loading ? 'none' : 'auto')};
		position: relative;
		height: 100%;
		display: flex;
		flex-direction: row;
		align-items: center;
		border-radius: 0.25rem;
		box-shadow: ${tokens.elevation.raised};
		column-gap: ${tokens.spacings.comfortable.x_small};
		padding-right: 0.375rem;
		text-decoration: none;

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
	Content: styled.div`
		height: 100%;
		display: flex;
		flex: 1;
		align-items: center;
		column-gap: ${tokens.spacings.comfortable.small};
	`,
	Details: styled.div`
		display: flex;
		flex-direction: column;
		row-gap: ${tokens.spacings.comfortable.xx_small};
		padding: ${tokens.spacings.comfortable.medium_small} 0;
	`,
	Name: styled(Typography)`
		color: ${tokens.colors.text.static_icons__default.hex};
	`,
	Category: styled(Typography)`
		color: ${tokens.colors.text.static_icons__tertiary.hex};
	`,
};

type FavoriteCardProps = {
	app: Partial<AppManifest>;
	onClick: (app: Partial<AppManifest>) => void;
	loading?: boolean;
	colorsStyle?: {
		[key: string]: string;
	};
};

export const FavoriteCard = ({ app, onClick, loading, colorsStyle }: FavoriteCardProps): JSX.Element => {
	return (
		<Styled.Favorite
			$loading={loading}
			to={app.url || `/apps/${app.appKey}/`}
			style={colorsStyle}
			onClick={() => onClick(app)}
		>
			<Styled.Content>
				<AppIconContainer loading={loading} display="card" app={app} />
				<Styled.Details>
					<Styled.Name group="paragraph" variant="body_short_bold">
						{loading ? (
							<Skeleton size={SkeletonSize.small} variant={SkeletonVariant.Text} />
						) : (
							app.displayName
						)}
					</Styled.Name>
					<Styled.Category group="paragraph" variant="caption">
						{loading ? (
							<Skeleton size={SkeletonSize.XSmall} variant={SkeletonVariant.Text} />
						) : (
							app.category?.displayName
						)}
					</Styled.Category>
				</Styled.Details>
			</Styled.Content>
			<PinButtonContainer isLoading={loading} app={app} />
		</Styled.Favorite>
	);
};

export default FavoriteCard;
