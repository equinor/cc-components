import { tokens } from '@equinor/eds-tokens';
import { WorkflowStepStatus } from '@cc-components/shared';

export const workflowStatusColorMap: Record<WorkflowStepStatus, string> = {
  OS: tokens.colors.ui.background__medium.hex,
  PB: '#ffc107',
  PA: '#ff4081',
  OK: '#00c853',
  IN: tokens.colors.text.static_icons__primary_white.hex,
} as const;


export const workflowStatusTextColorMap: Record<WorkflowStepStatus, string> = {
  OS: tokens.colors.text.static_icons__default.hex,
  PB: tokens.colors.text.static_icons__default.hex,
  PA: tokens.colors.text.static_icons__primary_white.hex,
  OK: tokens.colors.text.static_icons__primary_white.hex,
  IN: tokens.colors.ui.background__medium.hex
} as const; 