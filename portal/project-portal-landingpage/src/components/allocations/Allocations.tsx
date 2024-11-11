import { Checkbox, LinearProgress, Typography } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';
import { useState } from 'react';
import styled from 'styled-components';

import { useUserOrgDetails } from '../../hooks/useUserContexts';
import { AllocationItem } from './AllocationItem';

export const Styles = {
  Section: styled.span`
    width: 40vw;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  `,
  Heading: styled.div`
    padding-top: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
  `,

  Nav: styled.nav`
    padding: 1rem 0;
    gap: 0.5rem;
    display: flex;
    flex-wrap: wrap;
    width: 25%;
  `,
  Loading: styled.div`
    padding: 1rem 0;
    width: 25%;
  `,
  Padding: styled.span`
    padding: 2rem;
  `,
};

/**
 * Allocations component displays a list of allocated projects for the user.
 * It allows toggling between current and all past allocations using a checkbox.
 *
 * @component
 * @example
 * return (
 *   <Allocations />
 * )
 *
 * @returns {JSX.Element} The rendered component.
 *
 * @remarks
 * This component uses the `useUserOrgDetails` hook to fetch user organization details.
 * It displays a loading indicator while the data is being fetched.
 * If no allocations are found, it shows a message indicating that no projects were found.
 *
 * @hook
 * @name useUserOrgDetails
 * @param {boolean} value - A boolean indicating whether to fetch all past allocations or only current ones.
 *
 * @state {boolean} value - State to manage the checkbox value.
 * @state {Function} setValue - Function to update the checkbox value.
 *
 * @returns {JSX.Element} The rendered component.
 */
export const Allocations = () => {
  const [showAll, setShowAll] = useState(false);

  const { data: userOrgDetails, isLoading } = useUserOrgDetails(showAll);

  return (
    <Styles.Padding>
      <Styles.Section>
        <Styles.Heading>
          <Typography variant="h5">Allocated Projects</Typography>
          <Checkbox
            label="Use all past allocations"
            title="Show all past allocations"
            checked={showAll}
            onChange={() => {
              setShowAll((show) => !show);
            }}
          />
        </Styles.Heading>
        <Typography>{showAll ? 'All' : 'Current'} projects:</Typography>
      </Styles.Section>
      {isLoading ? (
        <Styles.Loading>
          <LinearProgress />
          <Typography>Finding your allocations...</Typography>
        </Styles.Loading>
      ) : (
        <Styles.Nav>
          {userOrgDetails && userOrgDetails.length > 0 ? (
            userOrgDetails.map((allocation, index) => (
              <AllocationItem
                key={allocation.id}
                allocation={allocation}
                allocationsCount={userOrgDetails.length}
                index={index}
              />
            ))
          ) : (
            <>
              {userOrgDetails && (
                <Typography variant="overline">
                  Sorry, we could not find any projects from your allocations.
                </Typography>
              )}
            </>
          )}
        </Styles.Nav>
      )}
    </Styles.Padding>
  );
};
