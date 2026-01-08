import { Observable } from './observable';
export class TabController {
    activeTab;
    setActiveTab;
    onActiveTabChanged;
    tabs = [];
    addTab(tab) {
        if (this.tabs.findIndex((s) => s.name === tab.name) !== -1) {
            throw new Error('Duplicate tab');
        }
        this.tabs.push(tab);
        return this;
    }
    constructor() {
        const activeTab = new Observable(undefined, (newVal, oldVal) => newVal === oldVal);
        this.setActiveTab = activeTab.setValue;
        this.onActiveTabChanged = activeTab.onchange;
        this.activeTab = activeTab.value;
        activeTab.onchange((val) => {
            this.activeTab = val;
        });
    }
}
