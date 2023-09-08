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
/*

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
        mechanicalCompletionPackageNo: '585',
        mcPkgId: '358',
        description: 'Mc description 1',
        mechanicalCompletionStatus: 'Mc status 1',
        rfccShippedActualDate: '',
        rfccAcceptedActualDate: '',
        rfO_Status: 'Accepted',
        rfC_Status: 'Accepted',
      },
      {
        mechanicalCompletionPackageNo: '262',
        mcPkgId: '657',
        description: 'Mc description 2',
        mechanicalCompletionStatus: 'Mc status 2',
        rfccShippedActualDate: '',
        rfccAcceptedActualDate: '',
        rfO_Status: 'Accepted',
        rfC_Status: 'Accepted',
        rfocIsRejected: false,
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
        commissioningPackageId: 'eac31fa6-2780-01bc-e053-2410000a10d9',
        commissioningPackageUrl:
          'https://procosys.equinor.com/JOHAN_CASTBERG/Completion#CommPkg|111883186',
        commissioningPackageUrlId: '111883186',
        commpkgId: 'eac31fa6-2780-01bc-e053-2410000a10d9',
        commpkgNumber: '2350-M01',
        description: 'Heat Trace B-Test 2304-L005',
        facility: 'JCA',
        mcPkgId: 'eac31fae-d51c-01bc-e053-2410000a10d9',
        mccrId: 'ed187f41-fca2-c84b-e053-2810000a69dd',
        mccrResponsible: 'KSI',
        mccrStatus: 'OK',
        mccrType: 'ELE19.2JCA',
        mccrUrlId: '24157060',
        mcpkgNumber: '2350-E003',
        mechanicalCompletionPackageUrl:
          'https://procosys.equinor.com/JOHAN_CASTBERG/Completion#McPkg|114866568',
        mechanicalCompletionPackageUrlId: '114866568',
        project: 'L.O532C.002',
        tagId: 'edf5c7dd-62e5-2006-e053-2710000ad705',
        tagNumber: 'HT230407D',
        tagUrl: 'https://procosys.equinor.com/JOHAN_CASTBERG/Completion#Tag|114435803',
        tagUrlId: '114435803',
        workOrderId: 'edf5c7f9-d729-2006-e053-2710000ad705',
        workOrderUrl:
          'https://procosys.equinor.com/JOHAN_CASTBERG/WorkOrders/WorkOrder#id=115025714',
        workOrderUrlId: '115025714',
      },
      {
        commissioningPackageId: 'eac31fa6-2780-01bc-e053-2410000a10d9',
        commissioningPackageUrl:
          'https://procosys.equinor.com/JOHAN_CASTBERG/Completion#CommPkg|111883186',
        commissioningPackageUrlId: '111883186',
        commpkgId: 'eac31fa6-2780-01bc-e053-2410000a10d9',
        commpkgNumber: '2350-M01',
        description: 'Heat Trace B-Test 2304-L005',
        facility: 'JCA',
        mcPkgId: 'eac31fae-d51c-01bc-e053-2410000a10d9',
        mccrId: 'ed187f41-fc92-c84b-e053-2810000a69dd',
        mccrResponsible: 'KSI',
        mccrStatus: 'OK',
        mccrType: 'ELE19.2JCA',
        mccrUrlId: '24157044',
        mcpkgNumber: '2350-E003',
        mechanicalCompletionPackageUrl:
          'https://procosys.equinor.com/JOHAN_CASTBERG/Completion#McPkg|114866568',
        mechanicalCompletionPackageUrlId: '114866568',
        project: 'L.O532C.002',
        tagId: 'edf5c7dd-62e0-2006-e053-2710000ad705',
        tagNumber: 'HT230405B',
        tagUrl: 'https://procosys.equinor.com/JOHAN_CASTBERG/Completion#Tag|114435798',
        tagUrlId: '114435798',
        workOrderId: 'edf5c7f9-d729-2006-e053-2710000ad705',
        workOrderUrl:
          'https://procosys.equinor.com/JOHAN_CASTBERG/WorkOrders/WorkOrder#id=115025714',
        workOrderUrlId: '115025714',
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
        url: '',
      },
      {
        documentId: '2',
        documentNumber: '321',
        title: 'Two NCR',
        url: '',
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
        tagNo: '958',
        tagUrlId: '657',
        tagUrl:"12345678",
        category: 'Punch status 1',
        description: 'Punch description 1',
        clearedBy: 'Unknown :(',
        sorting: 'Up and down',
        url: '',
      },
      {
        tagNo: '841',
        tagUrlId: '332',
        tagUrl:"12345678",
        category: 'Punch status 2',
        description: 'Punch description 2',
        clearedBy: 'Unknown :)',
        sorting: 'Down and up',
        url: '',
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
        queryNo: '53',
        queryId: '269',
        title: 'Query title 1',
        queryStatus: ' Query status 1',
        nextToSign: 'Next to sign 1',
        queryType: 'Query type 1',
      },
      {
        queryNo: '35',
        queryId: '637',
        title: 'Query title 2',
        queryStatus: ' Query status 2',
        nextToSign: 'Next to sign 2',
        queryType: 'Query type 2',
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
        url: '',
      },
      {
        swcrNumber: '366',
        swcrId: '976',
        status: 'Swcr status 2',
        description: 'Swcr description 2',
        priority: 'Swcr priority 2',
        url: '',
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
        url: '',
      },
      {
        actionNumber: '639',
        actionId: '968',
        title: 'Unsigned action title 2',
        description: 'Unsigned action description 2',
        url: '',
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
        url: '',
      },
      {
        taskNumber: '742',
        taskId: '198',
        title: 'Unsigned task title 2',
        url: '',
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
*/