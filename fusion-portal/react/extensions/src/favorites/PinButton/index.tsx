import { useCallback } from 'react';
import styled, { css } from 'styled-components';
import { tokens } from '@equinor/eds-tokens';
import { Icon } from '@equinor/eds-core-react';
import { star_filled, star_outlined } from '@equinor/eds-icons';
import { Skeleton, SkeletonSize, SkeletonVariant } from '@equinor/fusion-react-skeleton';
import { AppManifest } from '@equinor/fusion-framework-module-app';

const pinnIconSize = 1.5;

export const Styled = {
	PinButton: styled.button<{ disabled?: boolean }>`
		display: flex;
		align-items: center;
		justify-content: center;
		color: ${tokens.colors.interactive.secondary__resting.hex};
		position: relative;
		padding: ${tokens.spacings.comfortable.x_small};
		border: none;
		background: none;

		> * {
			color: ${({ disabled }) => disabled && tokens.colors.interactive.disabled__text.hex};
			fill: ${({ disabled }) => disabled && tokens.colors.interactive.disabled__text.hex};
		}

		&:hover {
			color: ${tokens.colors.interactive.primary__resting.hex};
			cursor: pointer;
		}
	`,
	PinIconOut: styled(Icon)<{ $isPinned: boolean }>`
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
	app: AppManifest;
	loading?: boolean;
	onClick: VoidFunction;
	disabled?: boolean;
};

export const PinButtonContainer = ({ app, loading: isLoading, onClick, disabled }: PinButtonProps): JSX.Element => {
	const pinApp = useCallback(
		(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
			event.preventDefault();
			onClick();
		},
		[app]
	);

	if (isLoading) {
		return (
			<Styled.PinButton>
				<Skeleton size={SkeletonSize.XSmall} variant={SkeletonVariant.Circle} />
			</Styled.PinButton>
		);
	}

	return (
		<Styled.PinButton onClick={pinApp} disabled={disabled}>
			<Styled.PinIconOut $isPinned={true} data={star_outlined} title={`Add ${app.name} in Favorites`} />
			<Styled.PinIconIn data={star_filled} title={`Remove ${app.name} from Favorites`} />
		</Styled.PinButton>
	);
};

export default PinButtonContainer;
