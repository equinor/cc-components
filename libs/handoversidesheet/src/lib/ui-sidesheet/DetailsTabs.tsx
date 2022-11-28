import { HandoverPackage } from '@cc-components/handovershared';
import {
  formatDateString,
  stringCell,
  StyledTabContent,
  StyledTable,
} from '@cc-components/shared';
import { useMemo } from 'react';
type HandoverDetails = {
  nextToSign: string;
};
type DetailsTabProps = {
  commpkg: HandoverPackage;
  nextToSign: HandoverDetails[] | undefined;
  dataIsFetching: boolean;
};

export const DetailsTab = ({
  commpkg,
  nextToSign,
  dataIsFetching,
}: DetailsTabProps): JSX.Element => {
  const NextToSign = useMemo(() => {
    if (dataIsFetching) return <>Loading...</>;

    return nextToSign?.length ? <div>{nextToSign[0].nextToSign}</div> : '';
  }, [nextToSign, dataIsFetching]);

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
            <td>{stringCell(commpkg?.mcDisciplines?.join(',') || '')}</td>
          </tr>
          <tr>
            <td>Comm Pkg Area</td>
            <td>{stringCell(commpkg.area)}</td>
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
            <td>{stringCell(commpkg.volume.toString())}</td>
          </tr>
          <tr>
            <td>Remark</td>
            <td>{stringCell(commpkg.remark)}</td>
          </tr>
          <tr>
            <td>Commissioning Priority 1</td>
            <td>{stringCell(`${commpkg.priority1} - ${commpkg.priority1}`)}</td>
          </tr>
          <tr>
            <td>Commissioning Priority 2</td>
            <td>{stringCell(`${commpkg.priority2} - ${commpkg.priority2}`)}</td>
          </tr>
          <tr>
            <td>Commissioning Priority 3</td>
            <td>{stringCell(`${commpkg.priority3} - ${commpkg.priority3}`)}</td>
          </tr>
          <tr>
            <td>Comm Pkg Progress</td>
            <td>{stringCell(`${commpkg.progress || 0}%`)}</td>
          </tr>

          <tr>
            <td>Next to sign</td>
            <td>{NextToSign}</td>
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
            <td>RFCC (C01)</td>
            <td>{stringCell(formatDateString(commpkg.plannedStartDate))}</td>
            <td>{stringCell(formatDateString(commpkg.forecastStartDate))}</td>
          </tr>
          <tr>
            <td>TAC (C06)</td>
            <td>{stringCell(formatDateString(commpkg.plannedTacDate))}</td>
            <td>{stringCell(formatDateString(commpkg.forecastTacDate))}</td>
          </tr>
          <tr>
            <td>RFOC (C07)</td>
            <td>{stringCell(formatDateString(commpkg.plannedFinishDate))}</td>
            <td>{stringCell(formatDateString(commpkg.forecastFinishDate))}</td>
          </tr>
          <tr>
            <td>DCC (D01)</td>
            <td>{stringCell(formatDateString(commpkg.demolitionPlannedStartDate))}</td>
            <td>{stringCell(formatDateString(commpkg.demolitionForecastStartDate))}</td>
          </tr>
          <tr>
            <td>RFRC (D03)</td>
            <td>{stringCell(formatDateString(commpkg.demolitionPlannedFinishDate))}</td>
            <td>{stringCell(formatDateString(commpkg.demolitionForecastFinishDate))}</td>
          </tr>
        </tbody>
      </StyledTable>
    </StyledTabContent>
  );
};
