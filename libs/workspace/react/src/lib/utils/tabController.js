import { createStore } from 'zustand';
export function createTabController({ defaultTab, tabs }) {
    const appInsights = window.ai;
    const activeTab = tabs.find((s) => s.name === defaultTab);
    if (!activeTab) {
        throw new Error('No active tab');
    }
    const store = createStore((set, get) => ({
        activeTab: activeTab.name,
        setActiveTab: (name) => {
            appInsights?.trackEvent({ name: 'TabChanged', properties: { tabName: name } });
            set({ activeTab: name });
        },
    }));
    return store;
}
