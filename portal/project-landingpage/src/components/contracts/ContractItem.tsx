import { Card, Typography } from '@equinor/eds-core-react';
import type { Contract, Relations } from '@equinor/fusion-portal-react-context';
import styled from 'styled-components';
import { DateTime } from 'luxon';
import { tokens } from '@equinor/eds-tokens';

const Styles = {
	Card: styled(Card).withConfig({ displayName: 'contracts' })`
		max-width: 48%;
		min-width: 20%;
		height: 90px;
		overflow: hidden;
		position: relative;
	`,
	Flip: styled.span<{ isClosed?: boolean }>`
		position: absolute;
		display: flex;
		right: -100px;
		rotate: calc(45deg);
		height: 100px;
		width: 100px;
		background-color: ${({ isClosed }) =>
			isClosed
				? tokens.colors.infographic.primary__energy_red_21.hex
				: tokens.colors.infographic.primary__mist_blue.hex};
	`,
	Content: styled(Card.Content)``,
	Header: styled(Card.Header)`
		display: block;
		max-width: 380px;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	`,
	Typography: styled(Typography)`
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	`,
};

export const ContractItem = (contract: Relations<Contract> & { isClosed?: boolean }) => {
	return (
		<Styles.Card key={contract.id}>
			<Styles.Header title={contract.title}>{contract.title}</Styles.Header>
			<Styles.Content>
				<Typography variant="h6"></Typography>
				<Styles.Typography
					variant="overline"
					title={`${contract.value.contractNumber} | ${contract.value.companyName}`}
				>
					{contract.value.contractNumber} | {contract.value.companyName}
				</Styles.Typography>
				<Styles.Typography
					variant="overline"
					title={`${verifyDate(contract.value.startDate)} - ${verifyDate(contract.value.endDate)}`}
				>
					{verifyDate(contract.value.startDate)} - {verifyDate(contract.value.endDate)}
				</Styles.Typography>
			</Styles.Content>
			<Styles.Flip isClosed={contract.isClosed} />
		</Styles.Card>
	);
};

const verifyDate = (date?: string): string => {
	return date
		? new Date(date).toString() !== 'Invalid Date'
			? DateTime.fromJSDate(new Date(date)).toFormat('dd LLL yyyy')
			: '-'
		: '-';
};
