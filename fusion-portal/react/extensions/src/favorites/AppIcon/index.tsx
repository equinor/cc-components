/* eslint-disable @typescript-eslint/no-explicit-any */
import styled, { css } from 'styled-components';
import { Skeleton } from '@equinor/fusion-react-skeleton';
import { tokens } from '@equinor/eds-tokens';
import { SkeletonSize, SkeletonVariant } from '@equinor/fusion-react-skeleton';

import { defaultIcon } from './defaultIcon';

const primaryColor = tokens.colors.interactive.primary__resting.hex;
const disabledColor = tokens.colors.interactive.disabled__border.hex;

export const Styled = {
	AppIcon: styled.div<{ display: string; disabled?: boolean }>`
		${({ display }) => {
			switch (display) {
				case 'item':
					return css`
						--app-icon-size: 1.5rem;
						--background-radius: 0.25rem;
						padding: 0.375rem;
					`;
				case 'card':
				default:
					return css`
						--app-icon-size: 1.5rem;
						--background-radius: 0.25rem 0 0 0.25rem;
						padding: 0 0.375rem;
					`;
				case 'portal':
					return css`
						--app-icon-size: 2.5rem;
						--background-radius: 0.25rem 0 0 0.25rem;
						padding: 0 1.25rem;
					`;
			}
		}}
		align-self: normal;
		position: relative;
		display: flex;
		justify-content: center;
		align-items: center;
		color: ${({ disabled }) => (disabled ? disabledColor : `var(--app-color, ${primaryColor})`)};
		fill: ${({ disabled }) => (disabled ? disabledColor : `var(--app-color, ${primaryColor})`)};
		height: var(--app-icon-size, 1.5rem);
		width: var(--app-icon-size, 1.5rem);
		cursor: ${({ disabled }) => (disabled ? 'not-allowed;' : `pointer`)};

		&:before {
			content: '';
			position: absolute;
			background-color: ${({ disabled }) =>
				disabled ? tokens.colors.interactive.disabled__text.hex : `var(--app-color, ${primaryColor})`};
			border-radius: var(--background-radius, 0);
			height: 100%;
			width: 100%;
			opacity: 0.2;
		}
	`,
	AppIconSkeletonContainer: styled.div<{ display: string; disabled?: boolean }>`
		align-self: normal;
		position: relative;
		display: flex;
		justify-content: center;
		align-items: center;
		color: ${({ disabled }) => (disabled ? disabledColor : `var(--app-color, ${primaryColor})`)};
		${({ display }) => {
			if (display !== 'item') {
				return css`
					&:before {
						content: '';
						position: absolute;
						background-color: var(--app-color, ${primaryColor});
						border-radius: 0.25rem 0 0 0.25rem;
						height: 100%;
						width: 100%;
						opacity: 0.2;
					}
				`;
			}
			return '';
		}}
	`,
	AppIconSkeleton: styled(Skeleton)<{ display: string }>`
		--fwc-skeleton-fill-color: var(--app-color-skeleton, ${primaryColor}33);
		${({ display }) => {
			switch (display) {
				default:
				case 'card':
					return css`
						margin: 1.313rem 0.625rem;
					`;
				case 'portal':
					return css`
						margin: 1.625rem 1.25rem;
					`;
			}
		}}
	`,
};

type AppIconProps = {
	app: any;
	display: string;
	loading?: boolean;
	disabled?: boolean;
};

export const AppIconContainer = ({ app, display, loading, disabled }: AppIconProps): JSX.Element => {
	const appCategoryIcon = app.category ? app.category.defaultIcon : defaultIcon;
	const appIcon = app.icon ? (app.icon !== '' ? app.icon : appCategoryIcon) : appCategoryIcon;

	if (loading) {
		return (
			<Styled.AppIconSkeletonContainer display={display}>
				<Styled.AppIconSkeleton
					display={display}
					size={display === 'card' ? SkeletonSize.XSmall : SkeletonSize.small}
					variant={SkeletonVariant.Square}
				/>
			</Styled.AppIconSkeletonContainer>
		);
	}

	return (
		<Styled.AppIcon
			disabled={disabled}
			display={display}
			dangerouslySetInnerHTML={{ __html: appIcon || defaultIcon }}
		/>
	);
};

export default AppIconContainer;
