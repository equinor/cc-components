import { Card, Typography } from '@equinor/eds-core-react';

import { ProfileCardHeader } from '@equinor/fusion-portal-react-components';
import { NoProjectInfoAccessMessage } from '../messages/NoProjectInfoAccessMessage';
import { useCurrentDirector } from './hooks/use-current-director';
import { useUser } from '@equinor/fusion-portal-react-utils';
import { useCurrentContext } from '@equinor/fusion-portal-react-context';

export const ProjectDirector = () => {
	const context = useCurrentContext();
	const { director, error, isLoading } = useCurrentDirector(context?.id);

	const { data } = useUser(director?.assignedPerson?.azureUniqueId);

	if (!director && !error && !isLoading) {
		return null;
	}

	return (
		<Card elevation="raised">
			<Card.Header>
				<Typography variant="h6">Project Director</Typography>
			</Card.Header>
			{error ? <NoProjectInfoAccessMessage /> : <ProfileCardHeader user={data} trigger="click" />}
		</Card>
	);
};
