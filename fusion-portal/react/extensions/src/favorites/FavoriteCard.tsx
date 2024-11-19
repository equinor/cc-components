/* eslint-disable @typescript-eslint/no-explicit-any */
import styled from 'styled-components';
import { tokens } from '@equinor/eds-tokens';
import { Link } from 'react-router-dom';
import { Typography } from '@equinor/eds-core-react';

import AppIconContainer, { Styled as IconStyled } from './AppIcon';
import PinButtonContainer from './PinButton';
import { NavigationModule } from '@equinor/fusion-framework-module-navigation';
import { AppManifest } from '@equinor/fusion-framework-module-app';
import { Skeleton } from '@equinor/fusion-portal-react-components';
import { useFramework } from '@equinor/fusion-framework-react-app/framework';

export const Styled = {
	Favorite: styled(Link)<{ disabled?: boolean }>`
		position: relative;
		height: 100%;
		display: flex;
		flex-direction: row;
		align-items: center;
		border-radius: 0.25rem;
		box-sizing: border-box;
		border: ${(props) =>
			props.disabled ? `1.5px solid ${tokens.colors.interactive.disabled__border.hex}` : 'none'};

		box-shadow: ${(props) => (props.disabled ? 'none' : tokens.elevation.raised)};
		column-gap: ${tokens.spacings.comfortable.x_small};
		padding-right: 0.375rem;
		text-decoration: none;
		background-color: ${({ disabled }) => (disabled ? 'none' : tokens.colors.ui.background__default.hex)};

		cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};

		div ${IconStyled.AppIcon} {
			height: auto;
		}
		> * {
			cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
		}

		&:hover,
		&:focus {
			&:after {
				content: '';
				width: 100%;
				height: 0.25rem;
				position: absolute;
				bottom: 0;
				left: 0;
				background-color: ${({ disabled }) =>
					disabled ? 'none' : `var(--app-color, ${tokens.colors.interactive.primary__resting.hex})`};
				border-radius: 0 0 0.25rem 0.25rem;
				opacity: 0.3;
			}
		}
	`,
	Content: styled.div<{ $isLoading?: boolean }>`
		pointer-events: ${(props) => (props.$isLoading ? 'none' : 'auto')};
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
};

type FavoriteCardProps = {
	app: AppManifest;
	onClick: (app: AppManifest) => void;
	loading?: boolean;
	isDisabled: boolean;
	colorsStyle?: {
		[key: string]: string;
	};
};

export const FavoriteCard = ({ app, onClick, loading, isDisabled }: FavoriteCardProps): JSX.Element => {
	const {navigation} = useFramework<[NavigationModule]>().modules

	const appColor = app.category?.color || tokens.colors.interactive.primary__resting.hex;
	const appColors = {
		['--app-color' as any]: appColor,
		['--app-color-skeleton' as any]: appColor + '33',
	};

	return (
		<Styled.Favorite
			to={isDisabled ? '#' : `/apps/${app.appKey}/`}
			style={appColors}
			disabled={isDisabled}
			title={isDisabled ? `${app.displayName} is not available in the selected context` : app.displayName}
			onClick={(e) => {
				e.preventDefault();
				navigation.push(`/apps/${app.appKey}/`);
			}}
		>
			<Styled.Content $isLoading={loading}>
				<AppIconContainer loading={loading} display="card" app={app} disabled={isDisabled} />
				<Styled.Details>
					<Typography
						group="paragraph"
						variant="body_short_bold"
						color={
							isDisabled
								? tokens.colors.interactive.disabled__text.hex
								: tokens.colors.text.static_icons__default.hex
						}
					>
						{loading ? <Skeleton size="small" variant="text" /> : app.displayName}
					</Typography>
					<Typography
						group="paragraph"
						variant="caption"
						color={
							isDisabled
								? tokens.colors.interactive.disabled__text.hex
								: tokens.colors.text.static_icons__default.hex
						}
					>
						{loading ? <Skeleton size="xSmall" variant="text" /> : app.category?.displayName}
					</Typography>
				</Styled.Details>
			</Styled.Content>
			<PinButtonContainer loading={loading} app={app} onClick={() => onClick(app)} disabled={isDisabled} />
		</Styled.Favorite>
	);
};

export default FavoriteCard;
