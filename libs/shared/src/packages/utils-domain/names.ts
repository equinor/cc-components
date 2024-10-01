export const domainNames = {
  // General
  area: 'Area',
  location: 'Tag Location',
  category: 'Category',
  checklist: 'Checklist',
  completionStatus: 'Completion Status',
  contract: 'Contract',
  currentStep: 'Current Step',
  disciplineCode: 'Discipline Code',
  discipline: 'Discipline',
  disciplines: 'Disciplines',
  facility: 'Facility',
  forecast: 'Forecast',
  functionalSystem: 'Functional System',
  identifier: 'Identifier',
  manHours: 'Man Hours',
  material: 'Material',
  milestone: 'Milestone',
  overdue: 'Overdue',
  phase: 'Phase',
  planned: 'Planned',
  priority1: 'Priority 1',
  priority2: 'Priority 2',
  priority3: 'Priority 3',
  priority: 'Priority',
  progress: 'Progress',
  project: 'Project',
  responsible: 'Responsible',
  status: 'Status',
  supplier: 'Supplier',
  system: 'System',
  systems: 'Systems',
  tagStatus: 'Tag Status',
  tag: 'Tag',
  wbs: 'WBS',
  estimate: 'Estimate',
  createdDate: 'Created Date',

  // Commissioning package
  commArea: `Comm ${'Area'}`,
  commIdentifier: 'Comm Identifier',
  commLocation: `Comm ${'Area'}`,
  commPhase: 'Comm Phase',
  commPkg: 'Comm Pkg',
  commPkgStatus: `Comm Pkg Status`,
  commPriority1: `Comm Priority 1`,
  commPriority2: `Comm Priority 2`,
  commPriority3: `Comm Priority 3`,
  commSubSystem: `Comm Sub${'System'}`,
  commSystem: `Comm ${'System'}`,
  commSystems: `Comm Systems`,

  // Mechanical completion package
  mcDiscipline: `MC Discipline`,
  mcDisciplines: `MC Disciplines`,
  mcLocation: `MC ${'Location'}`,
  mcPhase: `MC ${'Phase'}`,
  mcPkg: 'Mc Pkg',
  mcResponsible: `MC ${'Responsible'}`,
  mcStatus: 'MC Status',
  mcHandoverStatus: 'MC Handover Status',

  // Punch
  punch: 'Punch',
  verified: 'Verified',
  verifiedDate: 'Verified Date',
  handoverPlan: 'Handover Plan',
  materialEstimate: 'PL Material Est',
  materialRequired: 'PL Material Req',
  clearingBy: 'PL Clearing by Org',
  hasWorkorder: 'PL HasWO',
  punchPriority: `PL ${'Priority'}`,
  punchStatus: `PL ${'Status'}`,
  punchCategory: `PL ${'Category'}`,
  punchSorting: 'PL Sorting',
  punchType: 'PL Type',
  raisedBy: 'PL Raised by Org',
  clearedDate: 'Cleared Date',

  // Loop
  contentMCStatus: 'Content MC Status',
  remainingManHours: 'Remaining Man Hours',
  loopTag: `Loop ${'Tag'}`,
  plannedMcComplete: 'Planned MC complete',

  // Checklist
  checklistStatus: `Checklist Status`,
  mccrStatus: `Checklist Status`,
  formGroup: 'Form Group',
  formType: 'Form Type',
  formResponsible: 'Form Responsible',
  formDiscipline: 'Form Discipline',

  // SWCR
  action: 'Action',
  automationControlSystem: 'Automation Control System',
  estimatedManHours: `Estimated ${'Man Hours'}`,
  lastSignedBy: 'Last Signed By',
  lastSignedByRole: 'Last Signed By Role',
  lastSignedRanking: 'Last Signed Ranking',
  nextSignBy: 'Next Sign By',
  nextToSignRole: 'Next To Sign Role',
  nodeIdentifier: `Node ${'Identifier'}`,
  types: 'Types',
  softwareChangeRequests: 'Software Change Requests',
  handoverStatus: 'Handover Status',
  swcrContract: `SWCR Contract`,
  swcrStatus: 'SWCR Status',
  swcrSupplier: 'SWCR Supplier',
  swcrFunctionalSystem: 'SWCR Functional System',
  swcrPriority: 'SWCR Priority',
  swcrControlSystem: 'SWCR Control System',
  swcrTypes: 'SWCR Types',
  swcrNodeIdentifier: 'SWCR Node Identifier',
  swcrAction: 'SWCR Action',

  // Workorder
  workorder: 'Workorder',
  finalizingOfWorkordersAtSite: 'Finalizing Of Workorders At Site',
  hold: 'WO Hold',
  hoursReadyForExecutionAtSite: 'Hours Ready For Execution At Site',
  jobStatus: 'WO Job Status',
  materialStatus: 'WO Material Status',
  onOrOffshore: 'WO On/Offshore',
  typeOfWork: 'WO Type Of Work',
  workorderPlannedEndAfterC01: 'Is Workorder Planned End After C01',
  workorderProduction: 'WO Production',
  workorderType: 'WO Type',
  workorderDiscipline: 'WO Discipline',
  workorderResponsible: 'WO Responsible',
  workorderStatus: 'WO Status',
  workorderMilestone: 'WO Milestone',
  workorderProgress: 'WO Progress',
  workorderLocation: 'WO Location',
  workorderWBS: 'WO WBS',

  // Pipetest
  pipetest: 'Pipetest',

  // Heat-trace
  checklistStep: `Checklist Step`,
  criticalLines: 'Critical Lines',
  dueDateTimePeriod: 'Due Date Time Period',
  htCableExposed: 'HT Cable Exposed',
  isolated: 'Isolated',

  // Electrical
  cable: 'Cable',
  circuit: 'Circuit',
  disconnected: 'Disconnected',
  switchboard: 'Switchboard',

  // Dates
  closedDate: 'Closed Date',
  dueDate: 'Due Date',
  dcc: 'DCC',
  rfcc: 'RFCC',
  rfcForecastDate: `RFCC Forecast Date`,
  rfcPlannedDate: `RFCC Planned Date`,
  rfoc: 'RFOC',
  rfoForecastDate: `RFOC Forecast Date`,
  rfoPlannedDate: `RFOC Planned Date`,
  rfrc: 'RFRC',
  tac: 'TAC',
} as const;
