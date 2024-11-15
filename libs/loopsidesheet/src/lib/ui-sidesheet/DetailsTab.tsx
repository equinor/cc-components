import { Loop } from '@cc-components/loopshared';
import { StatusCircle } from '@cc-components/shared/common';
import { statusColorMap } from '@cc-components/shared/mapping';
import {
  stringCell,
  StyledTabContent,
  StyledTable,
} from '@cc-components/shared/sidesheet';
import { formatDateString } from '@cc-components/shared/utils-dates';
import { ContentTable } from './LoopContentTable';
import { Checklists } from './Checklists';

type DetailsTabProps = {
  loop: Loop | undefined;
};

export const DetailsTab = ({ loop }: DetailsTabProps): JSX.Element | null => {
  if (!loop) return null;
  return (
    <StyledTabContent>
      <h3>Details</h3>

      <StyledTable>
        <tbody>
          <tr>
            <td>System</td>
            <td>{stringCell(loop.functionalSystem)}</td>
          </tr>
          <tr>
            <td>Project</td>
            <td>{stringCell(loop.project)}</td>
          </tr>
          <tr>
            <td>Area</td>
            <td>{stringCell(loop.location)}</td>
          </tr>
          <tr>
            <td>Status</td>
            <td>{stringCell(loop.tagStatus)}</td>
          </tr>
          <tr>
            <td>MC status of content</td>
            <td>
              {loop.loopContentStatus ? (
                <StatusCircle
                  content={loop.loopContentStatus}
                  statusColor={statusColorMap[loop.loopContentStatus]}
                />
              ) : (
                '-'
              )}
            </td>
          </tr>
          <tr>
            <td>Planned MC complete of content</td>
            <td>
              {loop.woPlannedCompletionDate
                ? stringCell(formatDateString(loop.woPlannedCompletionDate))
                : '-'}
            </td>
          </tr>
          <tr>
            <td>Actual MC complete of content</td>
            <td>
              {loop.woActualCompletionDate
                ? stringCell(formatDateString(loop.woActualCompletionDate))
                : '-'}
            </td>
          </tr>
        </tbody>
      </StyledTable>
      <ContentTable loop={loop} />
      {loop.loopId && <Checklists loopId={loop.loopId} />}
    </StyledTabContent>
  );
};
