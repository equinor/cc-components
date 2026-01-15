import Workspace from '@equinor/workspace-fusion';
import { powerBiModule } from '@equinor/workspace-fusion/power-bi-module';
import { useFusionContext } from '../hooks/useContext';
import { usePBIOptions } from '../hooks/usePBIOptions';
import { useWorkspaceBookmarks } from '../hooks/useWorkspaceBookmark';
import { useModuleCurrentContext } from '@equinor/fusion-framework-react-module-context';
import { useReportInformation } from '../hooks/useReportInformation';
import { Information, isDynamicInformation, StaticInformation } from '../types/types';

type FusionReportProps = {
  reportId: string;
  config?: {
    table: string;
    column: string;
  };
  information?: Information;
};

const pbi_context_mapping = {
  Facility: {
    column: 'Facility',
    table: 'Dim_Facility',
  },
  ProjectMaster: {
    column: 'ProjectMaster GUID',
    table: 'Dim_ProjectMaster',
  },
} as const;

const defaultInformation: StaticInformation = {
  title: 'Analytics',
  dataSource: 'ProCoSys / Alpha',
  dataRefreshRate: 'Hourly',
  access: 'Internal',
};

export const FusionReport = ({
  reportId,
  config,
  information: informationProp,
}: FusionReportProps) => {
  const contextId = useFusionContext()?.id;
  const { currentContext } = useModuleCurrentContext();
  const pbi_config =
    config ??
    pbi_context_mapping[currentContext?.type.id as keyof typeof pbi_context_mapping];
  const pbi = usePBIOptions(reportId, pbi_config);

  const { bookmarkKey, currentBookmark, onBookmarkChange } = useWorkspaceBookmarks();

  const isAffiliateUser = () => {
    return !window.Fusion.modules.auth.account?.username.endsWith('@equinor.com');
  };

  const dynamicInfo = informationProp && isDynamicInformation(informationProp);
  const { information: fetchedInformation, isLoading } = useReportInformation(
    dynamicInfo ? informationProp.reportUri : '',
    isAffiliateUser()
  );

  const resolveInformation = (): StaticInformation => {
    if (!informationProp) {
      return { ...defaultInformation, isAffiliate: isAffiliateUser() };
    }

    if (isDynamicInformation(informationProp)) {
      if (isLoading || !fetchedInformation) {
        return { ...defaultInformation, isAffiliate: isAffiliateUser() };
      }
      return fetchedInformation;
    }

    return {
      ...informationProp,
      isAffiliate: informationProp.isAffiliate ?? isAffiliateUser(),
    };
  };

  return (
    <Workspace
      key={contextId + (bookmarkKey ?? '')}
      currentBookmark={currentBookmark}
      onBookmarkChange={onBookmarkChange}
      workspaceOptions={{
        getIdentifier: () => '',
        information: resolveInformation(),
      }}
      powerBiOptions={pbi}
      modules={[powerBiModule]}
      usePowerBiFilters={true}
    />
  );
};
