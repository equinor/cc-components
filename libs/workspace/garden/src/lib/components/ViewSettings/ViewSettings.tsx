import { Button, Icon } from '@equinor/eds-core-react';
import { expand, collapse } from '@equinor/eds-icons';
import { ReactElement } from 'react';
import { usePersistedState } from '@equinor/workspace-core';
import { GroupingSelector } from '../GroupingSelector/GroupingSelector';
import { StyledViewSettings } from './viewSettings.styles';

const VIEW_SETTINGS_EXPANDED_KEY = 'workspace.garden.viewSettingsExpanded';
const LEGACY_VIEW_SETTINGS_EXPANDED_KEY = 'WorkspaceSidebarToggleState';
const parseLegacyToggle = (raw: string) => !!JSON.parse(raw);

interface ViewSettingsProps<TData extends Record<PropertyKey, unknown>, TContext = undefined> {
  groupingKeys: string[];
  timeInterval: string | null;
  dateVariant: string | null;
  onChangeTimeInterval: (timeInterval: string | null) => void;
  onChangeDateVariant: (dateVariant: string | null) => void;
  setGroupingKeys: (keys: string[]) => void;
}

Icon.add({ expand, collapse });

export function ViewSettings<TData extends Record<PropertyKey, unknown>, TContext = undefined>({
  groupingKeys,
  timeInterval,
  dateVariant,
  onChangeTimeInterval,
  onChangeDateVariant,
  setGroupingKeys,
}: ViewSettingsProps<TData, TContext>): ReactElement | null {
  const { value, setValue } = usePersistedState<boolean>(VIEW_SETTINGS_EXPANDED_KEY, {
    legacyKey: LEGACY_VIEW_SETTINGS_EXPANDED_KEY,
    parseLegacy: parseLegacyToggle,
  });
  const toggle = value ?? true;

  const onChangeToggle = (state: boolean) => setValue(state);

  return (
    <StyledViewSettings expanded={toggle}>
      {toggle ? (
        <>
          <div style={{ display: 'flex', width: '100%', alignItems: 'center', justifyContent: 'space-between' }}>
            <Button variant="ghost_icon" onClick={() => onChangeToggle(!toggle)}>
              <Icon data={expand}></Icon>
            </Button>
            <p style={{ marginRight: '10px', fontSize: '16px', fontWeight: '500' }}>View Settings</p>
          </div>
          <GroupingSelector
            groupingKeys={groupingKeys}
            setGroupingKeys={setGroupingKeys}
            timeInterval={timeInterval}
            onChangeTimeInterval={onChangeTimeInterval}
            dateVariant={dateVariant}
            onChangeDateVarient={onChangeDateVariant}
          />
        </>
      ) : (
        <>
          <Button variant="ghost_icon" onClick={() => onChangeToggle(!toggle)} style={{ paddingLeft: '0' }}>
            <Icon data={collapse}></Icon>
          </Button>
        </>
      )}
    </StyledViewSettings>
  );
}
