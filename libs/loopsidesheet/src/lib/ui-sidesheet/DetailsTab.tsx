import { Loop } from '@cc-components/loopshared';
import { stringCell, StyledTabContent, StyledTable } from '@cc-components/shared';

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
        </tbody>
      </StyledTable>
    </StyledTabContent>
  );
};
