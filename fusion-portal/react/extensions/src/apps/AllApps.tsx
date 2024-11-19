import styled from 'styled-components';

import { useApps, appGroupArraySort} from '@equinor/fusion-portal-react-app';


import { ProgressLoader } from '@equinor/fusion-portal-react-components';
import { AppGroup } from './app-group/AppGroup';
import { useFramework } from '@equinor/fusion-framework-react-app/framework';
import { NavigationModule } from '@equinor/fusion-framework-module-navigation';
const Styles = {
	Wrapper: styled.div`
		column-count: 3;
		max-width: calc(100vw - 490px);

		gap: 1.5rem;

		@media only screen and (max-width: 1500px) {
			column-count: 2;
		}
		@media only screen and (max-width: 1200px) {
			column-count: 1;
		}
	`,
	WrapperLoading: styled.div`
		height: 100%;
		min-height: 10rem;
		display: flex;
		align-items: center;
		justify-content: center;
	`,
};

export const AllApps = () => {
	const { addFavorite, appGroups, isLoading } = useApps();
	const navigation = useFramework<[NavigationModule]>().modules.navigation;
	// const { dispatchEvent } = useTelemetry();
	// Todo Create skeletons for loading
	if (isLoading) {
		return (
			<Styles.WrapperLoading>
				<ProgressLoader title="Loading Apps" />
			</Styles.WrapperLoading>
		);
	}

	return (
		<>
			{/* <AppContextMessage /> */}
			<Styles.Wrapper>
				{appGroups &&
					appGroups.sort(appGroupArraySort).map((appGroup) => (
						<div key={appGroup.displayName}>
							<AppGroup
								dark={true}
								group={appGroup}
								onClick={(app, e) => {
									e.preventDefault();
									if (app.isDisabled) {
										return;
									} else {
										navigation.push(`/apps/${app.appKey}/`);
									}
									// dispatchEvent(
									// 	{
									// 		name: 'onAppNavigation',
									// 	},

									// 	{
									// 		appKey: app.appKey,
									// 		isFavorite: app.isPinned,
									// 		source: 'app-menu',
									// 	}
									// );
								}}
								onFavorite={(app) => {
									addFavorite(app.appKey);
								}}
							/>
						</div>
					))}
			</Styles.Wrapper>
		</>
	);
};
