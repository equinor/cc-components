import { createFusionWorkspace } from '@equinor/workspace-fusion';
import { filterConfig, statusBarConfig, tableConfig } from '.';
import { HandoverPackage } from '../types';

export const fusionWorkspaceConfig = () =>
  createFusionWorkspace<HandoverPackage>(
    { appKey: 'Handover', getIdentifier: (item) => item.commpkgNo },
    (config) =>
      config
        .addMiddleware((mediator) => (mediator.dataService.data = handovers))
        .addConfig({
          appColor: 'purple',
          appKey: 'Handover',
          defaultTab: 'grid',
        })
        .addGrid(tableConfig)
        .addFilter(filterConfig)
        .addStatusBarItems(statusBarConfig)
  );

export const handovers: HandoverPackage[] = [
  {
    siteCode: 'JCA',
    projectIdentifier: 'L.O532C.002',
    projectDescription: 'Johan Castberg Facilities Project',
    commpkgNo: '1815-S13',
    description: 'Skrugard Template EC',
    system: '18',
    progress: '97',
    area: 'UEC0',
    commpkgStatus: 'OK',
    mcStatus: 'OK',
    priority1: '',
    priority2: '',
    priority3: '',
    priority1Description: '',
    priority2Description: '',
    priority3Description: '',
    plannedStartDate: '2021/06/01',
    actualStartDate: '2021/04/12',
    plannedFinishDate: '2021/06/01',
    actualFinishDate: '',
    phase: 'COF',
    url: 'https://procosys.equinor.com/JOHAN_CASTBERG/Completion#CommPkg|111910643',
    responsible: 'EQPC',
    id: '111910643',
    hasUnsignedActions: false,
    forecastFinishDate: '',
    volume: 4,
    forecastTacDate: '',
    mcPkgsCount: 3,
    mcPkgsRFCCShippedCount: 3,
    mcPkgsRFCCSigned: 3,
    mcPkgsRFOCShipped: 3,
    mcPkgsRFOCSigned: 0,
    tacIsAccepted: false,
    tacIsShipped: false,
    tacIsRejected: false,
    plannedTacDate: '',
    forecastStartDate: '',
    mcDisciplineCodes: ['A', 'L', 'U'],
    mcDisciplines: null,
    isSubsea: false,
    isDemolition: false,
    demolitionPlannedStartDate: '',
    demolitionForecastStartDate: '',
    demolitionActualStartDate: '',
    demolitionPlannedFinishDate: '',
    demolitionForecastFinishDate: '',
    demolitionActualFinishDate: '',
    createdDate: '2017/11/28',
    remark: '.',
    rfocIsShipped: true,
    rfocIsAccepted: false,
    rfocIsRejected: false,
    rfccIsShipped: true,
    rfccIsAccepted: true,
    rfccIsRejected: false,
    subSystem: '1815',
    isReadyForStartup: false,
    isInOperation: false,
    hasMaintenanceProgram: false,
    hasYellowLineMarkup: false,
    hasBlueLineMarkup: false,
    yellowLineStatus: null,
    blueLineStatus: null,
    hasOperationAgreement: false,
    demolitionDCCAcceptedDate: '',
    demolitionRFRCShippedDate: '',
    tacActualDate: '',
    rfccShippedDate: '2021/04/12',
    rfocPlannedDate: '2021/06/01',
    rfocForecastDate: '',
    rfocActualDate: '',
    rfocShippedDate: '2021/04/13',
    rowKey: '1815-S13',
  },
];
