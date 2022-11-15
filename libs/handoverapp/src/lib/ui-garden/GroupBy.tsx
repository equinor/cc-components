import { Autocomplete, AutocompleteChanges } from '@equinor/eds-core-react';
import {
  ExtendedGardenFields,
  HandoverCustomGroupByKeys,
  HandoverPackage,
} from '../types';
import { CustomGroupViewProps } from '@equinor/workspace-fusion/garden';
export const GardenGroupBy = (
  props: CustomGroupViewProps<
    HandoverPackage,
    ExtendedGardenFields,
    HandoverCustomGroupByKeys
  >
): JSX.Element => {
  const { customGroupByKeys } = props.controller;

  const handlePlannedForecast = (changes: AutocompleteChanges<string | undefined>) => {
    const plannedForecast = changes
      .selectedItems[0] as unknown as HandoverCustomGroupByKeys['plannedForecast'];

    customGroupByKeys?.setValue({
      ...customGroupByKeys.value,
      plannedForecast: plannedForecast || 'Planned',
    });
  };

  const handleWeeklyDaily = (changes: AutocompleteChanges<string | undefined>) => {
    const weeklyDaily = changes
      .selectedItems[0] as unknown as HandoverCustomGroupByKeys['weeklyDaily'];

    customGroupByKeys?.setValue({
      ...customGroupByKeys.value,
      weeklyDaily: weeklyDaily || 'Weekly',
    });
  };
  return (
    <>
      <Autocomplete
        key={'plannedForecast'}
        options={['Planned', 'Forecast']}
        label={''}
        initialSelectedOptions={[customGroupByKeys?.value.plannedForecast]}
        // selectedOptions={[customGroupByKeys?.value.plannedForecast]}
        onOptionsChange={handlePlannedForecast}
        hideClearButton
        disablePortal
        aria-expanded={false}
      />

      <Autocomplete
        key={'weeklyDaily'}
        options={['Weekly', 'Daily']}
        label={''}
        initialSelectedOptions={[customGroupByKeys?.value.weeklyDaily]}
        // selectedOptions={[customGroupByKeys?.value.weeklyDaily]}
        onOptionsChange={handleWeeklyDaily}
        hideClearButton
      />
    </>
  );
};
