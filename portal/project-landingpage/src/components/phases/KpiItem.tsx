import styled from 'styled-components';

import { Typography } from '@equinor/eds-core-react';
import { Skeleton } from '@equinor/fusion-portal-react-components';

const Styles = {
	StatusCardItem: styled.div`
		display: flex;
		min-height: 40px;
		flex: 1;
		min-width: 100px;
		width: fit-content;
	`,
	Indicator: styled.span<{ color?: string }>`
		height: 100%;
		display: block;
		background-color: ${({ color }) => (color ? color : '#d2d2d2')};
		width: 8px;
		margin-right: 8px;
	`,
};

type StatusBarItemProps = {
	/** Title to be shown above the value */
	title: string;
	subTitle: string;
	/** Value to be shown in the status bar */
	value?: string | number | null;
	description?: string;
	color?: string;
	isLoading?: boolean;
};
export function KpiCardItem(item: StatusBarItemProps) {
	return (
		<Styles.StatusCardItem title={item.description} key={item.title}>
			<Styles.Indicator color={item.color} />
			<span>
				<Typography variant="meta">{item.title}</Typography>
				{item.isLoading ? (
					<Skeleton size="xSmall" height="24px" variant="text" />
				) : (
					<Typography variant="h4">{item.value}</Typography>
				)}
				<Typography variant="meta">{item.subTitle}</Typography>
			</span>
		</Styles.StatusCardItem>
	);
}
