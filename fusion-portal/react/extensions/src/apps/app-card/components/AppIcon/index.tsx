import styled, { css } from 'styled-components';
import { Skeleton } from '@equinor/fusion-react-skeleton';
import { tokens } from '@equinor/eds-tokens';
import { SkeletonSize, SkeletonVariant } from '@equinor/fusion-react-skeleton';
import { AppCardType } from '../../types/types';
import { defaultIcon } from './defaultIcon';
import { AppManifest } from '@equinor/fusion-portal-module-app-config';

const primaryColor = tokens.colors.interactive.primary__resting.hex;

export const Styled = {
	AppIcon: styled.div<{ $display: AppCardType }>`
		${({ $display }) => {
			switch ($display) {
				default:
				case 'item':
					return css`
						--app-icon-size: 1.5rem;
						--background-radius: 0.25rem;
						padding: 0.375rem;
					`;
				case 'card':
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
		color: var(--app-color, ${primaryColor});
		height: var(--app-icon-size, 1.5rem);
		width: var(--app-icon-size, 1.5rem);

		&:before {
			content: '';
			position: absolute;
			background-color: var(--app-color, ${primaryColor});
			border-radius: var(--background-radius, 0);
			height: 100%;
			width: 100%;
			opacity: 0.2;
		}
	`,
	AppIconSkeletonContainer: styled.div<{ $display: AppCardType }>`
		align-self: normal;
		position: relative;
		display: flex;
		justify-content: center;
		align-items: center;

		${({ $display }) => {
			if ($display !== 'item') {
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
	AppIconSkeleton: styled(Skeleton)<{ $display: AppCardType }>`
		--fwc-skeleton-fill-color: var(--app-color-skeleton, ${primaryColor}33);
		${({ $display }) => {
			switch ($display) {
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
	app: Partial<AppManifest>;
	display: AppCardType;
	loading?: boolean;
};

export const AppIconContainer = ({ app, display, loading }: AppIconProps): JSX.Element => {
	const appCategoryIcon = app.category ? app.category.defaultIcon : defaultIcon;
	const appIcon = app.visualization?.icon
		? app.visualization.icon !== ''
			? app.visualization.icon
			: appCategoryIcon
		: appCategoryIcon;

	if (loading) {
		return (
			<Styled.AppIconSkeletonContainer $display={display}>
				<Styled.AppIconSkeleton
					$display={display}
					size={display === 'card' ? SkeletonSize.XSmall : SkeletonSize.small}
					variant={SkeletonVariant.Square}
				/>
			</Styled.AppIconSkeletonContainer>
		);
	}

	return <Styled.AppIcon $display={display} dangerouslySetInnerHTML={{ __html: appIcon || defaultIcon }} />;
};

export default AppIconContainer;
