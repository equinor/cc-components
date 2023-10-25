import { WorkflowStep } from 'libs/scopechangerequestshared/dist/src';

export const mockWorkflows: WorkflowStep[] = [
  {
    id: '97c95938-c36c-423b-1645-08dbcfbe11e2',
    name: 'Initiate',
    order: 0,
    isCurrent: false,
    isCompleted: true,
    criterias: [
      {
        id: '380f5530-32bc-4877-3141-08dbcfbe11f0',
        type: 'RequireProcosysUserSignature',
        value: 'fea70f7c-507c-48bf-95c7-1fb52f629b4c',
        valueDescription: 'JTAKL@EQUINOR.COM',
        signedAtUtc: 'null',
        signedBy: {
          id: '00000000-0000-0000-0000-000000000000',
          oid: '00000000-0000-0000-0000-000000000000',
          firstName: 'null',
          lastName: 'null',
          email: 'null',
        },
        signedComment: 'null',
        signedState: 'null',
      },
    ],
    contributors: [],
  },
  {
    id: '37a2e3eb-bdd8-4869-1646-08dbcfbe11e2',
    name: 'Approval',
    order: 1,
    isCurrent: false,
    isCompleted: true,
    criterias: [
      {
        id: '2cc854eb-88fc-46d7-3142-08dbcfbe11f0',
        type: 'RequireProcosysFunctionalRoleSignature',
        value: 'SCC - Engineering Manager',
        valueDescription: 'SCC - Engineering Manager',
        signedAtUtc: 'null',
        signedBy: {
          id: '00000000-0000-0000-0000-000000000000',
          oid: '00000000-0000-0000-0000-000000000000',
          firstName: 'null',
          lastName: 'null',
          email: 'null',
        },
        signedComment: 'null',
        signedState: 'null',
      },
    ],
    contributors: [],
  },
  {
    id: 'fab0e890-a7c3-4685-1647-08dbcfbe11e2',
    name: 'Engineering recipient',
    order: 2,
    isCurrent: true,
    isCompleted: false,
    criterias: [
      {
        id: '6d32954d-478e-4985-3143-08dbcfbe11f0',
        type: 'RequireProcosysFunctionalRoleSignature',
        value: 'SCC - AKSO EPma',
        valueDescription: 'SCC - AKSO EPma',
        signedAtUtc: 'null',
        signedBy: {
          id: '00000000-0000-0000-0000-000000000000',
          oid: '00000000-0000-0000-0000-000000000000',
          firstName: 'null',
          lastName: 'null',
          email: 'null',
        },
        signedComment: 'null',
        signedState: 'null',
      },
    ],
    contributors: [],
  },
];
