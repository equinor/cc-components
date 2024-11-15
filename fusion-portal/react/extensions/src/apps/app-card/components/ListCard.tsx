import { Skeleton, SkeletonSize, SkeletonVariant } from '@equinor/fusion-react-skeleton';
import styled from 'styled-components';
import { Styled as FavoriteStyled } from './FavoriteCard';
import { tokens } from '@equinor/eds-tokens';
import { Link } from 'react-router-dom';

import AppIconContainer from './AppIcon';
import PinButtonContainer from './PinButton';

import { getAppCardColor } from '../util/app-card-color';
import { AppManifest } from '@equinor/fusion-portal-module-app-config';

export const Styled = {
	Bg: styled.span<{ $dark?: boolean; $loading?: boolean; $isDisabled?: boolean }>`
		&:hover,
		&:focus {
			background: ${(props) =>
				props.$isDisabled
					? 'none'
					: props.$dark === true
					? tokens.colors.ui.background__medium.hex
					: tokens.colors.ui.background__light.hex};
		}
		> * {
			cursor: ${(props) => (props.$isDisabled ? 'not-allowed' : 'pointer')};
		}
	`,

	Item: styled(Link)`
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		padding: 0.375rem 0.25rem;
		column-gap: ${tokens.spacings.comfortable.small};
		text-decoration: none;

		&:hover,
		&:focus {
			border-radius: 0.25rem;
		}
	`,
	Content: styled(FavoriteStyled.Content)<{ $loading?: boolean }>`
		pointer-events: ${(props) => (props.$loading ? 'none' : 'auto')};
		column-gap: ${tokens.spacings.comfortable.medium_small};
	`,

	Name: styled(FavoriteStyled.Name)`
		flex: 1;
	`,
};

type ListCardProps = {
	app: Partial<AppManifest>;
	onClick?: (app: Partial<AppManifest>, e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
	onFavorite?: (key: Partial<AppManifest>) => void;
	loading?: boolean;
	dark?: boolean;
	pinButton?: boolean;
};

export const ListCard = ({ app, onClick, loading, pinButton, dark, onFavorite }: ListCardProps): JSX.Element => {
	return (
		<Styled.Bg
		$dark={dark}
			$isDisabled={app.isDisabled}
			title={app.isDisabled ? `${app.displayName} is not available in the selected context` : app.displayName}
		>
			<Styled.Item
				to={app.isDisabled ? '#' : app.url || `/apps/${app.appKey}/`}
				style={getAppCardColor(app)}
				onClick={(e) => onClick && onClick(app, e)}
			>
				<Styled.Content $loading={loading}>
					<AppIconContainer loading={loading} display="item" app={app} />
					<Styled.Name group="navigation" variant="menu_title">
						{loading ? (
							<Skeleton size={SkeletonSize.small} variant={SkeletonVariant.Text} />
						) : (
							app.displayName
						)}
					</Styled.Name>
				</Styled.Content>
				{pinButton && <PinButtonContainer isLoading={loading} app={app} onFavorite={onFavorite} />}
			</Styled.Item>
		</Styled.Bg>
	);
};

export default ListCard;
