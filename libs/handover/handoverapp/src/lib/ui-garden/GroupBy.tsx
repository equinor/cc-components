import { Autocomplete } from '@equinor/eds-core-react';
import { ExtendedGardenFields, HandoverCustomGroupByKeys } from '../types';
import { CustomGroupViewProps } from '@equinor/workspace-fusion/garden';
import { HandoverPackage } from '@cc-components/handover/shared';
import styled from 'styled-components';

const StyledContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1em;
`;
export const GardenGroupBy = (
  props: CustomGroupViewProps<
    HandoverPackage,
    ExtendedGardenFields,
    HandoverCustomGroupByKeys
  >
): JSX.Element => {
  const {
    controller: { useCustomGroupByKeys },
  } = props;
  const [customGroupByKeys, setCustomGroupByKeys] = useCustomGroupByKeys();
  return (
    <StyledContainer>
      <Autocomplete
        key={'plannedForecast'}
        options={['Planned', 'Forecast']}
        autoWidth={true}
        hideClearButton={true}
        label={''}
        selectedOptions={[customGroupByKeys?.plannedForecast]}
        onOptionsChange={(changes) =>
          setCustomGroupByKeys({
            weeklyDaily: customGroupByKeys?.weeklyDaily || 'Weekly',
            plannedForecast:
              (changes
                .selectedItems[0] as HandoverCustomGroupByKeys['plannedForecast']) ||
              'Planned',
          })
        }
      />

      <Autocomplete
        key={'weeklyDaily'}
        options={['Weekly', 'Daily']}
        label={''}
        hideClearButton={true}
        autoWidth={true}
        selectedOptions={[customGroupByKeys?.weeklyDaily]}
        onOptionsChange={(changes) =>
          setCustomGroupByKeys({
            plannedForecast: customGroupByKeys?.plannedForecast || 'Planned',
            weeklyDaily:
              (changes.selectedItems[0] as HandoverCustomGroupByKeys['weeklyDaily']) ||
              'Weekly',
          })
        }
      />
    </StyledContainer>
  );
};
