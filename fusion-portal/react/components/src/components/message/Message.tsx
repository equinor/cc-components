import { IconData, error_outlined, warning_outlined } from '@equinor/eds-icons';
import { Icon } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';
import styled from 'styled-components';
import { PropsWithChildren } from 'react';

export type Variant = 'Warning' | 'Error' | 'Info' | 'NoContent';

export const getIconVariant = (type: Variant) => {
	const variant: Record<Variant, { data: IconData; color: string; backColor: string; type: Variant }> = {
		Error: {
			data: warning_outlined,
			color: tokens.colors.interactive.danger__resting.rgba,
			backColor: tokens.colors.interactive.danger__highlight.hex,
			type: 'Error',
		},
		Warning: {
			data: error_outlined,
			color: tokens.colors.interactive.warning__resting.rgba,
			backColor: tokens.colors.interactive.warning__highlight.hex,
			type: 'Warning',
		},
		Info: {
			data: error_outlined,
			color: tokens.colors.infographic.primary__moss_green_100.rgba,
			backColor: tokens.colors.interactive.primary__selected_highlight.hex,
			type: 'Info',
		},
		NoContent: {
			data: error_outlined,
			color: tokens.colors.infographic.primary__moss_green_100.rgba,
			backColor: tokens.colors.interactive.primary__selected_highlight.hex,
			type: 'NoContent',
		},
	};
	return variant[type];
};

export type MessageProps = {
	type?: Variant;
	title: string;
	messages?: string[];
};

export const Styled = {
	StyledCardIndicator: styled.div<{ color: string }>`
		position: absolute;
		display: block;
		left: 0;
		width: 8px;
		height: 100%;
		background-color: ${({ color }) => color};
		border-top-left-radius: 4px;
		border-bottom-left-radius: 4px;
	`,
	Content: styled.div`
		padding: 1rem 1.5rem;
		display: flex;
		flex-direction: column;
	`,
	Header: styled.div`
		display: flex;
		flex-direction: row;
		align-items: center;
	`,
	Icon: styled.span<{ color: string }>`
		flex: none;
		border-radius: 100px;
		background-color: ${({ color }) => color};
		width: 40px;
		height: 40px;
		margin-right: 16px;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		overflow: visible;
	`,
	UL: styled.ul`
		display: block;
		list-style-type: disc;
		margin-block-start: 1em;
		margin-block-end: 0px;
		margin-inline-start: 0px;
		margin-inline-end: 0px;
		padding-inline-start: 35px;
		& > li {
			padding-bottom: 0.5rem;
		}
	`,
};

export const Message = ({ title, messages, type = 'Info', children }: PropsWithChildren<MessageProps>) => {
	const variant = getIconVariant(type);

	return (
		<Styled.Content>
			<Styled.Header>
				<Styled.Icon color={variant.backColor} title="Icon">
					<Icon data={variant.data} color={variant.color} type={variant.type} />
				</Styled.Icon>
				<span>{title}</span>
			</Styled.Header>
			{messages && (
				<Styled.UL>
					{messages?.map((message, i) => (
						<li key={message || '' + i}>{message}</li>
					))}
				</Styled.UL>
			)}
			{children && children}
		</Styled.Content>
	);
};
