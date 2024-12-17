import { FlowSubject, Observable } from '@equinor/fusion-observable';
import { createState } from './state/create-state';
import { Actions, actions } from './state/actions';
import { storage } from './local-storage';

export interface IPortalMenuProvider {
  setSearchText(searchText: string): void;
  toggleMenu<T>(e?: React.MouseEvent<T>): void;
  closeMenu(): void;
  state: MenuState;
  state$: Observable<MenuState>;
}

export interface MenuState {
  menuActive: boolean;
  isLoading: boolean;
  searchText: string;
}

const initialState: MenuState = {
  menuActive: false,
  isLoading: false,
  searchText: '',
};

export const MENU_KEY = 'menuState';

export class PortalMenuProvider implements IPortalMenuProvider {
  #state: FlowSubject<MenuState, Actions>;

  get state(): MenuState {
    return this.#state.value;
  }

  get state$(): Observable<MenuState> {
    return this.#state.asObservable();
  }

  constructor() {
    this.#state = createState(
      (storage.getItem<MenuState>(MENU_KEY) as MenuState) || initialState,
      this
    );
  }

  toggleMenu = <T>(e?: React.MouseEvent<T>) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }

    this.#state.next(actions.toggleMenu());
  };

  closeMenu = <T>(e?: React.MouseEvent<T>) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }

    this.#state.next(actions.closeMenu());
  };

  setSearchText = (searchText: string) => {
    this.#state.next(actions.setSearchText(searchText));
  };
}
