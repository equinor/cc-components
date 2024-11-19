import { Card, Icon } from '@equinor/eds-core-react';
import { external_link } from '@equinor/eds-icons';
import styled from 'styled-components';
import { OneEquinorIcon } from './Icon';

import {
  useRelationsByType,
  useCurrentContext,
} from '@equinor/fusion-portal-react-context';
import { usePortalEnv } from '@equinor/fusion-portal-react-app';
import { getFusionPortalURL } from '@equinor/fusion-portal-react-utils';

const Styles = {
  Link: styled.a.withConfig({ displayName: 'pl-' })`
    box-sizing: border-box;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 8px 16px;
    background: transparent;
    min-height: var(--eds_button__height, 36px);
    border: var(--eds_button__border_width, 1px) solid transparent;
    border-radius: var(--eds_button__radius, 4px);
    text-decoration: none;
    color: var(--eds_interactive_primary__resting, rgba(0, 112, 121, 1));
    font-family: Equinor;
    font-size: var(--eds_button__font_size, 0.875rem);
    font-weight: 500;
    line-height: 1.143em;

    &:hover {
      background: var(--eds_interactive_primary__hover_alt, rgba(222, 237, 238, 1));
      color: var(--eds_interactive_primary__hover, rgba(0, 79, 85, 1));
      border: 1px solid transparent;
      border-radius: var(--eds_button__radius, 4px);
    }
  `,
  IconWrapper: styled.span`
    padding: 0.5rem;
    padding-left: 0px;
  `,
  Title: styled.span`
    display: flex;
    align-items: center;
    justify-content: space-between;
  `,
};

export const OneEquinorLink = () => {
  const context = useCurrentContext();
  const { relations: equinorTask } = useRelationsByType('EquinorTask', context?.id);
  const env = usePortalEnv();

  if (equinorTask[0]?.value.orgUnitSapId) {
    return (
      <Card elevation="raised">
        <Styles.Link
          href={`${getFusionPortalURL(env)}/apps/one-equinor/org-unit/${
            equinorTask[0].value.orgUnitSapId
          }/task/${equinorTask[0].externalId}`}
          aria-label="View in this project master in One Equinor"
          target="_blank"
        >
          <Styles.Title>
            <Styles.IconWrapper>
              <OneEquinorIcon />
            </Styles.IconWrapper>
            View in One Equinor
          </Styles.Title>

          <Icon data={external_link} size={16} />
        </Styles.Link>
      </Card>
    );
  }
  return null;
};
