import { useCallback, useMemo, useRef } from 'react';

import styled from 'styled-components';
import { tokens } from '@equinor/eds-tokens';
import { Skeleton, SkeletonSize, SkeletonVariant } from '@equinor/fusion-react-skeleton';
import {
	SearchableDropdown,
	SearchableDropdownResolver,
	SearchableDropdownResultItem,
	SearchableDropdownSelectEvent,
} from '@equinor/fusion-react-searchable-dropdown';
import { useApps } from "@equinor/fusion-portal-react-app"
import { NavigationModule } from '@equinor/fusion-framework-module-navigation';
import { getSearchAppIcon } from './utils';
import { useFramework } from '@equinor/fusion-framework-react-app/framework';

// import { usePortalApps } from '@portal/core';

export const Styled = {
	Dropdown: styled(SearchableDropdown)`
		/* background-color: #fff; */
		/* border-radius: 0.375rem; */
		font-size: ${tokens.typography.navigation.menu_title.fontSize};
		border: 0;
		&::part(list) {
			--fwc-list-vertical-padding: 0px;
		}

		&::part(list-item) {
			--fwc-list-item-vertical-padding: ${tokens.spacings.comfortable.medium_small};
			--fwc-list-item-font-size: ${tokens.typography.navigation.menu_title.fontSize};
			padding-left: ${tokens.spacings.comfortable.medium};
			padding-right: ${tokens.spacings.comfortable.medium};
			border-bottom: 1px solid ${tokens.colors.interactive.disabled__border.hex};
			height: auto;
		}
	`,
};

const notFound = {
	id: 'not-found',
	isError: true,
	isDisabled: true,
	graphicType: 'eds',
	graphic: 'do_not_disturb',
	title: 'App Not Found',
	subTitle: 'Try different search query',
} as SearchableDropdownResultItem;

const noApps = {
	id: 'oops-apps',
	isError: true,
	isDisabled: true,
	graphicType: 'eds',
	graphic: 'mood_sad',
	title: 'Oops, No Apps',
	subTitle: 'Something is wrong, there are no apps available',
} as SearchableDropdownResultItem;

const sortByTitle = (a: SearchableDropdownResultItem, b: SearchableDropdownResultItem) => {
	const titleA = a.title || '';
	const titleB = b.title || '';
	return titleA.localeCompare(titleB);
};

const sortTitleByQuery = (query: string) => (a: SearchableDropdownResultItem, b: SearchableDropdownResultItem) => {
	const titleNameA = a.title ?? '';
	const titleNameB = b.title ?? '';

	const matchA = titleNameA.toLowerCase().includes(query.toLowerCase());
	const matchB = titleNameB.toLowerCase().includes(query.toLowerCase());

	if (matchA && !matchB) return -1;
	if (!matchA && matchB) return 1;
	return 0;
};

export const AppSearchBar = (): JSX.Element => {
	const { apps, isLoading } = useApps();
	const navigation = useFramework<[NavigationModule]>().modules.navigation;


	const ref = useRef();

	const resolver = useMemo(() => {
		const alteredAsDropdownItems = apps
			? apps.map((app) => {
					return {
						id: app.appKey,
						title: app.displayName,
						subTitle: app.category?.displayName,
						graphic: getSearchAppIcon(app),
						graphicType: 'inline-svg',
					} as SearchableDropdownResultItem;
			  })
			: [noApps];

		return {
			searchQuery: async (query: string) => {
				const matcher = new RegExp(query, 'i');
				const matched = alteredAsDropdownItems
					?.filter(
						(item) => item.title?.match(matcher) || item.subTitle?.match(matcher) || item.id?.match(matcher)
					)
					.sort(sortByTitle)
					.sort(sortTitleByQuery(query));

				if (matched.length !== 0) {
					return matched;
				} else {
					return [notFound];
				}
			},
		} as SearchableDropdownResolver;
	}, [apps]);

	const onSelect = useCallback((e: SearchableDropdownSelectEvent) => {
		const appKey = e.nativeEvent.detail.selected[0].id;

		navigation.push(`/apps/${appKey}/`);
	}, []);

	if (isLoading) {
		return <Skeleton size={SkeletonSize.small} variant={SkeletonVariant.Rectangle} style={{ width: '100%' }} />;
	}

	return (
		<Styled.Dropdown
			ref={ref.current}
			id="app-search"
			autofocus
			placeholder="App Search"
			variant="page-outlined"
			initialText="Type to start searching for apps..."
			onSelect={onSelect}
			resolver={resolver}
		/>
	);
};

export default AppSearchBar;
