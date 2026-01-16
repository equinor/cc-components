import { TabController } from '../components/Workspace';
import { Tab } from '../types';
import { StoreApi, createStore } from 'zustand';
import type { ApplicationInsights } from '@microsoft/applicationinsights-web';

type TabControllerArgs = {
  defaultTab?: string;
  tabs: Tab[];
  appInsights?: ApplicationInsights;
};
export function createTabController({
  defaultTab,
  tabs,
  appInsights,
}: TabControllerArgs): StoreApi<TabController> {
  const activeTab = tabs.find((s) => s.name === defaultTab);
  if (!activeTab) {
    throw new Error('No active tab');
  }

  const store = createStore<TabController>((set, get) => ({
    activeTab: activeTab.name,
    setActiveTab: (name: string) => {
      appInsights?.trackEvent({ name: 'TabChanged', properties: { tabName: name } });
      set({ activeTab: name });
    },
  }));

  return store;
}
