import { BehaviorSubject, tap } from 'rxjs';
import { storage } from '../storage';

/**
 * Function for creating an observable that syncs with local storage
 */
export const createObservableStorage = <TType>(key: string, defaultValue: TType) => {
	const store = {
		read: () => storage.getItem(key) as TType | undefined,
		save: (value: TType) => storage.setItem(key, value),
	};
	const subject$ = new BehaviorSubject<TType>(store.read() ?? defaultValue);

	return {
		obs$: subject$.pipe(tap(store.save)),
		next: (value: TType) => subject$.next(value),
		subject$,
	};
};
