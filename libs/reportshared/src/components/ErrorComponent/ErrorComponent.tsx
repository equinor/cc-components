import { AccessErrorComponent } from './AccessErrorComponent';
import { ErrorComponentProps } from '@equinor/workspace-fusion/power-bi';

const unauthCodes = [401, 403];

export function ErrorComponent(props: ErrorComponentProps) {
  const { reportUri, error } = props;

  // If error related to access
  if (error.cause instanceof Response && unauthCodes.includes(error.cause.status)) {
    return <AccessErrorComponent reportUri={reportUri} />;
  }

  return <div>Failed to load report</div>;
}
