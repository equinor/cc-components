
// import { Favorites, ContextRelationNavigation, WorkAssigned } from '@equinor/project-portal-common';

import { Styles } from './ProjectPage';

import { useFeature } from '@equinor/fusion-framework-react-app/feature-flag';
import { ContextRelationNavigation } from '@equinor/project-portal-common';
import { WorkAssigned, Favorites } from '@equinor/fusion-portal-react-extensions';

import { AppSearch } from '@equinor/project-portal-common';
import { Milestones } from '../components/milestones/Milestones';
import { Phases } from '../components/phases/Phases';
import { Contracts } from '../components/contracts/Contracts';

export const Overview = ({ openAllApps }: { openAllApps: () => void }) => {
	const { feature: appSearchFeature } = useFeature('app-search');
	const { feature: projectMilestonesFeature } = useFeature('project-milestones');

	return (
		<Styles.Row>
			<Styles.Col>
				<ContextRelationNavigation title="Facilities" path="facility" type="Facility" />
				<WorkAssigned />
			</Styles.Col>
			<Styles.Col>
				<Phases />
				<Favorites openAllApps={openAllApps} />
				{projectMilestonesFeature?.enabled && <Milestones />}
				{appSearchFeature?.enabled && <AppSearch />}
				<Contracts />
			</Styles.Col>
		</Styles.Row>
	);
};
