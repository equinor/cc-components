import { Icon, LinearProgress, Typography } from '@equinor/eds-core-react';
import { arrow_drop_down, arrow_drop_up, warning_outlined } from '@equinor/eds-icons';
import { tokens } from '@equinor/eds-tokens';
import { useState } from 'react';
import styled from 'styled-components';
import { useTagSelectionContext } from '../../providers';

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

const Message = {
  Wrapper: styled.div`
    display: flex;
    position: absolute;
    top: 40%;
    width: 100%;
    justify-content: center;
  `,
  Overlay: styled.div`
    display: flex;
    flex-direction: column;
    min-width: 250px;
    width: 300px;
    border-radius: 4px;
  `,

  Header: styled.div`
    display: flex;
    flex-direction: row;
    color: #fff;
    padding: 0.5rem;
    background: rgba(0, 0, 0, 0.75);
    border: none;
    width: 100%;
    border-radius: 4px 4px 0 0;
    align-items: center;
    height: 2rem;
    gap: 1rem;
  `,
  TextWrapper: styled.div`
    width: 100%;
    background: rgba(0, 0, 0, 0.65);
    padding-top: 0.5rem;
    padding-left: 0.5rem;
    padding-right: 0.5rem;
    border-radius: 0 0 4px 4px;
  `,
  Text: styled(Typography)`
    display: flex;
    color: #fff;
    flex-direction: row;
    justify-content: space-between;
    padding-bottom: 0.5rem;
  `,

  SpinnerWrapper: styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    background: rgba(0, 0, 0, 0.65);
    padding: 1rem 0.5rem;
    border-radius: 0 0 4px 4px;
  `,
};

export const TagsNotFound = () => {
  const { viewNodes, notFoundTagList, isFetchingNodes } = useTagSelectionContext();
  const [isExpanded, setIsExpanded] = useState(false);

  if (isFetchingNodes) {
    return (
      <Message.Wrapper>
        <Message.Overlay>
          <Message.Header>Loading tags...</Message.Header>
          <Message.SpinnerWrapper>
            <LinearProgress />
          </Message.SpinnerWrapper>
        </Message.Overlay>
      </Message.Wrapper>
    );
  }

  if (viewNodes.length === 0 && !isFetchingNodes) {
    return (
      <Message.Wrapper>
        <Message.Overlay>
          <Message.Header>
            <Icon
              data={warning_outlined}
              color={tokens.colors.interactive.warning__resting.hex}
            />
            No tags found in 3D Model
          </Message.Header>

          <Message.TextWrapper>
            <Message.Text>
              The 3D model selected does not contain any of the specified tags.
            </Message.Text>
          </Message.TextWrapper>
        </Message.Overlay>
      </Message.Wrapper>
    );
  }

  if (notFoundTagList.length === 0) return null;

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
};
