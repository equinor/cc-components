import {
  StyledTabContent,
  StyledTable,
  stringCell,
} from '@cc-components/shared/sidesheet';
import { Punch } from '@cc-components/punchshared';
import { StyledTextBlock } from './sidesheet.styles';
import { formatDateString } from '@cc-components/shared/utils-dates';

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
            <td>
              {stringCell(punch.estimate !== null ? punch.estimate.toString() : null)}
            </td>
          </tr>
          <tr>
            <td>Raised by</td>
            <td>{stringCell(punch.raisedBy)}</td>
          </tr>
          <tr>
            <td>Clearing by</td>
            <td>{stringCell(punch.clearedBy)}</td>
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
            <td>{stringCell(punch.materialRequired ? 'Yes' : 'No')}</td>
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
            <td>
              {punch.description ? (
                <StyledTextBlock>
                  <pre>{punch.description}</pre>
                </StyledTextBlock>
              ) : (
                'N/A'
              )}
            </td>
          </tr>
        </tbody>
      </StyledTable>

      <h3>Checklist</h3>

      <StyledTable>
        <tbody>
          <tr>
            <td>Form type</td>
            <td>{stringCell(punch.formularType)}</td>
          </tr>
          <tr>
            <td>Form group</td>
            <td>{stringCell(punch.formularGroup)}</td>
          </tr>
          <tr>
            <td>Form discipline</td>
            <td>{stringCell(punch.formularDiscipline)}</td>
          </tr>
        </tbody>
      </StyledTable>
    </StyledTabContent>
  );
};
