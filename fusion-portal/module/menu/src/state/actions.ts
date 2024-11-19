import { ActionInstanceMap, ActionTypes, createAction, createAsyncAction } from '@equinor/fusion-observable';
import { MenuState } from '../provider';

const createActions = () => ({
	/** Portal loading */
	toggleMenu: createAction('toggle_menu', () => ({ payload: true })),
	setSearchText: createAction('set_search_text', (searchText: string) => ({
		payload: searchText,
	})),
	closeMenu: createAction('close_menu'),
	trackState: createAsyncAction(
		'track_state',
		(payload: MenuState) => ({
			payload,
		}),
		(state: MenuState) => ({ payload: state }),
		(error: unknown) => ({ payload: error })
	),
});

export const actions = createActions();

export type ActionBuilder = ReturnType<typeof createActions>;

export type ActionMap = ActionInstanceMap<ActionBuilder>;

export type Actions = ActionTypes<typeof actions>;
