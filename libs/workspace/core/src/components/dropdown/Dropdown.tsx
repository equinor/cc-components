import React, { useEffect, useRef, useState } from 'react';
import { EdsProvider, Icon, Typography } from '@equinor/eds-core-react';
import { DropdownContainer } from './Dropdown.styles';
import { DropdownListItem, DropdownPopover } from './DropdownPopover';

export type DropdownProps<T> = {
  children: React.ReactNode;
  listItems: T[] | DropdownListItem<T>[];
  valueSelected: (value: T) => void;
  tooltipGetter?: (value: T) => string;
  valueGetter: (value: T) => string;
  clearAll?: () => void;
  customRenderer?: (value: T) => React.ReactNode;
};

export const Dropdown = <T,>({
  children,
  listItems,
  valueSelected,
  valueGetter,
  tooltipGetter,
  customRenderer,
  clearAll,
}: DropdownProps<T>) => {
  const [open, setOpen] = useState(false);
  const anchorEl = useRef<HTMLDivElement>(null);

  const selectedCount = (listItems as DropdownListItem<T>[]).filter((item) => item.selected).length;

  const handleValueSelected = (value: T, selected: boolean) => {
    valueSelected(value);
  };

  return (
    <EdsProvider density="compact">
      <DropdownContainer onClick={() => setOpen(!open)} ref={anchorEl} selected={selectedCount > 0}>
        {children}
        {selectedCount > 0 && <Typography variant="caption">{` (+${selectedCount})`}</Typography>}
        <Icon name={open ? 'chevron_up' : 'chevron_down'} />
      </DropdownContainer>
      {open && (
        <DropdownPopover
          open={true}
          anchorEl={anchorEl.current}
          listItems={listItems as DropdownListItem<T>[]}
          valueSelected={handleValueSelected}
          valueGetter={valueGetter}
          clickedOutside={() => setOpen(false)}
          clearAll={() => {
            clearAll?.();
          }}
          buttonElement={anchorEl}
          tooltipGetter={tooltipGetter}
          customRenderer={customRenderer}
        />
      )}
    </EdsProvider>
  );
};
