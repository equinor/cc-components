import { HandoverPackage } from '@cc-components/handovershared';
import { ApiGardenMeta } from '@cc-components/shared/workspace-config';
import { GardenItem } from '@cc-components/handoverapp';
import { tokens } from '@equinor/eds-tokens';
import { FilterState, filterGroups } from './filter-configuration';
import { useHttpClient } from '@equinor/fusion-framework-react-module-http';
import { useCallback, useMemo, useRef, useState } from 'react';
import { useContextId } from '@cc-components/shared';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { Icon, Typography } from '@equinor/eds-core-react';
import { VirtualCommPkgCards } from './components/VirtualCommpkgList';
import { FilterGroup } from './components/Filter';
import { TransferSidesheet } from './sidesheet/index'


export function Transfer() {
  const ccApi = useHttpClient("cc-app");
  const [selected, setSelected] = useState<string | null>(null)
  const vRef = useRef<HTMLDivElement | null>(null)
  const contextId = useContextId();
  const [filterState, setFilterState] = useState<FilterState>([]);
  const [startIndex, setStartIndex] = useState(-1);

  const { data, isLoading } = useQuery<unknown, unknown, ApiGardenMeta>({
    queryKey: ["meta"],
    staleTime: Infinity,
    refetchOnWindowFocus: false,
    queryFn: async () => {
      const body = `{"groupingKeys":["RFOC"],"dateVariant":"Forecast","timeInterval":"Weekly","filter":{"groups":[],"search":""}}`
      const res = await ccApi.fetchAsync(`api/contexts/${contextId}/handover/garden-meta`, {
        method: "POST",
        headers: { ["content-type"]: "application/json" },
        body: body,
      })

      const s = await res.json();
      if (startIndex === -1 && s.startIndex !== 0) {
        setStartIndex(s.startIndex)
      }
      return s;
    }
  })

  const { data: gardenRaw, isLoading: gardenLoading, isPending } = useQuery<unknown, unknown, { items: HandoverPackage[], columnName: string }[]>({
    queryKey: ["garden"],
    enabled: !!data,
    refetchOnWindowFocus: false,
    staleTime: Infinity,
    queryFn: async () => {
      const body = `{"columnStart":${0},"columnEnd":${data?.columnCount},"rowStart":0,"rowEnd":${data?.rowCount},"groupingKeys":["RFOC"],"dateVariant":"Forecast","timeInterval":"Weekly","filter":{"groups":[],"search":""}}`
      const res = await ccApi.fetchAsync(`api/contexts/${contextId}/handover/garden`, {
        method: "POST",
        headers: { ["content-type"]: "application/json" },
        body: body
      })
      const columns = (await res.json()) as { items: HandoverPackage[] }[];
      const generatedFilterGroups = filterGroups.map((s): { name: string, values: string[], valueGetter: (s: HandoverPackage) => string | string[], allValues: Set<string> } => ({ name: s.name, values: [], allValues: new Set<string>(), valueGetter: s.valueGetter }))
      generatedFilterGroups.forEach(group => {
        columns.forEach(column => {
          column.items.forEach(element => {
            const value = group.valueGetter(element)
            const r = Array.isArray(value) ? value : [value]
            r.forEach(aa => group.allValues.add(aa))
          })
        })
      })
      const r: FilterState = generatedFilterGroups.map((s): FilterState[number] => ({ name: s.name, valueGetter: s.valueGetter, values: [], allValues: [...s.allValues] }))
      setFilterState(r)
      return columns
    }
  })

  const gardenFiltered = useMemo(() => {
    if (!gardenRaw) return []
    return gardenRaw[startIndex].items.filter(s => {
      if (filterState.length == 0) {
        return true
      }
      return filterState.every(state => {
        if (!state.values.length) {
          return true
        }
        const val = state.valueGetter(s)
        if (Array.isArray(val)) {
          return state.values.some(items => val.includes(items))
        } else {
          return state.values.includes(val)
        }
      })
    })
  }, [filterState, gardenRaw, startIndex])


  const onClickFilter = useCallback((name: string, value: string, add: boolean) => {
    setFilterState(groups => {
      const group = groups.find(s => s.name == name);
      if (!group) {
        throw new Error(`${name} is not a filter group`)
      }
      if (!add) {
        group.values = group.values.filter(s => s !== value)
      } else {
        group.values = [...group.values, value]
      }
      return [...groups]
    })

  }, [filterState, setFilterState])

  if (isLoading || gardenLoading || isPending) {
    return <div>Loading...</div>
  }

  if (!gardenFiltered) {
    throw new Error("uh-oh")
  }

  return (
    <div style={{ width: "100%", height: "100%", justifyContent: "center", alignItems: "center", display: "flex", boxSizing: "border-box", padding: "5px" }}>
      {!selected && (
        <div ref={vRef} style={{ flexDirection: "column", height: "100%", width: "300px", display: "flex" }}>
          {gardenFiltered.map(s => <div key={s.commissioningPackageNo} style={{ height: "40px", boxSizing: "border-box", padding: "0px 7px", display: "flex", alignItems: "center", justifyContent: "center" }}> <GardenItem height={100} width={200} parentRef={vRef} depth={0} columnExpanded={false} isSelected={selected == s.commissioningPackageNo} key={s.commissioningPackageNo} data={s} onClick={() => { setSelected(s.commissioningPackageNo) }} /> </div>)}
        </div>
      )}
      <div style={{ height: "100%", width: "100%" }}>
        <Typography variant="h1_bold">Planned Packages for RFOC</Typography> <span style={{ display: "flex", alignItems: "center", fontWeight: 500 }}><Icon style={{ cursor: "pointer" }} name="chevron_left" color={tokens.colors.interactive.primary__resting.hex} onClick={() => { setStartIndex(s => s - 1) }} /> Week {gardenRaw?.at(startIndex)?.columnName.slice(5)} <Icon name="chevron_right" color={tokens.colors.interactive.primary__resting.hex} onClick={() => { setStartIndex(s => s + 1) }} style={{ cursor: "pointer" }} /> </span>
        <div> <div style={{ display: "flex", gap: "20px", fontWeight: 500 }}>
          {filterState.map(filterStateGroup => <FilterGroup onCheck={onClickFilter} key={filterStateGroup.name} group={filterStateGroup} />)}
        </div></div>
        <div style={{ height: "100%", width: "100%", display: "flex", flexDirection: "column", gap: "20px" }}>
          <VirtualCommPkgCards setSelected={setSelected} selected={selected} commPkgs={gardenFiltered} />
        </div>
      </div>
      {selected && (<div style={{ height: "100%", width: "100%", boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.1), 0 6px 20px 0 rgba(0, 0, 0, 0.1)" }}>
        <TransferSidesheet id={gardenFiltered.find(s => s.commissioningPackageNo == selected)?.commissioningPackageUrlId!} close={() => setSelected(null)} item={gardenFiltered.find(s => s.commissioningPackageNo == selected)} />
      </div>)}
    </div>
  )
}


