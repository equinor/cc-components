import { WorkspaceFilter, FilterDataSource } from '@equinor/workspace-filter';
import styled from 'styled-components';
import { useStatusBar } from '../../../lib/integrations/status-bar/hooks/useStatusBar';
import { StyledActionBar } from '../../../lib/components/Header/actionBar.styles';
import { TabNavigation } from '../../../lib/integrations/common/components/TabNavigation';
import { SidesheetConfig } from '../../../lib/integrations/sidesheet';
import { useCreateButton } from '../../../lib/hooks/useCreateButton';
import { HeaderIcon, Information, useWorkspaceHeaderComponents } from 'lib';
import { InfoPopoverIcon } from 'modules/shared/components/InfoPopover';
import { useEffect } from 'react';

type GridHeaderProps<TData extends Record<PropertyKey, unknown>> = {
  dataSource?: FilterDataSource;
  sidesheetConfig?: SidesheetConfig<TData>;
  information?: Information;
};

export function GridHeader<TData extends Record<PropertyKey, unknown>>({
  dataSource,
  sidesheetConfig,
  information,
}: GridHeaderProps<TData>) {
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
    <StyledGridHeader>
      <NavigationBar />
      {dataSource && <WorkspaceFilter />}
    </StyledGridHeader>
  );
}

const StyledGridHeader = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

const NavigationBar = () => {
  const StatusBar = useStatusBar();
  return (
    <StyledActionBar>
      <div>{StatusBar && <StatusBar />}</div>
      <TabNavigation />
    </StyledActionBar>
  );
};
