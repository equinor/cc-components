import {
  formatDateString,
  materialStatusMap,
  StyledTabContent,
  StyledTable,
  stringCell,
  hasProperty,
} from '@cc-components/shared';
import { getWoStatus, WorkOrder } from '@cc-components/workordershared';
import { Punch } from '@cc-components/punchshared';

type DetailsTabProps = {
  punch: Punch | undefined;
};
export const DetailsTab = ({ punch }: DetailsTabProps): JSX.Element | null => {
  if (!punch) return null;
  return (
    <StyledTabContent>
      <h3>Details</h3>

      <StyledTable>
        <tbody>
          <tr>
            <td>Category</td>
            <td>{stringCell(punch.category)}</td>
          </tr>
          <tr>
            <td>Status</td>
            <td>{stringCell(punch.status)}</td>
          </tr>
          <tr>
            <td>Priorty</td>
            <td>{stringCell(punch.priority)}</td>
          </tr>
          <tr>
            <td>Sorting</td>
            <td>{stringCell(punch.sorting)}</td>
          </tr>
          <tr>
            <td>Type</td>
            <td>{stringCell(punch.type)}</td>
          </tr>
          <tr>
            <td>Estimate</td>
            <td>{punch.estimate}</td>
          </tr>
          <tr>
            <td>Raised by</td>
            <td>{stringCell(punch.raisedBy)}</td>
          </tr>
          <tr>
            <td>Clearing by</td>
            <td>{stringCell(punch.cleardBy)}</td>
          </tr>
          <tr>
            <td>Cleared date</td>
            <td>{stringCell(formatDateString(punch.clearedAtDate))}</td>
          </tr>
          <tr>
            <td>Verified date</td>
            <td>{stringCell(formatDateString(punch.verifiedAtDate))}</td>
          </tr>
          <tr>
            <td>Handover plan</td>
            <td>{stringCell(formatDateString(punch.handoverPlan))}</td>
          </tr>
          <tr>
            <td>Due date</td>
            <td>{stringCell(formatDateString(punch.dueDate))}</td>
          </tr>
          <tr>
            <td>Material requried</td>
            <td>{punch.materialRequired}</td>
          </tr>
          <tr>
            <td>Material est. arrival</td>
            <td>{stringCell(formatDateString(punch.materialEstimatedTimeOfArrival))}</td>
          </tr>
          <tr>
            <td>Created date</td>
            <td>{stringCell(formatDateString(punch.createdDate))}</td>
          </tr>
          <tr>
            <td>Description</td>
            <td>{stringCell(punch.description)}</td>
          </tr>
        </tbody>
      </StyledTable>
    </StyledTabContent>
  );
};
