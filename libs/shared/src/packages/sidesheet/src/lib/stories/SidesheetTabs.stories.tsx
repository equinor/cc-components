import {
  MaterialTab,
  MccrTab,
  McTab,
  NcrTab,
  PunchTab,
  QueryTab,
  SwcrTab,
  UnsignedActionTab,
  UnsignedTaskTab,
  WorkorderTab,
} from '../sidesheet';

export default {
  title: 'Sidesheet tabs',
};

export const Material = () => (
  <MaterialTab
    error={null}
    isFetching={false}
    material={[
      {
        workOrderId: '3',
        itemNumber: '345',
        description: 'Material description 1',
        information: 'Material information 1',
        quantity: '757',
        unit: 'Material unit 1',
        unitDescription: 'Material unitDescription 1',
        status: 'Material status 1',
        statusDescription: 'Material statusDescription 1',
        stockLocation: 'Material stockLocation 1',
        stockLocationDescription: 'Material stockLocationDescription',
        available: 'Y',
      },
      {
        workOrderId: '4',
        itemNumber: '456',
        description: 'Material description 2',
        information: 'Material information 2',
        quantity: '854',
        unit: 'Material unit 2',
        unitDescription: 'Material unitDescription 2',
        status: 'Material status 2',
        statusDescription: 'Material statusDescription 2',
        stockLocation: 'Material stockLocation 2',
        stockLocationDescription: 'Material stockLocationDescription',
        available: 'Y',
      },
    ]}
  />
);

export const Mc = () => (
  <McTab
    error={null}
    isFetching={false}
    mc={[
      {
        mcPkgNo: '585',
        mcPkgId: '358',
        description: 'Mc description 1',
        mcStatus: 'Mc status 1',
        rfccShippedActualDate: '',
        rfccAcceptedActualDate: '',
        rfocIsShipped: true,
        rfocIsAccepted: false,
        rfocIsRejected: true,
        rfccIsShipped: true,
        rfccIsAccepted: true,
        rfccIsRejected: false,
      },
      {
        mcPkgNo: '262',
        mcPkgId: '657',
        description: 'Mc description 2',
        mcStatus: 'Mc status 2',
        rfccShippedActualDate: '',
        rfccAcceptedActualDate: '',
        rfocIsShipped: true,
        rfocIsAccepted: true,
        rfocIsRejected: false,
        rfccIsShipped: true,
        rfccIsAccepted: true,
        rfccIsRejected: false,
      },
    ]}
  />
);

export const Mccr = () => (
  <MccrTab
    error={null}
    isFetching={false}
    mccr={[
      {
        workOrderId: '953',
        tagNumber: '837',
        tagId: '731',
        description: 'Mccr description 1',
        mccrType: 'Mccr type 1',
        mccrStatus: 'Mccr status 1',
        mccrResponsible: 'Mccr responsible 1',
        mccrId: '818',
        mcpkgNumber: '943',
        mcPkgId: '266',
        commpkgId: '639',
        commpkgNumber: '797',
      },
      {
        workOrderId: '141',
        tagNumber: '555',
        tagId: '185',
        description: 'Mccr description 2',
        mccrType: 'Mccr type 2',
        mccrStatus: 'Mccr status 2',
        mccrResponsible: 'Mccr responsible 2',
        mccrId: '545',
        mcpkgNumber: '842',
        mcPkgId: '485',
        commpkgId: '844',
        commpkgNumber: '127',
      },
    ]}
  />
);

export const Ncr = () => (
  <NcrTab
    error={null}
    isFetching={false}
    ncrs={[
      {
        documentId: '1',
        documentNumber: '123',
        title: 'One NCR',
      },
      {
        documentId: '2',
        documentNumber: '321',
        title: 'Two NCR',
      },
    ]}
  />
);

export const Punch = () => (
  <PunchTab
    error={null}
    isFetching={false}
    punches={[
      {
        tagNumber: '958',
        tagId: '657',
        status: 'Punch status 1',
        description: 'Punch description 1',
        toBeClearedBy: 'Unknown :(',
        sorting: 'Up and down',
      },
      {
        tagNumber: '841',
        tagId: '332',
        status: 'Punch status 2',
        description: 'Punch description 2',
        toBeClearedBy: 'Unknown :)',
        sorting: 'Down and up',
      },
    ]}
  />
);

export const Query = () => (
  <QueryTab
    error={null}
    isFetching={false}
    queries={[
      {
        queryNumber: '53',
        queryId: '269',
        title: 'Query title 1',
        status: ' Query status 1',
        nextToSign: 'Next to sign 1',
        type: 'Query type 1',
      },
      {
        queryNumber: '35',
        queryId: '637',
        title: 'Query title 2',
        status: ' Query status 2',
        nextToSign: 'Next to sign 2',
        type: 'Query type 2',
      },
    ]}
  />
);

export const Swcr = () => (
  <SwcrTab
    error={null}
    isFetching={false}
    swcrs={[
      {
        swcrNumber: '722',
        swcrId: '158',
        status: 'Swcr status 1',
        description: 'Swcr description 1',
        priority: 'Swcr priority 1',
      },
      {
        swcrNumber: '366',
        swcrId: '976',
        status: 'Swcr status 2',
        description: 'Swcr description 2',
        priority: 'Swcr priority 2',
      },
    ]}
  />
);

export const UnsignedAction = () => (
  <UnsignedActionTab
    error={null}
    isFetching={false}
    unsignedActions={[
      {
        actionNumber: '436',
        actionId: '168',
        title: 'Unsigned action title 1',
        description: 'Unsigned action description 1',
      },
      {
        actionNumber: '639',
        actionId: '968',
        title: 'Unsigned action title 2',
        description: 'Unsigned action description 2',
      },
    ]}
  />
);

export const UnsignedTask = () => (
  <UnsignedTaskTab
    error={null}
    isFetching={false}
    unsignedTasks={[
      {
        taskNumber: '742',
        taskId: '198',
        title: 'Unsigned task title 1',
      },
      {
        taskNumber: '742',
        taskId: '198',
        title: 'Unsigned task title 2',
      },
    ]}
  />
);

export const Workorder = () => (
  <WorkorderTab
    error={null}
    isFetching={false}
    workorders={[
      {
        actualCompletionDate: 'Not sure',
        discipline: 'Workorder discipline 1',
        estimatedManHours: 150,
        expendedManHours: 10,
        jobStatus: 'Workorder jobstatus 1',
        plannedCompletionDate: '',
        projectProgress: 76,
        remainingManHours: 75,
        title: 'Workorder title 1',
        workOrderId: '950',
        workOrderNo: '590',
        workOrderUrl: '',
      },
      {
        actualCompletionDate: 'Not sure',
        discipline: 'Workorder discipline 2',
        estimatedManHours: 200,
        expendedManHours: 30,
        jobStatus: 'Workorder jobstatus 2',
        plannedCompletionDate: '',
        projectProgress: 53,
        remainingManHours: 35,
        title: 'Workorder title 2',
        workOrderId: '734',
        workOrderNo: '970',
        workOrderUrl: '',
      },
    ]}
  />
);
//TODO: Add the rest of the preconfigured tables under here
