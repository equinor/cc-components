import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Autocomplete, CircularProgress, Divider, EdsProvider, Label, Radio } from '@equinor/eds-core-react';
import { Fragment, startTransition } from 'react';
import { RadioButtonWrapper, RadioCategoryWrapper, RadioWrapper, SelectorBody, StyledAutoCompleteWrapper, StyledGroupHeader, StyledSubGroupHeader, } from './groupingSelector.styles';
import { useGarden } from '../../hooks/useGarden';
export function GroupingSelector({ timeInterval, dateVariant, setGroupingKeys, onChangeTimeInterval, onChangeDateVarient, groupingKeys, }) {
    const { gardenMetaQuery, selectionService: { setSummaryKey }, groupingService: { summaryKey }, } = useGarden();
    const handleExistingSelectionChange = (newValue) => {
        const gardenKey = groupingKeys.at(0);
        if (!gardenKey) {
            throw new Error('');
        }
        const newKeys = newValue == null ? [gardenKey] : [gardenKey, newValue];
        startTransition(() => {
            setGroupingKeys(newKeys);
        });
    };
    const handleGardenKeyChange = (newValue) => {
        const keyFromLabel = newValue;
        keyFromLabel && setGardenKey(keyFromLabel);
    };
    if (gardenMetaQuery.isLoading) {
        return _jsx(CircularProgress, { size: 48 });
    }
    if (!gardenMetaQuery.data) {
        throw new Error('An error occurred while fetching grouping selections');
    }
    const setGardenKey = (key) => {
        const foundGroupingOption = gardenMetaQuery.data.allGroupingOptions.find((option) => option.groupingKey === key);
        if (!foundGroupingOption) {
            throw new Error('Invalid grouping option');
        }
        if (!foundGroupingOption?.timeInterval?.includes(timeInterval ?? '')) {
            onChangeTimeInterval(foundGroupingOption.timeInterval?.at(0) ?? null);
        }
        if (!foundGroupingOption?.dateVariant?.includes(dateVariant ?? '')) {
            onChangeDateVarient(foundGroupingOption.dateVariant?.at(0) ?? null);
        }
        setGroupingKeys([key]);
    };
    function handleSummaryChange(groupingKey) {
        setSummaryKey(groupingKey ?? null);
    }
    return (_jsx(EdsProvider, { density: "compact", children: _jsxs(SelectorBody, { children: [_jsx(StyledGroupHeader, { children: "Groups" }), _jsx(Divider, {}), _jsxs(StyledAutoCompleteWrapper, { children: [_jsx(Autocomplete, { options: gardenMetaQuery.data.allGroupingOptions, label: 'Group by', optionLabel: (s) => s?.displayName ?? s?.groupingKey ?? '', hideClearButton: true, multiple: false, selectedOptions: [gardenMetaQuery.data.allGroupingOptions.find((s) => s.groupingKey == groupingKeys[0])], onOptionsChange: (changes) => handleGardenKeyChange(changes.selectedItems[0]?.groupingKey) }, groupingKeys[0]), _jsx(Autocomplete, { options: gardenMetaQuery.data.validGroupingOptions, label: 'Then Group by', selectedOptions: [
                                gardenMetaQuery.data.allGroupingOptions.find((s) => s.groupingKey === groupingKeys.at(1)),
                            ], multiple: false, optionLabel: (s) => s?.displayName ?? s?.groupingKey ?? '', onOptionsChange: (changes) => handleExistingSelectionChange(changes.selectedItems[0]?.groupingKey) }), Array.isArray(gardenMetaQuery.data.headerOptions) && gardenMetaQuery.data.headerOptions.length > 0 && (_jsx(Autocomplete, { options: gardenMetaQuery.data.headerOptions, label: 'Group Summary', optionLabel: (s) => s?.displayName ?? s?.summaryKey, multiple: false, selectedOptions: gardenMetaQuery.data.headerOptions.filter((s) => s.summaryKey === summaryKey), onOptionsChange: (changes) => handleSummaryChange(changes.selectedItems[0]?.summaryKey) }))] }), gardenMetaQuery.data.allGroupingOptions.map((groupingOption) => {
                    // Check if dateVariant or timeInterval is defined
                    const hasDateVariant = !!groupingOption.dateVariant;
                    const hasTimeInterval = !!groupingOption.timeInterval;
                    if (!hasDateVariant && !hasTimeInterval)
                        return null;
                    return (groupingOption.groupingKey === groupingKeys[0] && (_jsxs(Fragment, { children: [_jsx(StyledGroupHeader, { children: "Views" }), _jsx(Divider, {}), _jsxs(RadioWrapper, { children: [_jsx(StyledSubGroupHeader, { children: "Date Fields:" }), _jsx(RadioCategoryWrapper, { children: hasDateVariant &&
                                            groupingOption.dateVariant?.map((typ) => (_jsxs(RadioButtonWrapper, { children: [_jsx(Radio, { id: typ, value: typ, name: "dateVariant", checked: dateVariant?.trim().toLowerCase() === typ.trim().toLowerCase(), onChange: (e) => onChangeDateVarient(e.target.value) }, typ), _jsx(Label, { htmlFor: typ, label: typ, style: { fontSize: '14' } })] }, typ))) }), _jsx(StyledSubGroupHeader, { children: "Time Intervals:" }), _jsx(RadioCategoryWrapper, { children: hasTimeInterval &&
                                            groupingOption.timeInterval?.map((dim) => (_jsxs(RadioButtonWrapper, { children: [_jsx(Radio, { value: dim, name: "timeInterval", checked: timeInterval?.trim().toLowerCase() === dim.trim().toLowerCase(), onChange: (e) => onChangeTimeInterval(e.target.value) }, dim), _jsx(Label, { htmlFor: dim, label: dim, style: { fontSize: '14' } })] }, dim))) })] })] }, groupingOption.groupingKey)));
                })] }) }));
}
