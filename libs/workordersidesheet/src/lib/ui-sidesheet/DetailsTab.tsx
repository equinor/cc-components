import {
  materialStatusMap,
  stringCell,
  StyledTabContent,
  StyledTable,
  formatDateString,
  hasProperty,
} from '@cc-components/shared';

import { getWoStatus, WorkOrder } from '@cc-components/workordershared';
type DetailsTabProps = {
  workOrder: WorkOrder | undefined;
};
export const DetailsTab = ({ workOrder }: DetailsTabProps): JSX.Element | null => {
  if (!workOrder) return null;
  return (
    <StyledTabContent>
      <h3>Details</h3>

      <StyledTable>
        <tbody>
          <tr>
            <td>Planned range</td>
            <td>
              {stringCell(
                `${formatDateString(workOrder.plannedStartupDate)} - ${formatDateString(
                  workOrder.plannedFinishDate
                )}`
              )}
            </td>
          </tr>
          <tr>
            <td>Actual range</td>
            <td>
              {workOrder.actualStartupDate
                ? `${formatDateString(workOrder.actualStartupDate)} - `
                : 'Not started - '}
              {workOrder.actualFinishDate
                ? `${formatDateString(workOrder.actualFinishDate)}`
                : 'Not finished'}
            </td>
          </tr>
          <tr>
            <td>Status</td>
            <td>{stringCell(getWoStatus(workOrder))}</td>
          </tr>
          <tr>
            <td>Discipline</td>
            <td>{stringCell(workOrder.discipline)}</td>
          </tr>
          <tr>
            <td>Project</td>
            <td>
              {stringCell(
                `${workOrder.projectIdentifier}, ${workOrder.projectDescription}`
              )}
            </td>
          </tr>
          <tr>
            <td>Responsible</td>
            <td>{stringCell(workOrder.responsibleCode)}</td>
          </tr>
          <tr>
            <td>Milestone</td>
            <td>{stringCell(workOrder.milestone)}</td>
          </tr>
          <tr>
            <td>Project progress</td>
            <td>
              {stringCell(
                workOrder.projectProgress ? `${workOrder.projectProgress}%` : null
              )}
            </td>
          </tr>
          <tr>
            <td>Estimated manhours</td>
            <td>
              {stringCell(
                workOrder.estimatedHours ? `${workOrder.estimatedHours}h` : null
              )}
            </td>
          </tr>
          <tr>
            <td>Remaining manhours</td>
            <td>
              {stringCell(
                workOrder.remainingHours ? `${workOrder.remainingHours}h` : null
              )}
            </td>
          </tr>
          <tr>
            <td>Expended manhours</td>
            <td>
              {stringCell(workOrder.expendedHours ? `${workOrder.expendedHours}h` : null)}
            </td>
          </tr>
          <tr>
            <td>Hold</td>
            <td>
              {workOrder.holdBy} {workOrder.holdByDescription}
            </td>
          </tr>
          <tr>
            <td>Material status</td>
            <td>
              {workOrder.materialStatus}{' '}
              {workOrder.materialStatus !== null &&
                hasProperty(materialStatusMap, workOrder.materialStatus) &&
                materialStatusMap[workOrder.materialStatus]}
            </td>
          </tr>
          <tr>
            <td>Material Comments</td>
            <td>{workOrder.materialComments}</td>
          </tr>
          <tr>
            <td>Construction Comments</td>
            <td>{workOrder.constructionComments}</td>
          </tr>
        </tbody>
      </StyledTable>
    </StyledTabContent>
  );
};
