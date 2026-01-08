const tabSortOrder = new Map();
tabSortOrder.set('garden', 0);
tabSortOrder.set('grid', 1);
tabSortOrder.set('powerbi', 2);
export function sortFusionTabs(tabs) {
    tabs.sort((a, b) => {
        return (tabSortOrder.get(a.name) ?? Infinity) - (tabSortOrder.get(b.name) ?? Infinity);
    });
    return tabs;
}
