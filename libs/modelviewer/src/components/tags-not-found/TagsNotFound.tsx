import { Icon, Typography } from '@equinor/eds-core-react';
import { useSelectionContext } from '../../providers';
import { arrow_drop_down, arrow_drop_up, warning_outlined } from '@equinor/eds-icons';
import { tokens } from '@equinor/eds-tokens';
import styled from 'styled-components';
import { useState } from 'react';

const Style = {
  Overlay: styled.div`
    display: flex;
    flex-direction: column;
    position: absolute;
    background: rgba(0, 0, 0, 0.65);
    top: 1rem;
    right: 1rem;
    min-width: 200px;
    border-radius: 4px;
  `,

  Header: styled.button`
    display: flex;
    flex-direction: row;
    color: #fff;
    padding: 0.5rem;
    justify-content: space-between;
    background: none;
    border: none;
    width: 100%;
    border-radius: 4px;
    align-items: center;
    cursor: pointer;
    height: 2rem;
    gap: 1rem;
    :hover {
      background: rgba(0, 0, 0, 0.8);
    }
  `,
  MissingWrapper: styled.div`
    border-width: 1px;
    border-color: #e2e2e2;
    border-top-style: solid;
    padding-top: 0.5rem;
    padding-left: 0.5rem;
    padding-right: 0.5rem;
  `,
  MissingItem: styled(Typography)`
    display: flex;
    color: #fff;
    flex-direction: row;
    justify-content: space-between;
    padding-bottom: 0.5rem;
  `,
};

export const TagsNotFound = () => {
  const { notFoundTagList } = useSelectionContext();
  const [isExpanded, setIsExpanded] = useState(false);

  if (notFoundTagList.length !== 0) {
    return (
      <Style.Overlay>
        <div>
          <Style.Header onClick={() => setIsExpanded((isExpanded) => !isExpanded)}>
            <Icon
              data={warning_outlined}
              color={tokens.colors.interactive.warning__resting.hex}
            />
            Tags Not found in 3D ({notFoundTagList.length})
            <Icon
              data={isExpanded ? arrow_drop_up : arrow_drop_down}
              color={tokens.colors.text.static_icons__primary_white.hex}
            />
          </Style.Header>
        </div>
        {isExpanded && (
          <Style.MissingWrapper>
            {notFoundTagList.map((tagItem) => (
              <Style.MissingItem variant={'overline'} key={tagItem.tagNo}>
                <span>{tagItem.tagNo}</span>
                <span>{tagItem.status}</span>
              </Style.MissingItem>
            ))}
          </Style.MissingWrapper>
        )}
      </Style.Overlay>
    );
  }
  return null;
};
