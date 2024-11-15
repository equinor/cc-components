import { useCallback } from 'react';
import styled, { css } from 'styled-components';
import { tokens } from '@equinor/eds-tokens';
import { Icon } from '@equinor/eds-core-react';
import { star_filled, star_outlined } from '@equinor/eds-icons';
import { Skeleton, SkeletonSize, SkeletonVariant } from '@equinor/fusion-react-skeleton';

import { AppManifest } from '@equinor/fusion-portal-module-app-config';

const pinnIconSize = 1.5;

export const Styled = {
	PinButton: styled.button`
		display: flex;
		align-items: center;
		justify-content: center;
		color: ${tokens.colors.interactive.secondary__resting.hex};
		position: relative;
		padding: ${tokens.spacings.comfortable.x_small};
		border: none;
		background: none;

		&:hover {
			color: ${tokens.colors.interactive.primary__resting.hex};
			cursor: pointer;
		}
	`,
	PinIconOut: styled(Icon)<{ $isPinned?: boolean | null }>`
		${({ $isPinned }) => {
			if ($isPinned) {
				return css`
					color: ${tokens.colors.interactive.primary__resting.hex};
				`;
			}

			return '';
		}}
		width: ${pinnIconSize}rem;
		height: ${pinnIconSize}rem;
	`,
	PinIconIn: styled(Icon)`
		position: absolute;
		width: ${pinnIconSize * 1.25}rem;
		height: ${pinnIconSize * 1.25}rem;
		color: ${tokens.colors.interactive.primary__resting.hex};
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%) !important;

		&:hover {
			opacity: 0.3;
		}
	`,
};

type PinButtonProps = {
	app: Partial<AppManifest>;
	isLoading?: boolean;
	onFavorite?: (key: Partial<AppManifest>) => void;
};

export const PinButtonContainer = ({ app, isLoading, onFavorite }: PinButtonProps): JSX.Element => {
	const pinApp = useCallback(
		(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
			event.preventDefault();
			event.stopPropagation();
			onFavorite && onFavorite(app);
		},
		[app, onFavorite]
	);

	if (isLoading) {
		return (
			<Styled.PinButton>
				<Skeleton size={SkeletonSize.XSmall} variant={SkeletonVariant.Circle} />
			</Styled.PinButton>
		);
	}

	return (
		<Styled.PinButton disabled={isLoading} onClick={pinApp}>
			<Styled.PinIconOut $isPinned={app.isPinned} data={star_outlined} title={`Add ${app.name} in Favorites`} />
			{app.isPinned && <Styled.PinIconIn data={star_filled} title={`Remove ${app.name} from Favorites`} />}
		</Styled.PinButton>
	);
};

export default PinButtonContainer;
