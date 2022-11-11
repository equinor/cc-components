import { Autocomplete } from '@equinor/eds-core-react';
import { HandoverCustomGroupByKeys } from '../types';
import {} from '@equinor/workspace-fusion/garden';

export const GardenGroupBy = (props: unknown, a: unknown): JSX.Element => {
  console.log(props, a);
  //   const { setCustomGroupKeys, ...parkViewContext } = useParkViewContext();
  //   const customGroupByKeys =
  //     parkViewContext.customGroupByKeys as HandoverCustomGroupByKeys;

  return (
    <>
      {/* <Autocomplete
        key={'plannedForecast'}
        options={['Planned', 'Forecast']}
        label={''}
        selectedOptions={[customGroupByKeys.plannedForecast]}
        onOptionsChange={(changes) =>
          setCustomGroupKeys({
            ...customGroupByKeys,
            plannedForecast: changes.selectedItems[0] || 'Planned',
          })
        }
      />

      <Autocomplete
        key={'weeklyDaily'}
        options={['Weekly', 'Daily']}
        label={''}
        selectedOptions={[customGroupByKeys.weeklyDaily]}
        onOptionsChange={(changes) =>
          setCustomGroupKeys({
            ...customGroupByKeys,
            weeklyDaily: changes.selectedItems[0] || 'Weekly',
          })
        }
      /> */}
    </>
  );
};
