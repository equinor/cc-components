import { McPackage } from '@cc-components/mechanicalcompletionshared';
import {
  stringCell,
  StyledTabContent,
  StyledTable,
} from '@cc-components/shared/sidesheet';
import { formatDateString } from '@cc-components/shared/utils-dates';

type DetailsTabProps = {
  mcPackage?: McPackage;
};
export const DetailsTab = ({ mcPackage }: DetailsTabProps) => {
  if (!mcPackage) return null;
  return (
    <StyledTabContent>
      <h3>Details</h3>
      <StyledTable>
        <tbody>
          <tr>
            <td>Project</td>
            <td>
              {stringCell(
                `${mcPackage.projectDescription} (${mcPackage.mechanicalCompletionPackageNo})`
              )}
            </td>
          </tr>
          <tr>
            <td>MC Package Responsible</td>
            <td>{stringCell(mcPackage.responsible)}</td>
          </tr>
          <tr>
            <td>MC Package Discipline</td>
            <td>
              {stringCell(`${mcPackage.discipline} ${mcPackage.disciplineDescription}`)}
            </td>
          </tr>
          <tr>
            <td>MC Package Area</td>
            <td>{stringCell(mcPackage.location)}</td>
          </tr>
          <tr>
            <td>MC Package Phase</td>
            <td>{stringCell(mcPackage.mechanicalCompletionPhase)}</td>
          </tr>
          <tr>
            <td>Commissioning Package</td>
            <td>{stringCell(mcPackage.commissioningPackageNo)}</td>
          </tr>
          <tr>
            <td>System</td>
            <td>{stringCell(mcPackage.system)}</td>
          </tr>
          <tr>
            <td>Subsystem</td>
            <td>{stringCell(mcPackage.subSystem)}</td>
          </tr>
          <tr>
            <td>Remark</td>
            <td>{stringCell(mcPackage.remark)}</td>
          </tr>
          <tr>
            <td>Contractor Final Punch Actual date (M01)</td>
            <td>{stringCell(formatDateString(mcPackage.finalPunchActualDate))}</td>
          </tr>
          <tr>
            <td>Punch Status Accepted Actual Date (M02)</td>
            <td>{stringCell(formatDateString(mcPackage.punchAcceptedActualtDate))}</td>
          </tr>
          <tr>
            <td>RFC MC to Commissioning Actual Date (M03)</td>
            <td>{stringCell(formatDateString(mcPackage.rfC_ForecastDate))}</td>
          </tr>
          <tr>
            <td>RFCC Accepted (M04)</td>
            <td>{stringCell(formatDateString(mcPackage.rfC_ActualDate))}</td>
          </tr>
          <tr>
            <td>Commissioning Priority 1</td>
            <td>{stringCell(mcPackage.priority1)}</td>
          </tr>
          <tr>
            <td>Commissioning Priority 2</td>
            <td>{stringCell(mcPackage.priority2)}</td>
          </tr>
          <tr>
            <td>Commissioning Priority 3</td>
            <td>{stringCell(mcPackage.priority3)}</td>
          </tr>
        </tbody>
      </StyledTable>

      <h3>Milestones</h3>
      <StyledTable>
        <thead>
          <tr>
            <th></th>
            <th>Planned</th>
            <th>Forecast</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Final punch (M01)</td>
            <td>{stringCell(formatDateString(mcPackage.finalPunchPlannedDate))}</td>
            <td>{stringCell(formatDateString(mcPackage.finalPunchForecastDate))}</td>
          </tr>
          <tr>
            <td>RFCC (M03)</td>
            <td>{stringCell(formatDateString(mcPackage.rfC_PlannedDate))}</td>
            <td>{stringCell(formatDateString(mcPackage.rfC_ForecastDate))}</td>
          </tr>
          <tr>
            <td>TAC (C06)</td>
            <td>{stringCell(formatDateString(mcPackage.taC_PlannedDate))}</td>
            <td>{stringCell(formatDateString(mcPackage.taC_ForecastDate))}</td>
          </tr>
          <tr>
            <td>RFOC (M07)</td>
            <td>{stringCell(formatDateString(mcPackage.rfO_PlannedDate))}</td>
            <td>{stringCell(formatDateString(mcPackage.rfO_ForecastDate))}</td>
          </tr>
        </tbody>
      </StyledTable>
    </StyledTabContent>
  );
};
