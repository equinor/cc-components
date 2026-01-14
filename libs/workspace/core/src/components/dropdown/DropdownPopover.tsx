import { Button, Checkbox, Tooltip } from '@equinor/eds-core-react';
import { useVirtualizer } from '@tanstack/react-virtual';
import { FormEvent, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import {
  ActionsContainer,
  DropdownListItem,
  DropdownMenu,
  ListItemText,
  SearchbarContainer,
  VirtualListContainer,
  VirtualListItemContainer,
} from './Dropdown.styles';

type Dimensions = { width: number; height: number };
const dimensionsCache = new Map<string, Dimensions>();

export type DropdownListItem<T> = T & {
  selected?: boolean;
};

export type DropdownPopoverProps<T> = {
  anchorEl: HTMLElement | undefined | null;
  open: boolean;
  listItems: DropdownListItem<T>[];
  valueSelected: (value: T, selected: boolean) => void;
  valueGetter: (value: T) => string;
  tooltipGetter?: (value: T) => string;
  clearAll?: () => void;
  clickedOutside: () => void;
  buttonElement: React.RefObject<HTMLDivElement | null>;
  CustomRenderer?: React.ComponentType<T>;
  cacheKey?: string;
};

export const DropdownPopover = <T,>({
  anchorEl,
  open,
  listItems,
  valueSelected,
  valueGetter,
  tooltipGetter,
  clearAll,
  clickedOutside,
  buttonElement,
  CustomRenderer,
  cacheKey,
}: DropdownPopoverProps<T>) => {
  const [searchText, setSearchText] = useState<string>('');
  const [dimensions, setDimensions] = useState<Dimensions | undefined>(
    cacheKey ? dimensionsCache.get(cacheKey) : undefined
  );
  const resizeObserverRef = useRef<ResizeObserver | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const menuElRef = useRef<HTMLDivElement | null>(null);
  const searchbarRef = useRef<HTMLInputElement>(null);

  const filteredItems = useMemo(
    () =>
      listItems.filter((item) =>
        valueGetter(item).toLowerCase().includes(searchText.toLowerCase())
      ),
    [listItems, searchText, valueGetter]
  );

  const rowVirtualizer = useVirtualizer({
    count: filteredItems.length,
    getScrollElement: () => containerRef.current,
    estimateSize: () => 30,
  });

  function handleInput(event: FormEvent<HTMLInputElement>): void {
    setSearchText(event.currentTarget.value);
  }

  const setContainerRef = useCallback(
    (element: HTMLDivElement | null) => {
      if (resizeObserverRef.current) {
        resizeObserverRef.current.disconnect();
        resizeObserverRef.current = null;
      }

      containerRef.current = element;

      if (element && cacheKey) {
        resizeObserverRef.current = new ResizeObserver(() => {
          const { width, height } = element.getBoundingClientRect();
          const newDimensions = { width, height };
          dimensionsCache.set(cacheKey, newDimensions);
          setDimensions(newDimensions);
        });
        resizeObserverRef.current.observe(element);
      }
    },
    [cacheKey]
  );

  useEffect(() => {
    return () => {
      resizeObserverRef.current?.disconnect();
    };
  }, []);

  return (
    <>
      {open &&
        createPortal(
          <div
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100vw',
              height: '100vh',
              zIndex: 999,
            }}
            onClick={() => {
              clickedOutside();
              setSearchText('');
            }}
          />,
          document.body
        )}
      <DropdownMenu open={open} anchorEl={anchorEl} placement="bottom-start">
        <div ref={menuElRef}>
          <SearchbarContainer>
            <input
              value={searchText}
              placeholder="Search"
              onInput={handleInput}
              autoFocus={open}
              ref={searchbarRef}
            />
          </SearchbarContainer>
          <VirtualListContainer
            ref={setContainerRef}
            width={dimensions?.width}
            height={dimensions?.height}
          >
            <VirtualListItemContainer height={rowVirtualizer.getTotalSize()}>
              {rowVirtualizer.getVirtualItems()?.map(({ index, key, size, start }) => {
                const item = filteredItems[index];
                if (item.selected === undefined) {
                  item.selected = false;
                }
                const value = valueGetter(item);
                return (
                  <Tooltip
                    title={tooltipGetter ? tooltipGetter(item) : value}
                    key={key}
                    enterDelay={500}
                  >
                    <DropdownListItem
                      key={key}
                      onClick={(e) => {
                        e.stopPropagation();
                        valueSelected(item, !item.selected);
                      }}
                      height={size}
                      start={start}
                    >
                      <Checkbox checked={item.selected} readOnly />
                      {CustomRenderer ? (
                        <CustomRenderer {...item} />
                      ) : (
                        <ListItemText>{value}</ListItemText>
                      )}
                    </DropdownListItem>
                  </Tooltip>
                );
              })}
            </VirtualListItemContainer>
          </VirtualListContainer>
          {clearAll && (
            <ActionsContainer>
              <Button onClick={clearAll} variant="ghost">
                Clear
              </Button>
            </ActionsContainer>
          )}
        </div>
      </DropdownMenu>
    </>
  );
};
