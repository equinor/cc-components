import {
  StyledTabContent,
  StyledTable,
  stringCell,
} from '@cc-components/shared/sidesheet';
import { Punch } from '@cc-components/punchshared';
import { StyledTextBlock } from './sidesheet.styles';
import { formatDateString } from '@cc-components/shared/utils-dates';
import { domainNames } from '@cc-components/shared';

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
            <td>{domainNames.punchCategory}</td>
            <td>{stringCell(punch.category)}</td>
          </tr>
          <tr>
            <td>{domainNames.punchStatus}</td>
            <td>{stringCell(punch.status)}</td>
          </tr>
          <tr>
            <td>{domainNames.commPriority1}</td>
            <td>{stringCell(punch.priority1)}</td>
          </tr>
          <tr>
            <td>{domainNames.commPriority2}</td>
            <td>{stringCell(punch.priority2)}</td>
          </tr>
          <tr>
            <td>{domainNames.commPriority3}</td>
            <td>{stringCell(punch.priority3)}</td>
          </tr>
          <tr>
            <td>{domainNames.punchSorting}</td>
            <td>{stringCell(punch.sorting)}</td>
          </tr>
          <tr>
            <td>{domainNames.punchType}</td>
            <td>{stringCell(punch.type)}</td>
          </tr>
          <tr>
            <td>{domainNames.estimate}</td>
            <td>
              {stringCell(punch.estimate !== null ? punch.estimate.toString() : null)}
            </td>
          </tr>
          <tr>
            <td>{domainNames.raisedBy}</td>
            <td>{stringCell(punch.raisedBy)}</td>
          </tr>
          <tr>
            <td>{domainNames.clearingBy}</td>
            <td>{stringCell(punch.clearedBy)}</td>
          </tr>
          <tr>
            <td>{domainNames.clearedDate}</td>
            <td>{stringCell(formatDateString(punch.clearedAtDate))}</td>
          </tr>
          <tr>
            <td>{domainNames.verifiedDate}</td>
            <td>{stringCell(formatDateString(punch.verifiedAtDate))}</td>
          </tr>
          <tr>
            <td>{domainNames.handoverPlan}</td>
            <td>{stringCell(formatDateString(punch.handoverPlan))}</td>
          </tr>
          <tr>
            <td>{domainNames.dueDate}</td>
            <td>{stringCell(formatDateString(punch.dueDate))}</td>
          </tr>
          <tr>
            <td>{domainNames.materialRequired}</td>
            <td>{stringCell(punch.materialRequired ? 'Yes' : 'No')}</td>
          </tr>
          <tr>
            <td>{domainNames.materialEstimate}</td>
            <td>{stringCell(formatDateString(punch.materialEstimatedTimeOfArrival))}</td>
          </tr>
          <tr>
            <td>{domainNames.createdDate}</td>
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
            <td>{domainNames.formType}</td>
            <td>{stringCell(punch.formularType)}</td>
          </tr>
          <tr>
            <td>{domainNames.formGroup}</td>
            <td>{stringCell(punch.formularGroup)}</td>
          </tr>
          <tr>
            <td>{domainNames.formDiscipline}</td>
            <td>{stringCell(punch.formularDiscipline)}</td>
          </tr>
        </tbody>
      </StyledTable>
    </StyledTabContent>
  );
};
