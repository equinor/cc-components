/**
 * Get all active filters that have been applied to the report.
 */
export const getActiveFilterValues = async (filters) => {
    const activeFilterValues = {};
    await Promise.all(filters.map(async (filter) => {
        const a = await filter.slicer.getSlicerState().catch((_) => { });
        const slicerFilters = a ? a.filters : [];
        activeFilterValues[filter.type] = [];
        slicerFilters.forEach((slicerFilter) => {
            activeFilterValues[filter.type] = slicerFilter?.values || [];
        });
    }));
    return activeFilterValues;
};
