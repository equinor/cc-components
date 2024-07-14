import { useRef, useState } from "react";
import { Checkbox, Icon, Popover } from "@equinor/eds-core-react";
import React from "react";
import styled from "styled-components";
import { FilterStateGroup } from "../filter-configuration";
import { useOutsideClick } from "../hooks/useOutsideClick";

export type FilterGroupProps = {
  group: FilterStateGroup;
  onCheck: (name: string, value: string, add: boolean) => void;
}
export function FilterGroup({ group, onCheck }: FilterGroupProps) {
  const [isOpen, setIsOpen] = useState(false)
  const groupRef = useRef<HTMLDivElement | null>(null)
  useOutsideClick(() => setIsOpen(false), groupRef);

  return (<>
    <div ref={groupRef} key={group.name} onClick={() => setIsOpen(s => !s)} style={{ display: "flex", alignItems: "center", cursor: "pointer" }}>{group.name}<Icon name="chevron_down" /></div>
    <Popover style={{ boxSizing: "border-box", padding: "0px" }} anchorEl={groupRef.current} open={isOpen}>
      <Popover.Header>
        <Popover.Title>{group.name}</Popover.Title>
      </Popover.Header>
      <Popover.Content>
        {group.allValues.map(filterValue => <StyledFilterItem key={filterValue}><Checkbox onChange={() => {
          onCheck(group.name, filterValue, !group.values.includes(filterValue))
        }} checked={group.values.includes(filterValue)} />{filterValue}</StyledFilterItem>)}
      </Popover.Content>
    </Popover>
  </>)
}
const StyledFilterItem = styled.div`
display: flex;
align-items: center;
`
