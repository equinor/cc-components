import { WorkspaceFilter, FilterDataSource } from '@equinor/workspace-filter';
import styled from 'styled-components';
import { StyledActionBar, StyledActionBarRight } from '../../../../lib/components/Header/actionBar.styles';
import { TabNavigation } from '../../../../lib/integrations/common/components/TabNavigation';
import { useStatusBar } from '../../../../lib/integrations/status-bar';
import { useCreateButton } from '../../../../lib/hooks/useCreateButton';
import { SidesheetConfig } from '../../../../lib/integrations/sidesheet';
import { InfoPopoverIcon } from 'modules/shared/components/InfoPopover';
import { HeaderIcon, Information, TabButtonDivider, useWorkspaceHeaderComponents } from 'lib';
import { Divider } from 'lib/components/divider';
import { useEffect } from 'react';

type GardenWorkspaceHeaderProps<
  TData extends Record<PropertyKey, unknown>,
  TExtendedFields extends string,
  TCustomGroupByKeys extends Record<PropertyKey, unknown>,
  TContext,
> = {
  dataSource?: FilterDataSource;
  sidesheetConfig?: SidesheetConfig<TData>;
  information?: Information;
};

export function GardenWorkspaceHeader<
  TData extends Record<PropertyKey, unknown>,
  TExtendedFields extends string,
  TCustomGroupByKeys extends Record<PropertyKey, unknown>,
  TContext,
>({
  dataSource,
  sidesheetConfig,
  information,
}: GardenWorkspaceHeaderProps<TData, TExtendedFields, TCustomGroupByKeys, TContext>) {
  useCreateButton(sidesheetConfig);

  const { setIcons } = useWorkspaceHeaderComponents();

  const icon: HeaderIcon = {
    name: 'info',
    Icon: () => <InfoPopoverIcon information={information!} />,
    placement: 'left',
    type: 'button',
  };

  useEffect(() => {
    if (information) {
      setIcons((icons) => [...icons, icon]);
    }
    return () => {
      setIcons((icons) => icons.filter((i) => i.name !== icon.name));
    };
  }, []);

  return (
    <StyledGardenHeader>
      <NavigationBar />
      {dataSource && <WorkspaceFilter />}
    </StyledGardenHeader>
  );
}

const StyledGardenHeader = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

function NavigationBar() {
  const StatusBar = useStatusBar();

  return (
    <StyledActionBar>
      <div>{StatusBar && <StatusBar />}</div>
      <TabNavigation />
    </StyledActionBar>
  );
}
