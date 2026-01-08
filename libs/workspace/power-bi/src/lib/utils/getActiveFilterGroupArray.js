export function getActiveFilterGroupArray(activeFilters) {
    const activeFilterGroups = [];
    Object.keys(activeFilters).forEach((key) => {
        if (activeFilters[key].length !== 0) {
            activeFilterGroups.push(key);
        }
    });
    return activeFilterGroups;
}
