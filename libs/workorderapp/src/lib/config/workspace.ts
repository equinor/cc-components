import { createFusionWorkspace } from '@equinor/workspace-fusion';
import { WorkOrder } from '../types';
import { filterConfig } from './filterConfig';
import { statusBarConfig } from './statusBarConfig';
import { tableConfig } from './tableConfig';

export const Workspace = () =>
  createFusionWorkspace<WorkOrder>(
    { appKey: 'Workorder', getIdentifier: (item) => item.workOrderNumber },
    (config) =>
      config
        .addMiddleware((mediator) => (mediator.dataService.data = workorders))
        .addConfig({
          appColor: 'purple',
          appKey: 'Workorder',
          defaultTab: 'garden',
        })
        .addGrid(tableConfig)
        .addFilter(filterConfig)
        .addStatusBarItems(statusBarConfig)
        .addFusionPowerBI({
          reportUri: 'pp-punch-analytics',
        })
  );
export const workorders = [
  {
    projectIdentifier: 'L.O532C.002',
    workOrderNumber: 'LN0AR6001-01B',
    description: 'Cut Profiles AR600FAS01 -  Nodes FU: AR600NBU516 &amp; AR600NBU520',
    discipline: 'Structural',
    disciplineCode: 'N',
    responsible: 'AKSO Verdal Fabrication',
    responsibleCode: 'KVF',
    milestone: null,
    milestoneCode: null,
    materialStatus: 'M02',
    plannedStartupDate: null,
    w1ActualDate: '2018-12-04T00:00:00+00:00',
    w2ActualDate: '2018-12-04T00:00:00+00:00',
    w3ActualDate: '2018-12-04T00:00:00+00:00',
    w4ActualDate: '2019-01-28T00:00:00+00:00',
    w5ActualDate: null,
    w6ActualDate: '2019-02-12T00:00:00+00:00',
    w7ActualDate: null,
    w8ActualDate: null,
    w9ActualDate: null,
    w10ActualDate: null,
    commpkgNumber: null,
    workOrderId: '115036980',
    materialComments: null,
    constructionComments: null,
    projectProgress: '100.00',
    estimatedHours: '4.60',
    remainingHours: '0.00',
    expendedHours: null,
    mccrStatus: null,
    holdBy: null,
    holdByDescription: null,
    jobStatus: 'W06',
    projectDescription: 'Johan Castberg Facilities Project',
    plannedFinishDate: '2019-02-22',
    actualStartupDate: '2019-02-05',
    actualFinishDate: '2019-02-08',
    commpkgId: null,
  },
];
