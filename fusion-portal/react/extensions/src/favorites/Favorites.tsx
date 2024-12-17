// import { useTelemetry } from '@equinor/portal-core';
import { Card, Typography } from '@equinor/eds-core-react';

import styled from '@emotion/styled';
import { css } from '@emotion/css';

import { tokens } from '@equinor/eds-tokens';

import { useApps } from '@equinor/fusion-portal-react-app';
import FavoriteCard from './FavoriteCard';
import { sortByCategoryAndIsDisabled } from './utils/utils';
import { AppContainerEmpty } from './AppContainerEmpty';
import { InfoIcon } from '@equinor/fusion-portal-react-components';
import { usePortalMenu } from '@equinor/fusion-portal-module-menu';

type AppCardPops = {
  isDisabled?: boolean;
  color?: string;
};

const styles = {
  appCard: ({ isDisabled, color }: AppCardPops) => {
    const iconBackgroundColor =
      (color ? color : tokens.colors.infographic.primary__moss_green_100.hex) + '66';
    return css`
      opacity: ${isDisabled ? 0.5 : 'none'};
      cursor: ${isDisabled ? 'not-allowed' : 'pointer'};
      display: flex;
      flex-direction: row;
      gap: 1rem;
      overflow: hidden;
      text-decoration: none;
      :hover {
        > aside > span {
          background-color: ${!isDisabled && iconBackgroundColor};
        }
      }
    `;
  },
  FrameLink: styled.span`
    color: ${tokens.colors.interactive.primary__resting.hex};
    text-decoration: underline;
    cursor: pointer;
  `,
  FrameButton: styled.span`
    color: ${tokens.colors.interactive.primary__resting.hex};
    cursor: pointer;
  `,
  cardList: css`
    display: grid;
    grid-auto-rows: auto;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
    padding: 0;

    @media only screen and (max-width: 45rem) {
      grid-template-columns: repeat(1, 1fr);
    }
  `,
  NoData: styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
    grid-column: span 3;
    padding: 0 1rem;
  `,
  fullHeight: css`
    height: 100%;
  `,
  Heading: styled.div`
    padding: 1rem;
    display: flex;
    justify-content: space-between;
  `,
};

type FavoriteProps = {
  openAllApps: () => void;
};

export const Favorites = ({ openAllApps }: FavoriteProps) => {
  const { toggleMenu } = usePortalMenu();

  const { favorites, hasFavorites, isLoading, addFavorite, isDisabled } = useApps();

  return (
    <div>
      <styles.Heading>
        <Typography variant="h5">Favorites</Typography>
        <InfoIcon message="Open menu and click on stars to add to favorites" />
      </styles.Heading>
      <Card.Content>
        {hasFavorites ? (
          <nav className={styles.cardList}>
            {sortByCategoryAndIsDisabled(favorites).map((app) => {
              return (
                <FavoriteCard
                  key={app.appKey}
                  app={app}
                  isDisabled={isDisabled(app.appKey)}
                  loading={isLoading}
                  onClick={(a) => {
                    addFavorite(a.appKey);
                  }}
                />
              );
            })}
          </nav>
        ) : (
          <styles.NoData>
            <AppContainerEmpty>
              You don't have any favourite apps yet.
              <br />
              Choose your favourites in{' '}
              <styles.FrameLink onClick={openAllApps}>All apps</styles.FrameLink> or{' '}
              <styles.FrameButton
                onClick={() => {
                  toggleMenu();
                }}
              >
                Menu
              </styles.FrameButton>{' '}
              by clicking on the star ★.
            </AppContainerEmpty>
          </styles.NoData>
        )}
      </Card.Content>
    </div>
  );
};
