import { createReducer as makeReducer } from '@equinor/fusion-observable';

import { enableMapSet } from 'immer';

enableMapSet();

import { actions } from './actions';
import { MenuState } from '../provider';

export const createReducer = (value: MenuState) =>
	makeReducer({ ...value, status: new Set() } as MenuState, (builder) => {
		builder.addCase(actions.toggleMenu, (state) => {
			state.menuActive = !state.menuActive;
		});
		builder.addCase(actions.closeMenu, (state) => {
			state.menuActive = false;
		});
		builder.addCase(actions.setSearchText, (state, action) => {
			state.searchText = action.payload;
		});
	});

export default createReducer;
