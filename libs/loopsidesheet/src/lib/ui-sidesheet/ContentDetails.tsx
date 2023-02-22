import { Loop } from '@cc-components/loopshared';
import {
  formatDateString,
  StatusCircle,
  statusColorMap,
  stringCell,
  StyledTabContent,
  StyledTable,
} from '@cc-components/shared';
import { ContentTable } from './contentTable';

type ContentDetailsProps = {
  loop: Loop | undefined;
};

export const ContentDetails = ({ loop }: ContentDetailsProps): JSX.Element | null => {
  if (!loop) return null;
  return (
    <StyledTabContent>
      <h3>Details</h3>

      <StyledTable>
        <tbody>
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
                ? stringCell(formatDateString(loop.woPlannedCompletionDate.toString()))
                : '-'}
            </td>
          </tr>
          <tr>
            <td>Actual MC complete of content</td>
            <td>
              {loop.woActualCompletionDate
                ? stringCell(formatDateString(loop.woActualCompletionDate.toString()))
                : '-'}
            </td>
          </tr>
        </tbody>
      </StyledTable>
      <ContentTable loop={loop} />
    </StyledTabContent>
  );
};
