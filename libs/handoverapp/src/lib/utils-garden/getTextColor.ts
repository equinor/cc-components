import { PackageStatus } from '@cc-components/shared/types';
import { tokens } from '@equinor/eds-tokens';

export const getTextColor = (status: PackageStatus) => {
  return ['RFOC Accepted', 'RFRC Accepted', 'DCC Accepted'].includes(status)
    ? tokens.colors.text.static_icons__primary_white.rgba
    : tokens.colors.text.static_icons__default.rgba;
};
