import { Button, Card, Icon, Typography } from '@equinor/eds-core-react';


import { useRelationsByType, Relations, Contract, useCurrentContext } from '@equinor/fusion-portal-react-context';
import styled from 'styled-components';
import { useMemo, useState } from 'react';
import { collapse, expand } from '@equinor/eds-icons';
import { ContractItem } from './ContractItem';

const Styles = {
	Card: styled(Card).withConfig({ displayName: 'contracts' })`
		width: 49%;
	`,
	ContractList: styled.div`
		padding: 1rem 0;
		display: flex;
		flex-direction: row;
		gap: 1rem;

		width: 100%;
		overflow: auto;
		flex-wrap: wrap;
	`,
	Heading: styled.div`
		padding: 1rem;
		display: flex;
		justify-content: space-between;
	`,
	SubHeading: styled.div`
		display: flex;
		justify-content: space-between;
		align-items: center;
	`,
	Content: styled.div`
		padding: 0 1rem;
	`,
};

const sortByDate = (a: Relations, b: Relations) =>
	new Date(b.value.endDate || '').getTime() - new Date(a.value.endDate || '').getTime();

export const Contracts = () => {
	const context = useCurrentContext();
	const { relations: contracts } = useRelationsByType('Contract', context?.id);

	const contractGroups = useMemo(() => {
		return contracts.reduce(
			(acc, item) => {
				if (new Date(item.value.endDate || '') > new Date()) {
					acc.open.push(item);
				} else {
					acc.closed.push(item);
				}

				return acc;
			},
			{ open: [], closed: [] } as { open: Relations<Contract>[]; closed: Relations<Contract>[] }
		);
	}, [contracts]);

	const [isContractOpenActive, setIsContractOpenActive] = useState(true);
	const [isContractClosedActive, setIsContractClosedActive] = useState(false);

	return (
		<div>
			<Styles.Content>
				<Styles.SubHeading>
					<Typography variant="h5">Contracts Open</Typography>
					<Button
						variant="ghost_icon"
						onClick={() => {
							setIsContractOpenActive((s) => !s);
						}}
					>
						{isContractOpenActive ? <Icon data={collapse} /> : <Icon data={expand} />}
					</Button>
				</Styles.SubHeading>
				<hr />

				<Styles.ContractList>
					{isContractOpenActive &&
						contractGroups.open
							.sort(sortByDate)
							.map((contract) => <ContractItem {...contract} key={contract.id} />)}
				</Styles.ContractList>
				<Styles.SubHeading>
					<Typography variant="h5">Contracts Closed</Typography>
					<Button
						variant="ghost_icon"
						onClick={() => {
							setIsContractClosedActive((s) => !s);
						}}
					>
						{isContractClosedActive ? <Icon data={collapse} /> : <Icon data={expand} />}
					</Button>
				</Styles.SubHeading>
				<hr />
				<Styles.ContractList>
					{isContractClosedActive &&
						contractGroups.closed
							.sort(sortByDate)
							.map((contract) => <ContractItem {...contract} key={contract.id} isClosed />)}
				</Styles.ContractList>
			</Styles.Content>
		</div>
	);
};
