import { Button, Checkbox, Tooltip } from '@equinor/eds-core-react';
import { useVirtualizer } from '@tanstack/react-virtual';
import { FormEvent, useEffect, useRef, useState } from 'react';
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
  customRenderer?: (value: T) => React.ReactNode;
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
  customRenderer,
}: DropdownPopoverProps<T>) => {
  const [searchText, setSearchText] = useState<string>('');
  const [filteredItems, setFilteredItems] = useState<DropdownListItem<T>[]>(listItems);
  const ref = useRef<HTMLDivElement | null>(null);
  const menuElRef = useRef<HTMLDivElement | null>(null);
  const searchbarRef = useRef<HTMLInputElement>(null);

  const rowVirtualizer = useVirtualizer({
    count: filteredItems.length,
    getScrollElement: () => ref.current,
    estimateSize: () => 30,
  });

  function handleInput(event: FormEvent<HTMLInputElement>): void {
    setSearchText(event.currentTarget.value);
  }

  useEffect(() => {
    const filtered = listItems.filter((item) => {
      return valueGetter(item).toLowerCase().includes(searchText.toLowerCase());
    });
    setFilteredItems(filtered);
  }, [searchText, listItems]);

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
      <DropdownMenu open={open} anchorEl={anchorEl} placement="bottom-end">
        <div ref={menuElRef}>
          <SearchbarContainer>
            <input value={searchText} placeholder="Search" onInput={handleInput} autoFocus={open} ref={searchbarRef} />
          </SearchbarContainer>
          <VirtualListContainer ref={ref}>
            <VirtualListItemContainer height={rowVirtualizer.getTotalSize()}>
              {rowVirtualizer.getVirtualItems()?.map(({ index, key, size, start }) => {
                const item = filteredItems[index];
                if (item.selected === undefined) {
                  item.selected = false;
                }
                const value = valueGetter(item);
                return (
                  <Tooltip title={tooltipGetter ? tooltipGetter(item) : value} key={key} enterDelay={500}>
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
                      {customRenderer ? customRenderer(item) : <ListItemText>{value}</ListItemText>}
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
