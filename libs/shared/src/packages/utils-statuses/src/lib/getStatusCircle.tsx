import { ReactElement } from 'react';
import {
  GreenStatusIcon,
  GrayStatusIcon,
  RedStatusIcon,
  OrangeStatusIcon,
} from '../../../common/src/lib/status-icons';

export type StatusCircleType = string | null;

/**
 * Returns a status icon component based on the status code
 * @param status The status code
 * @param showVisualIndicator Flag to show visual indicator for colorblind mode
 */
export const getStatusCircle = (
  status: StatusCircleType,
  showVisualIndicator: boolean
): ReactElement => {
  switch (status) {
    case 'PB':
    case 'M05':
    case 'M06':
    case 'M07':
    case 'M09':
      return <OrangeStatusIcon visualIndicator={showVisualIndicator} />;
    case 'PA':
    case 'M02':
    case 'M03':
    case 'M04':
      return <RedStatusIcon visualIndicator={showVisualIndicator} />;
    case 'OK':
    case 'M10':
    case 'M11':
    case 'M12':
    case 'MN':
      return <GreenStatusIcon visualIndicator={showVisualIndicator} />;
    case 'OS':
      return <GrayStatusIcon visualIndicator={showVisualIndicator} />;
    default:
      return <GrayStatusIcon visualIndicator={showVisualIndicator} />;
  }
};
