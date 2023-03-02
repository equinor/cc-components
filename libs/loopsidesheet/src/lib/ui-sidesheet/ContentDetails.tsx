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
    </StyledTabContent>
  );
};
