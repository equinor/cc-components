import styled from 'styled-components';
import { tokens } from '@equinor/eds-tokens';
import { Card, Typography } from '@equinor/eds-core-react';

const Styled = {
  FusionInfo: styled(Card).withConfig({ displayName: 'info-box' })`
    background: ${tokens.colors.infographic.primary__moss_green_21.hex};
    position: relative;
    padding: ${tokens.spacings.comfortable.medium};
  `,
  InfoTitle: styled(Typography).withConfig({ displayName: 'info-box' })`
    margin-bottom: ${tokens.spacings.comfortable.small};
  `,
  Ul: styled.ul`
    margin: 0;
    padding-left: ${tokens.spacings.comfortable.medium};
  `,
  CloseButton: styled.div`
    position: absolute;
    top: ${tokens.spacings.comfortable.small};
    right: ${tokens.spacings.comfortable.small};
  `,
};

export const ProjectPortalInfoBox = (): JSX.Element => {
  return (
    <Styled.FusionInfo elevation="raised">
      <Styled.InfoTitle group="paragraph" variant="body_long_bold">
        Project Portal gives you quick access to
      </Styled.InfoTitle>
      <Styled.Ul>
        <li>
          <Typography group="paragraph" variant="body_long">
            Verified data from multiple sources
          </Typography>
        </li>
        <li>
          <Typography group="paragraph" variant="body_long">
            Information customized to your position
          </Typography>
        </li>
        <li>
          <Typography group="paragraph" variant="body_long">
            Application scoped to your project or facility
          </Typography>
        </li>
      </Styled.Ul>
    </Styled.FusionInfo>
  );
};

export default ProjectPortalInfoBox;
