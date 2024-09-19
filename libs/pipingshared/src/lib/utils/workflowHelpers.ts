import { BaseStatus, workflowStatusColorMap, workflowStatusTextColorMap, WorkflowStep } from "@cc-components/shared";
import { PipetestWorkflowStep } from "../types";


export const mapWorkflowStepsToStep = (workflowSteps: PipetestWorkflowStep[]): WorkflowStep[] => {
    return workflowSteps.map((step) => {
        return {
            color: workflowStatusColorMap[step.status as BaseStatus],
            textColor: workflowStatusTextColorMap[step.status as BaseStatus],
            circleText: step.stepValue,
            popoverText: `${step.stepName}, ${step.status}`,
            status: step.status,
            isActive: step.status !== 'IN',
        };
    });
};