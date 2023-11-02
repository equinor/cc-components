import { Typography, Icon, Button } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';
import styled from 'styled-components';
import { TagOverlay } from '../../types/overlayTags';
import TagIcon from '../tag-icon/TagIcon';
import TagIconShadowWrapper from '../tag-icon-shadow/TagIconShadow';
import * as Icons from '@equinor/eds-icons';

interface TagProps {
  iconResolver?: (type: string) => string;
  statusResolver?: (status: string) => string;
  onSelected: (tag?: string) => void;
  tag: TagOverlay;
  isSelected: boolean;
}
const ContextWrapper = styled.div`
  cursor: pointer;
  display: flex;
  flex-wrap: wrap;
`;

const TagText = styled.div`
  padding: 0px var(--small) 0px var(--small);
  text-align: start;
  cursor: pointer;
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin: auto;
  max-width: 240px;
  min-width: 55px;

  @media screen and (max-width: 440px) {
    max-width: 140px;
    min-width: 140px;
  }

  @media screen and (min-width: 440px) and (max-width: 560px) {
    max-width: 240px;
  }
`;

const TagInfoWrapper = styled.div`
  padding: 1px;
  display: flex;
  background-color: #ffffff;
  border-radius: 10rem;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  width: 100%;
  height: 52px;
  align-items: center;
  overflow: hidden;
  box-sizing: unset;
`;

const StyledTitleTypography = styled(Typography)`
  overflow: hidden;
  text-overflow: ellipsis;
  color: ${tokens.colors.infographic.primary__moss_green_100.hex};
  font-weight: bold;
`;

const StyledDescriptionTypography = styled(Typography)`
  overflow: hidden;
  text-overflow: ellipsis;
`;

const StyledTagInfoIcon = styled.div`
  margin: 3px;
`;

export const defaultTagColor = '#a0dd28';

Icon.add(Icons);

export const TagItem = ({
  tag,
  iconResolver,
  statusResolver,
  isSelected,
  onSelected,
}: TagProps) => {
  if (isSelected) {
    return (
      <ContextWrapper
        onClick={(e) => {
          onSelected();
        }}
        aria-label="tag context"
      >
        <TagInfoWrapper
          title={`${tag.tagNo} - ${tag.description || 'no description provided'}`}
        >
          <TagIcon
            icon={
              typeof tag.icon !== 'string' ? (
                tag.icon
              ) : (
                <Icon
                  name={
                    tag.icon
                      ? tag.icon
                      : iconResolver && tag.type
                      ? iconResolver(tag.type)
                      : 'tag'
                  }
                  color={'#ffffff'}
                />
              )
            }
            legendColor={
              statusResolver && tag.status
                ? statusResolver(tag.status)
                : tag.color
                ? tag.color
                : defaultTagColor
            }
          />
          <TagText>
            <StyledTitleTypography data-testid="tag-title" variant="h5">
              {tag.tagNo}
            </StyledTitleTypography>
            <StyledDescriptionTypography data-testid="tag-description">
              {tag.description || 'no description provided'}
            </StyledDescriptionTypography>
          </TagText>

          <StyledTagInfoIcon>
            <Button
              variant="ghost_icon"
              onClick={(e) => {
                console.log(tag);
                tag.action && tag.action(tag);
                e.stopPropagation();
                e.preventDefault();
              }}
            >
              <Icon name="info_circle" title="tag information"></Icon>
            </Button>
          </StyledTagInfoIcon>
        </TagInfoWrapper>
      </ContextWrapper>
    );
  }

  return (
    <div
      title={tag.tagNo}
      aria-label="tag context"
      onClick={(e) => {
        onSelected(tag.tagNo);
        e.stopPropagation();
        e.preventDefault();
      }}
    >
      <TagIconShadowWrapper>
        <TagIcon
          icon={
            typeof tag.icon !== 'string' ? (
              tag.icon
            ) : (
              <Icon
                name={
                  tag.icon
                    ? tag.icon
                    : iconResolver && tag.type
                    ? iconResolver(tag.type)
                    : 'tag'
                }
                color={'#ffffff'}
              />
            )
          }
          legendColor={
            statusResolver && tag.status
              ? statusResolver(tag.status)
              : tag.color
              ? tag.color
              : defaultTagColor
          }
        />
      </TagIconShadowWrapper>
    </div>
  );
};
