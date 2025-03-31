import { HandoverPackage } from '@cc-components/handovershared';
import {
  stringCell,
  StyledTabContent,
  StyledTable,
} from '@cc-components/shared/sidesheet';
import { LinkCell } from '@cc-components/shared/table-helpers';
import { formatDateString } from '@cc-components/shared/utils-dates';

type DetailsTabProps = {
  commpkg: HandoverPackage;
};

export const DetailsTab = ({ commpkg }: DetailsTabProps) => {
  return (
    <StyledTabContent>
      <h3>Details</h3>
      <StyledTable>
        <tbody>
          <tr>
            <td>Project</td>
            <td>
              {stringCell(`${commpkg.projectDescription} (${commpkg.projectIdentifier})`)}
            </td>
          </tr>
          <tr>
            <td>Comm Pkg Responsible</td>
            <td>{stringCell(commpkg.responsible)}</td>
          </tr>
          <tr>
            <td>Comm Pkg Discipline</td>
            <td>{stringCell(commpkg.mcDisciplines)}</td>
          </tr>
          <tr>
            <td>Comm Pkg Area</td>
            <td>{stringCell(commpkg.location)}</td>
          </tr>
          <tr>
            <td>Comm Pkg Phase</td>
            <td>{stringCell(commpkg.phase)}</td>
          </tr>
          <tr>
            <td>System</td>
            <td>{stringCell(commpkg.system)}</td>
          </tr>
          <tr>
            <td>Comm Pkg Tags</td>
            <td>{stringCell(commpkg.volume ? commpkg.volume.toString() : '0')}</td>
          </tr>
          <tr>
            <td>Remark</td>
            <td>{stringCell(commpkg.remark)}</td>
          </tr>
          <tr>
            <td>Commissioning Priority 1</td>
            <td>{stringCell(commpkg.priority1 ? commpkg.priority1.toString() : '-')}</td>
          </tr>
          <tr>
            <td>Commissioning Priority 2</td>
            <td>{stringCell(commpkg.priority2 ? commpkg.priority2.toString() : '-')}</td>
          </tr>
          <tr>
            <td>Commissioning Priority 3</td>
            <td>{stringCell(commpkg.priority3 ? commpkg.priority3.toString() : '-')}</td>
          </tr>
          <tr>
            <td>Comm Pkg Progress</td>
            <td>{stringCell(`${commpkg.progress || 0}%`)}</td>
          </tr>
          <tr>
            <td>Mc Packages Missing PunchOut</td>
            <td>{stringCell(`${commpkg.remainingPunchOutCount || 0}`)}</td>
          </tr>
          <tr>
            <td>Description of Work</td>
            <td>{stringCell(`${commpkg.descriptionOfWork || 0}`)}</td>
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
            <td>DCC (D-01)</td>
            <td>{stringCell(formatDateString(commpkg.dccPlannedDate))}</td>
            <td>{stringCell(formatDateString(commpkg.dccForecastDate))}</td>
          </tr>
          <tr>
            <td>RFRC (D-03)</td>
            <td>{stringCell(formatDateString(commpkg.rfrcPlannedDate))}</td>
            <td>{stringCell(formatDateString(commpkg.rfrcForecastDate))}</td>
          </tr>
          <tr>
            <td>RFCC (C-01)</td>
            <td>{stringCell(formatDateString(commpkg.rfcPlannedDate))}</td>
            <td>{stringCell(formatDateString(commpkg.rfcForecastDate))}</td>
          </tr>
          <tr>
            <td>TAC (C-06)</td>
            <td>{stringCell(formatDateString(commpkg.tacPlannedDate))}</td>
            <td>{stringCell(formatDateString(commpkg.tacForecastDate))}</td>
          </tr>
          <tr>
            <td>RFOC (C-07)</td>
            <td>{stringCell(formatDateString(commpkg.rfoPlannedDate))}</td>
            <td>{stringCell(formatDateString(commpkg.rfoForecastDate))}</td>
          </tr>
        </tbody>
      </StyledTable>
    </StyledTabContent>
  );
};
