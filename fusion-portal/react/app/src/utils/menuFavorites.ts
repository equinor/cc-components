import { createObservableStorage } from './rxjs/observable-storage';

//Key the value is stored under
const storageKey = 'menu-favorites';

const { next, subject$, obs$ } = createObservableStorage<string[]>(storageKey, []);

export const menuFavoritesController = {
	onClickFavorite: (value?: string) => {
		if (!value) return;
		next(subject$.value.includes(value) ? subject$.value.filter((s) => s !== value) : [...subject$.value, value]);
	},
	//Store every time a new value is emitted
	cleanFavorites: () => {
		return obs$.subscribe((favorites) => {
			if (favorites.find((i) => i.includes('next'))) {
				next(favorites.filter((s) => !s.includes('next')));
			}
		});
	},
	favorites$: obs$,
};
