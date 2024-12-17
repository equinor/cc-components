import { AssignedTo } from "./sheared";

export interface PimsTask {
  id: string;
  title: string;
  category: string;
  url: string;
  assignedTo: AssignedTo;
  createdDate: string;
  targetDate: string;
  deadlineDate: string;
  isOverdue: boolean;
  daysOverdue: number;
  daysUntilDue: number;
  domain: string;
  projectMaster: ProjectMaster;
  taskTypeKey: string;
}

interface ProjectMaster {
  contextId: string;
  externalId: string;
  cvpId: string;
  documentManagementId: string;
  name: string;
}


