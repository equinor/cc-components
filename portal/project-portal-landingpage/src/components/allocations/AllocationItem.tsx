import { ProjectMaster, Relations } from '@equinor/fusion-portal-react-utils';
import { useFramework } from '@equinor/fusion-framework-react';
import { NavigationModule } from '@equinor/fusion-framework-module-navigation';
import { Typography } from '@equinor/eds-core-react';
import styled from 'styled-components';

const Styles = {
  LinkWrapper: styled.span`
    display: flex;
    align-items: center;
    gap: 0.5rem;
  `,
};

/**
 * AllocationItem component renders a single allocation item with a clickable title.
 * It navigates to the project page when the title is clicked.
 *
 * @param {Object} props - The component props.
 * @param {Relations<ProjectMaster>} props.allocation - The allocation data.
 * @param {number} props.allocationsCount - The total number of allocations.
 * @param {number} props.index - The index of the current allocation.
 *
 * @returns {JSX.Element} The rendered allocation item.
 */
export const AllocationItem = ({
  allocation,
  allocationsCount,
  index,
}: {
  allocation: Relations<ProjectMaster>;
  allocationsCount: number;
  index: number;
}) => {
  const { modules } = useFramework<[NavigationModule]>();
  return (
    <Styles.LinkWrapper key={allocation.id}>
      <div onClick={(e) => {}}></div>
      <Typography
        onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
          e.preventDefault();
          modules.navigation.replace(`/project/${allocation.id}`);
        }}
        link
        title={allocation.title}
        href={`/project/${allocation.id}`}
      >
        {allocation.title}
      </Typography>
      {allocationsCount > index + 1 && <span>|</span>}
    </Styles.LinkWrapper>
  );
};
