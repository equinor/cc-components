import { ProjectHeader } from '../components/page-header/PageHeader';

import styled from 'styled-components';

import { Typography } from '@equinor/eds-core-react';

import { User } from '@equinor/fusion-portal-react-components';
import {
  useNavigateOnContextChange,
  ProjectPortalInfoBox,
} from '@equinor/project-portal-common';

import { PortalContextSelector } from '../components/context/PortalContextSelector';
import { Allocations } from '../components/allocations/Allocations';
import { useFeature } from '@equinor/fusion-framework-react-app/feature-flag';

export const Styles = {
  Wrapper: styled.main`
    display: flex;
    flex-direction: column;
  `,
  ContentWrapper: styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
  `,
  Section: styled.span`
    width: 40vw;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  `,
  Content: styled.section`
    padding: 0rem 2rem;
    height: 100vh;
  `,
  Details: styled.div`
    position: absolute;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    right: 5rem;
    top: -5rem;
    z-index: 1;
    width: 360px;
  `,
};

export const ProjectPortalPage = (): JSX.Element => {
  const { feature } = useFeature('project-prediction');
  useNavigateOnContextChange();
  return (
    <Styles.Wrapper>
      <ProjectHeader>
        <Styles.Details>
          <User />
          <ProjectPortalInfoBox />
        </Styles.Details>
        <Styles.Content>
          <Styles.ContentWrapper>
            <Styles.Section>
              <Typography>
                Please choose a project or facility from the search field to continue.
                This will direct you to the context's homepage, where you can access the
                applications associated with the selected context through the menu.
              </Typography>
            </Styles.Section>
            <PortalContextSelector />
          </Styles.ContentWrapper>
          {feature?.enabled && <Allocations />}
        </Styles.Content>
      </ProjectHeader>
    </Styles.Wrapper>
  );
};
