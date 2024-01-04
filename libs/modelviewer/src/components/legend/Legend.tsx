import { Icon } from '@equinor/eds-core-react';
import { useSelectionContext } from '../../providers';
import {
  arrow_drop_down,
  arrow_drop_up,
  checkbox,
  checkbox_outline,
} from '@equinor/eds-icons';

import styled from 'styled-components';
import { useMemo, useState } from 'react';
import { tokens } from '@equinor/eds-tokens';

const Style = {
  Overlay: styled.div`
    display: flex;
    flex-direction: column;
    position: absolute;
    background: rgba(0, 0, 0, 0.65);
    top: 1rem;
    left: 1rem;
    min-width: 200px;
    border-radius: 4px;
    overflow: hidden;
  `,

  Header: styled.button`
    display: flex;
    flex-direction: row;
    color: ${tokens.colors.text.static_icons__primary_white.hex};
    padding: 0.5rem;
    justify-content: space-between;
    background: none;
    border: none;
    border-radius: 4px;
    width: 100%;
    align-items: center;
    cursor: pointer;
    height: 2rem;
    :hover {
      background: rgba(0, 0, 0, 0.8);
    }
  `,

  MissingWrapper: styled.div`
    border-width: 1px;
    border-color: #e2e2e2;
    border-top-style: solid;
  `,

  Item: styled.button`
    display: flex;
    color: ${tokens.colors.text.static_icons__primary_white.hex};
    flex-direction: row;
    justify-content: space-between;
    padding-bottom: 0.5rem;
    align-items: center;
    background: none;
    border: none;
    width: 100%;
    cursor: pointer;
    height: 2rem;
    padding: 0.5rem;
    :hover {
      background: rgba(0, 0, 0, 0.8);
    }
  `,

  Label: styled.span`
    display: flex;
    flex-direction: row;
  `,

  ColorIcon: styled.span<{ color: string }>`
    background: ${({ color }) => color};
    height: 1rem;
    width: 1rem;
    display: block;
    border-radius: 500%;
    margin-right: 0.5rem;
  `,
};

export const Legend = () => {
  const { tagList, toggleTags, filterTags, notFoundTagList } = useSelectionContext();
  const [isExpanded, setIsExpanded] = useState(true);

  const legendData = useMemo(() => {
    return tagList.reduce((acc, item) => {
      if (!item.status) return acc;

      if (acc[item.status]) {
        acc[item.status].tags.push(item.tagNo);
      } else {
        acc[item.status] = {
          status: item.status,
          tags: [item.tagNo],
          color: item.color || '',
        };
      }
      return acc;
    }, {} as Record<string, { status: string; color: string; tags: string[] }>);
  }, [tagList]);

  if (
    !Boolean(Object.values(legendData).length) ||
    tagList.length == notFoundTagList.length
  )
    return null;

  return (
    <Style.Overlay>
      <div>
        <Style.Header onClick={() => setIsExpanded((isExpanded) => !isExpanded)}>
          <span>Status Legend</span>

          <Icon
            data={isExpanded ? arrow_drop_up : arrow_drop_down}
            color={tokens.colors.text.static_icons__primary_white.hex}
          />
        </Style.Header>
      </div>
      {isExpanded && (
        <Style.MissingWrapper>
          {Object.values(legendData).map((item) => (
            <Style.Item
              key={item.status}
              onClick={() => {
                toggleTags(item.tags);
              }}
            >
              <Icon
                color={tokens.colors.text.static_icons__primary_white.hex}
                data={
                  item.tags.every((tag) => filterTags.includes(tag))
                    ? checkbox
                    : checkbox_outline
                }
              />
              <Style.Label>
                <Style.ColorIcon color={item.color} />
                <span>
                  {item.status} ({item.tags.length})
                </span>
              </Style.Label>
            </Style.Item>
          ))}
        </Style.MissingWrapper>
      )}
    </Style.Overlay>
  );
};
