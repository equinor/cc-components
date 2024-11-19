import { AssignedTo } from "./sheared";

export interface ProcosysTasks {
    id: string;
    title: string;
    category: string;
    url: string;
    assignedTo: AssignedTo;
    siteCode: string;
    projectIdentifier: string;
    projectDescription: string;
    todo: string;
    todoDescription: string;
    description: string;
    responsibilityType: string;
    dueDate: string;
    subCategory: string;
    taskTypeKey: string;
}

