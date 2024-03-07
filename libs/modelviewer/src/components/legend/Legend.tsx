import { Icon } from '@equinor/eds-core-react';
import { useSelectionContext } from '../../providers';

import {
  arrow_drop_down,
  arrow_drop_up,
  checkbox,
  checkbox_outline,
} from '@equinor/eds-icons';

import { useMemo, useState } from 'react';
import { tokens } from '@equinor/eds-tokens';
import { Style } from './LegendStyles';

export const Legend = () => {
  const { tagList, toggleTags, visibleTags, notFoundTagList } = useSelectionContext();

  const [isExpanded, setIsExpanded] = useState(true);

  const legendData = useMemo(() => {
    return tagList.reduce((acc, item) => {
      if (!item.status) return acc;
      if (notFoundTagList.includes(item)) return acc;

      if (acc[item.status]) {
        acc[item.status].tags.push(item.tagNo);
        return acc;
      }

      acc[item.status] = {
        status: item.status,
        tags: [item.tagNo],
        color: item.color || '',
      };

      return acc;
    }, {} as Record<string, { status: string; color: string; tags: string[] }>);
  }, [tagList, notFoundTagList]);

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
                  item.tags.every((tag) => visibleTags.includes(tag))
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
