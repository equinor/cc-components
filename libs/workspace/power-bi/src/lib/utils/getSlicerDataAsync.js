export const getSlicerDataAsync = async (slicer) => {
    const { data } = await slicer.exportData();
    const filter = (await slicer.getFilters())[0];
    return { data, filter, slicer };
};
