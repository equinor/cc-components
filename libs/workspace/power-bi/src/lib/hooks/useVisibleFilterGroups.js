import { useState } from 'react';
export const getVisibleFiltersFromLocalStorage = (reportId) => {
    const value = localStorage.getItem(`${reportId}-filters`);
    if (!value)
        return null;
    try {
        const parsedValue = JSON.parse(value);
        if (Array.isArray(parsedValue) && parsedValue.every((s) => typeof s === 'string')) {
            return parsedValue;
        }
    }
    catch (e) {
        return null;
    }
    return null;
};
export const useVisibleFilters = (report) => {
    const [filterGroupVisible, setFilterGroupVisible] = useState(getVisibleFiltersFromLocalStorage(report.getId()) ?? []);
    return [
        filterGroupVisible,
        (e) => {
            const reportId = report.getId();
            if (reportId) {
                localStorage.setItem(`${reportId}-filters`, JSON.stringify(e));
            }
            setFilterGroupVisible(e);
        },
    ];
};
