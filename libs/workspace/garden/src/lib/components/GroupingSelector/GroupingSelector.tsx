import { Autocomplete, CircularProgress, Divider, EdsProvider, Label, Radio } from '@equinor/eds-core-react';
import { Fragment, ReactElement, startTransition, useEffect, useRef } from 'react';
import {
  RadioButtonWrapper,
  RadioCategoryWrapper,
  RadioWrapper,
  SelectorBody,
  StyledAutoCompleteWrapper,
  StyledGroupHeader,
  StyledSubGroupHeader,
} from './groupingSelector.styles';
import { useGarden } from '../../hooks/useGarden';
import { GardenHeaderOption } from '../../types';

type GroupingSelectorProps<TContext> = {
  setGroupingKeys: (keys: string[]) => void;
  groupingKeys: string[];
  timeInterval: string | null;
  dateVariant: string | null;
  onChangeTimeInterval: (timeInterval: string | null) => void;
  onChangeDateVarient: (dateVariant: string | null) => void;
};

export function GroupingSelector<TContext>({
  timeInterval,
  dateVariant,
  setGroupingKeys,
  onChangeTimeInterval,
  onChangeDateVarient,
  groupingKeys,
}: GroupingSelectorProps<TContext>): ReactElement | null {
  const {
    gardenMetaQuery,
    selectionService: { setSummaryKey },
    groupingService: { summaryKey },
  } = useGarden();

  const handleExistingSelectionChange = (newValue: string | null | undefined) => {
    const gardenKey = groupingKeys.at(0);
    if (!gardenKey) {
      throw new Error('');
    }
    const newKeys = newValue == null ? [gardenKey] : [gardenKey, newValue];
    startTransition(() => {
      setGroupingKeys(newKeys);
    });
  };

  const handleGardenKeyChange = (newValue: string | null) => {
    const keyFromLabel = newValue;
    keyFromLabel && setGardenKey(keyFromLabel);
  };

  if (gardenMetaQuery.isLoading) {
    return <CircularProgress size={48} />;
  }

  if (!gardenMetaQuery.data) {
    throw new Error('An error occurred while fetching grouping selections');
  }

  const setGardenKey = (key: string) => {
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

  function handleSummaryChange(groupingKey: string): void {
    setSummaryKey(groupingKey ?? null);
  }

  return (
    <EdsProvider density="compact">
      <SelectorBody>
        <StyledGroupHeader>Groups</StyledGroupHeader>
        <Divider />
        <StyledAutoCompleteWrapper>
          <Autocomplete
            key={groupingKeys[0]}
            options={gardenMetaQuery.data.allGroupingOptions}
            label={'Group by'}
            optionLabel={(s) => s?.displayName ?? s?.groupingKey ?? ''}
            hideClearButton
            multiple={false}
            selectedOptions={[gardenMetaQuery.data.allGroupingOptions.find((s) => s.groupingKey == groupingKeys[0])]}
            onOptionsChange={(changes) => handleGardenKeyChange(changes.selectedItems[0]?.groupingKey)}
          />
          <Autocomplete
            options={gardenMetaQuery.data.validGroupingOptions}
            label={'Then Group by'}
            selectedOptions={[
              gardenMetaQuery.data.allGroupingOptions.find((s) => s.groupingKey === groupingKeys.at(1)),
            ]}
            multiple={false}
            optionLabel={(s) => s?.displayName ?? s?.groupingKey ?? ''}
            onOptionsChange={(changes) => handleExistingSelectionChange(changes.selectedItems[0]?.groupingKey)}
          />
          {Array.isArray(gardenMetaQuery.data.headerOptions) && gardenMetaQuery.data.headerOptions.length > 0 && (
            <Autocomplete
              options={gardenMetaQuery.data.headerOptions}
              label={'Group Summary'}
              optionLabel={(s: GardenHeaderOption) => s?.displayName ?? s?.summaryKey}
              multiple={false}
              selectedOptions={gardenMetaQuery.data.headerOptions.filter((s) => s.summaryKey === summaryKey)}
              onOptionsChange={(changes) => handleSummaryChange(changes.selectedItems[0]?.summaryKey)}
            />
          )}
        </StyledAutoCompleteWrapper>

        {gardenMetaQuery.data.allGroupingOptions.map((groupingOption) => {
          // Check if dateVariant or timeInterval is defined
          const hasDateVariant = !!groupingOption.dateVariant;
          const hasTimeInterval = !!groupingOption.timeInterval;

          if (!hasDateVariant && !hasTimeInterval) return null;

          return (
            groupingOption.groupingKey === groupingKeys[0] && (
              <Fragment key={groupingOption.groupingKey}>
                <StyledGroupHeader>Views</StyledGroupHeader>
                <Divider />
                <RadioWrapper>
                  <StyledSubGroupHeader>Date Fields:</StyledSubGroupHeader>
                  <RadioCategoryWrapper>
                    {hasDateVariant &&
                      groupingOption.dateVariant?.map((typ) => (
                        <RadioButtonWrapper key={typ}>
                          <Radio
                            id={typ}
                            key={typ}
                            value={typ}
                            name="dateVariant"
                            checked={dateVariant?.trim().toLowerCase() === typ.trim().toLowerCase()}
                            onChange={(e) => onChangeDateVarient(e.target.value)}
                          />
                          <Label htmlFor={typ} label={typ} style={{ fontSize: '14' }} />
                        </RadioButtonWrapper>
                      ))}
                  </RadioCategoryWrapper>
                  <StyledSubGroupHeader>Time Intervals:</StyledSubGroupHeader>
                  <RadioCategoryWrapper>
                    {hasTimeInterval &&
                      groupingOption.timeInterval?.map((dim) => (
                        <RadioButtonWrapper key={dim}>
                          <Radio
                            key={dim}
                            value={dim}
                            name="timeInterval"
                            checked={timeInterval?.trim().toLowerCase() === dim.trim().toLowerCase()}
                            onChange={(e) => onChangeTimeInterval(e.target.value)}
                          />
                          <Label htmlFor={dim} label={dim} style={{ fontSize: '14' }} />
                        </RadioButtonWrapper>
                      ))}
                  </RadioCategoryWrapper>
                </RadioWrapper>
              </Fragment>
            )
          );
        })}
      </SelectorBody>
    </EdsProvider>
  );
}
