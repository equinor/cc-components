import styled from 'styled-components';
import { PropsWithChildren } from 'react';
import { tokens } from '@equinor/eds-tokens';

const Style = {
	Chip: styled.span`
		color: ${tokens.colors.text.static_icons__tertiary.hex};
		background-color: ${tokens.colors.ui.background__light.hex};

		height: 22px;
		display: grid;
		grid-gap: 8px;
		grid-auto-flow: column;
		grid-auto-columns: max-content;
		-webkit-align-items: center;
		-webkit-box-align: center;
		-ms-flex-align: center;
		align-items: center;
		border: 1px solid transparent;
		border-radius: 100px;
		padding-left: 4px;
		padding-right: 8px;
		margin: 0;
		font-family: Equinor;
		font-size: 0.75rem;
		font-weight: 500;
		line-height: 1.333em;
		text-align: left;
		padding-left: 8px;
	`,
};

export const TaskChip = ({ children }: PropsWithChildren) => {
	return <Style.Chip>{children}</Style.Chip>;
};
