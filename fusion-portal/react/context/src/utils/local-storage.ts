class LocalStorage {
	setItem<T>(key: string, data: T): void {
		/** Data is null or undefined */
		if (!data) {
			localStorage.removeItem(key);
			return;
		}

		/** Data is already string */
		if (typeof data === 'string') {
			localStorage.setItem(key, data);
			return;
		}

		//Anything else
		localStorage.setItem(key, JSON.stringify(data));
	}

	getItem<T>(key: string): string | T | undefined {
		const data = localStorage.getItem(key);
		if (!data || data === 'undefined') return undefined;

		try {
			return JSON.parse(data) as T;
		} catch {
			return data;
		}
	}

	removeItem(key: string): void {
		localStorage.removeItem(key);
	}
}

export const storage = new LocalStorage();
