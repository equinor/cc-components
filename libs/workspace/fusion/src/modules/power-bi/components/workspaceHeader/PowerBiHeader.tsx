import { PageNavigation, PowerBiController } from '@equinor/workspace-powerbi';
import { StyledActionBar } from '../../../../lib/components/Header/actionBar.styles';
import { TabNavigation } from '../../../../lib/integrations/common/components/TabNavigation';
import { FusionPowerBiFilter } from '../FusionPowerBIFilter';
import { Divider } from 'lib/components/divider';
import { InfoPopoverIcon } from 'modules/shared/components/InfoPopover';
import { HeaderIcon, Information, useWorkspaceHeaderComponents } from 'lib';
import { useEffect } from 'react';

type PowerBiHeaderProps = {
  controller: PowerBiController;
  information?: Information;
  usePowerBiFilters?: boolean;
};

export function PowerBiHeader({ controller, information, usePowerBiFilters }: PowerBiHeaderProps) {
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
    <div>
      <StyledActionBar>
        <PageNavigation controller={controller} />
        <TabNavigation />
      </StyledActionBar>
      <FusionPowerBiFilter controller={controller} usePowerBiFilters={usePowerBiFilters} />
    </div>
  );
}
