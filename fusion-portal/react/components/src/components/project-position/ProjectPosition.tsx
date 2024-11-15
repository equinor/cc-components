import { Typography, Icon } from '@equinor/eds-core-react';

import { tokens } from '@equinor/eds-tokens';
import styled from 'styled-components';

import { external_link, tag_relations } from '@equinor/eds-icons';

import { useMemo } from 'react';

import { useRelationsByType } from '@equinor/fusion-portal-react-context';
import { usePortalEnv } from '@equinor/fusion-portal-react-app';

import { useFrameworkCurrentContext } from '@equinor/fusion-framework-react-app/context';
import { PersonPosition, getFusionPortalURL } from '@equinor/fusion-portal-react-utils';

const Style = {
  Wrapper: styled.div`
    display: flex;
    flex-direction: column;
    gap: ${tokens.spacings.comfortable.medium};
    padding: ${tokens.spacings.comfortable.medium};
  `,
  PositionWrapper: styled.span`
    display: flex;
    flex-direction: column;
  `,
  ProjectHeader: styled.div`
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid ${tokens.colors.ui.background__medium.hex};
    padding: ${tokens.spacings.comfortable.small};
  `,
  PositionLink: styled.a`
    height: auto;
    border: 1px solid ${tokens.colors.ui.background__medium.hex};
    color: ${tokens.colors.interactive.primary__resting.hex};
    border-radius: 4px;
    width: 100%;
    text-decoration: none;
    :hover {
      background-color: ${tokens.colors.interactive.primary__hover_alt.hex};
    }
    :focus {
      background-color: ${tokens.colors.interactive.primary__hover_alt.hex};
    }
  `,
  Content: styled.div`
    padding: ${tokens.spacings.comfortable.medium_small};
    display: flex;
    align-items: center;
    height: auto;
  `,
  Icon: styled(Icon)`
    padding-right: 1rem;
  `,
};

export const ProjectPosition = ({ positions }: { positions?: PersonPosition[] }) => {
  const { currentContext } = useFrameworkCurrentContext();
  const { relations: equinorTask } = useRelationsByType('OrgChart', currentContext?.id);
  const env = usePortalEnv();

  const projectPositions = useMemo(() => {
    return (
      positions?.filter((item) => {
        return (
          item.appliesTo &&
          new Date(item.appliesTo) > new Date() &&
          item.project.id === equinorTask[0]?.externalId
        );
      }) || []
    );
  }, [positions, equinorTask]);

  return (
    <>
      {projectPositions.length > 0 ? (
        <Style.Wrapper>
          {projectPositions.map((position) => (
            <Style.PositionLink
              key={position.id}
              target="_blank"
              aria-label={position.name}
              href={`${getFusionPortalURL(env)}/apps/pro-org/${position.project.id}/chart/${
                position.parentPositionId
              }`}
              role="link"
            >
              <Style.PositionWrapper>
                <Style.ProjectHeader>
                  <Typography>{position.project.name}</Typography>
                  <Icon data={external_link} size={16} />
                </Style.ProjectHeader>
                <Style.Content>
                  <Style.Icon data={tag_relations} />
                  <div>
                    <Typography color={tokens.colors.interactive.primary__resting.hex}>
                      {position.name}
                    </Typography>
                    <Typography>
                      <>
                        {position.appliesFrom &&
                          new Date(position.appliesFrom).toLocaleDateString('en-US')}
                        {' - '}
                        {position.appliesTo &&
                          new Date(position.appliesTo).toLocaleDateString('en-US')}
                        ({position.workload}%)
                      </>
                    </Typography>
                  </div>
                </Style.Content>
              </Style.PositionWrapper>
            </Style.PositionLink>
          ))}
        </Style.Wrapper>
      ) : null}
    </>
  );
};
