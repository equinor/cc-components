import { sortFusionTabs } from './fusionTabOrder';
import { addStatusBar } from '../integrations/status-bar';
import { addSidesheet } from '../integrations/sidesheet';
import { RootHeaderContext } from '../context';
import { tryGetTabFromUrl } from '../classes/fusionUrlHandler';
export function createConfigurationObject(props) {
    const tabs = [];
    const providers = [];
    const pushTab = (tab) => {
        if (!tab)
            return;
        tabs.push(tab);
    };
    const pushProvider = (provider) => {
        if (!provider)
            return;
        providers.push(provider);
    };
    pushProvider({ name: 'Header', Component: RootHeaderContext });
    const Sidesheet = addSidesheet(props.sidesheetOptions);
    props.modules &&
        props.modules.forEach((module) => {
            const config = module.setup(props);
            if (!config)
                return;
            pushProvider(config.provider);
            pushTab(config.tab);
        });
    pushProvider(addStatusBar(props.statusBarOptions));
    sortFusionTabs(tabs);
    return {
        providers: providers,
        tabs: tabs,
        defaultTab: resolveDefaultTab(props.currentBookmark, props.workspaceOptions.defaultTab, tabs),
        Sidesheet: Sidesheet,
    };
}
function resolveDefaultTab(bookmark, defaultTab, tabs) {
    const bookmarkTab = tryResolveBookmark(bookmark, tabs);
    if (bookmarkTab) {
        //Tab resolved from bookmark
        return bookmarkTab;
    }
    const tab = tryResolveTabFromUrl(tabs);
    if (tab) {
        //Tab resolved from url
        return tab;
    }
    let tabName = tabs.find((s) => s.name === defaultTab)?.name;
    if (!tabName) {
        tabName = !!tabs.length ? tabs?.[0].name : undefined;
    }
    if (typeof tabName !== 'string') {
        throw new Error(`
    Failed to find any tabs\n
    please make sure you added configuration module for at least one tab\n
    check the docs: https://equinor.github.io/fusion-workspace/introduction/\n`);
    }
    return tabName;
}
function tryResolveTabFromUrl(tabs) {
    const maybeTab = tryGetTabFromUrl();
    const tab = tabs.find((s) => s.name === maybeTab);
    if (tab) {
        return tab.name;
    }
    return undefined;
}
/**
 * Checks the bookmark for a valid tab
 */
function tryResolveBookmark(bookmark, tabs) {
    if (!bookmark)
        return;
    if (tabs.map((s) => s.name).includes(bookmark.tab)) {
        return bookmark.tab;
    }
    return;
}
