import { error_outlined, info_circle, warning_outlined } from '@equinor/eds-icons';
import { MessageType } from '../types';

export function getIconByType(type?: MessageType | 'Unknown' | undefined) {
  switch (type) {
    case MessageType.Error:
      return error_outlined;
    case MessageType.Info:
      return info_circle;
    case MessageType.Warning:
      return warning_outlined;
    case 'Unknown':
      return info_circle;
    default:
      return info_circle;
  }
}
