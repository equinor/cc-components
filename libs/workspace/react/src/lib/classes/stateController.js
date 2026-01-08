import { Observable } from './observable';
export class StateController {
    isLoading;
    setIsLoading;
    onIsLoadingChanged;
    constructor() {
        const isLoading = new Observable(false, (newVal, oldVal) => newVal === oldVal);
        this.setIsLoading = isLoading.setValue;
        this.onIsLoadingChanged = isLoading.onchange;
        this.isLoading = isLoading.value;
        isLoading.onchange((val) => {
            this.isLoading = val;
        });
    }
}
