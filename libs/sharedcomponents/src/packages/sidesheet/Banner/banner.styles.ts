import { tokens } from '@equinor/eds-tokens';
import styled from 'styled-components';

export const StyledBanner = styled.div`
  max-width: 100%;
  background-color: ${tokens.colors.ui.background__light.hex};
  display: flex;
  flex-direction: row;
  column-gap: 4rem;
  row-gap: 1rem;
  flex-wrap: wrap;
  padding: 1rem;
  align-items: center;
`;
export const BannerItemTitle = styled.div`
  font-size: 12px;
  line-height: 16px;
  font-weight: 500;
  color: ${tokens.colors.text.static_icons__tertiary.hex};
`;

export const BannerItemValue = styled.div`
  font-size: 16px;
  line-height: 24px;
  font-weight: 400;
  color: ${tokens.colors.text.static_icons__default.hex};
  min-height: 24px;
`;
