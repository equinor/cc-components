import { bar_chart } from '@equinor/eds-icons';


import styled from 'styled-components';
import { CCKpis } from '../components/cc-kpis/CCKpis';

const Styles = {
	Wrapper: styled.div`
		display: flex;
		gap: 1.5rem;
		flex-wrap: wrap;
		flex-direction: row;
		max-width: calc(100vw - 490px);
		> * {
			flex-basis: 49%;
			@media only screen and (max-width: 1700px) {
				flex-basis: 100%;
			}
		}
	`,
};

const color = '#007079';

export const ConstructionAndCommissioningData = () => {
	return (
		<Styles.Wrapper>
			<CCKpis
				appKey="handover"
				valueKey="handover"
				title="Handover"
				visual={{
					icon: bar_chart,
					color,
				}}
			/>

			<CCKpis
				appKey="workorder"
				valueKey="work-orders"
				title="Workorder"
				visual={{
					icon: bar_chart,
					color,
				}}
			/>

			<CCKpis
				appKey="mechanical-completion"
				valueKey="mechanical-completion"
				title="Mechanical completion"
				visual={{
					icon: bar_chart,
					color,
				}}
			/>

			<CCKpis
				appKey="punch"
				valueKey="punch"
				title="Punch"
				visual={{
					icon: bar_chart,
					color,
				}}
			/>

			<CCKpis
				appKey="swcr"
				valueKey="swcr"
				title="SWCR"
				visual={{
					icon: bar_chart,
					color,
				}}
			/>
			<CCKpis
				appKey="loop"
				valueKey="loop"
				title="Loop"
				visual={{
					icon: bar_chart,
					color,
				}}
			/>
			<CCKpis
				appKey="pipetest"
				valueKey="pipetest"
				title="Pipetest"
				visual={{
					icon: bar_chart,
					color,
				}}
			/>
			<CCKpis
				appKey="heat-trace"
				valueKey="heat-trace"
				title="Heat Trace"
				visual={{
					icon: bar_chart,
					color,
				}}
			/>

			{/* <Milestones /> */}
		</Styles.Wrapper>
	);
};
