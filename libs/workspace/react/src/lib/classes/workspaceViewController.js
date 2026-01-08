import { Observable } from './observable';
import { StateController } from './stateController';
import { TabController } from './tabController';
export class WorkspaceViewController {
    appKey;
    appColor;
    viewState = new StateController();
    tabController = new TabController();
    providers = [];
    Sidesheet;
    addProvider = (provider) => {
        this.providers.filter((s) => s.name !== provider.name);
        this.providers.push(provider);
    };
    addSidesheetComponent = (comp) => {
        this.Sidesheet = comp;
    };
    constructor(defaultTab) {
        const error = new Observable(undefined);
        this.setError = error.setValue;
        this.onError = error.onchange;
        if (defaultTab) {
            this.tabController.setActiveTab(defaultTab);
        }
        error.onchange((val) => {
            this.error = val;
        });
    }
    error;
    setError;
    onError;
    /** Component for handling errors */
    ErrorComponent;
    /** Function for refetching data */
    refetchData;
    destroy = () => {
        for (const key in this) {
            this[key] = null;
            delete this[key];
        }
    };
}
