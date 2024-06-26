import { Skeleton } from '@cc-components/sharedcomponents';
import { useVirtualizer } from '@tanstack/react-virtual';
import { RootAppWrapper, StatusCircle, createRender, statusColorMap, useContextId } from '@cc-components/shared';
import { HandoverPackage } from '@cc-components/handovershared';
import { ApiGardenMeta } from '@cc-components/shared/workspace-config';
import { QueryClient, QueryClientProvider, useQuery, keepPreviousData } from '@tanstack/react-query'
import React, { useMemo, useRef, useState, useCallback, useEffect, MutableRefObject } from 'react';
import { configure } from './framework-config';
import * as icons from '@equinor/eds-icons';
import { Checkbox, Icon, Popover, Typography } from '@equinor/eds-core-react';
import { useHttpClient } from '@equinor/fusion-framework-react-module-http';
import { GardenItem } from '@cc-components/handoverapp';
import { StyledSizes } from './garden.styles';
import { Punch, Workorder } from './types';
import styled from 'styled-components';
import { tokens } from '@equinor/eds-tokens';

export type FilterModel = FilterGroup[]

export interface FilterGroup {
  name: string
  filterItems: FilterItem[]
  isQuickFilter: boolean
}

export interface FilterItem {
  value: string
  count: number
}

type FilterGroupDef = {
  name: string;
  valueGetter: (s: HandoverPackage) => string | string[]
}

const filterGroups: FilterGroupDef[] = [
  {
    name: "MC Status",
    valueGetter: (s: HandoverPackage) => s.mechanicalCompletionStatus
  },
  {
    name: "Comm Status",
    valueGetter: (s: HandoverPackage) => s.dynamicCommissioningStatus
  },
  {
    name: "MC Disciplines",
    valueGetter: (s: HandoverPackage) => s.mcDisciplines?.split(",") ?? "(Blank)"
  },
  {
    name: "Missing PunchOut",
    valueGetter: (s: HandoverPackage) => {

      switch (true) {
        case !s.remainingPunchOutCount || s.remainingPunchOutCount == 0:
          return "0"
        case s!.remainingPunchOutCount! <= 5:
          return "1-5"
        case s.remainingPunchOutCount! <= 10:
          return "5-10"
        default:
          return "11+"

      }
    }
  }
]

type FilterState = FilterStateGroup[]

type FilterStateGroup = { values: string[], name: string, valueGetter: (s: HandoverPackage) => string | string[], allValues: string[] }


Icon.add(icons)

function Transfer() {
  const ccApi = useHttpClient("cc-api");
  const [selected, setSelected] = useState<string | null>(null)
  const vRef = useRef<HTMLDivElement | null>(null)
  const contextId = useContextId();
  const [filterState, setFilterState] = useState<FilterState>([]);
  const [startIndex, setStartIndex] = useState(-1);

  const setSelectedAndScroll = (value: string) => {
    setSelected(value)
    //TODO: add scrolling
  }

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
    placeholderData: keepPreviousData,
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
      // debugger;
      return columns
    }
  })


  console.log(gardenRaw)


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
    setFilterState(s => {
      const group = s.find(s => s.name == name);
      if (!group) {
        throw new Error(`${name} is not a filter group`)
      }
      if (!add) {
        group.values = group.values.filter(s => s !== value)
      } else {
        group.values = [...group.values, value]
      }
      return [...s]
    })

  }, [filterState, setFilterState])

  if (isLoading || gardenLoading || isPending) {
    return <div>Loading...</div>
  }
  console.log(filterState)
  if (!gardenFiltered) {
    throw new Error("uh-oh")
  }
  return (
    <div style={{ width: "100%", height: "100%", justifyContent: "center", alignItems: "center", display: "flex", boxSizing: "border-box", padding: "5px" }}>
      <div ref={vRef} style={{ flexDirection: "column", height: "100%", width: "300px", display: "flex" }}>
        {gardenFiltered.map(s => <div key={s.commissioningPackageNo} style={{ height: "40px", boxSizing: "border-box", padding: "0px 7px", display: "flex", alignItems: "center", justifyContent: "center" }}> <GardenItem height={100} width={200} parentRef={vRef} depth={0} columnExpanded={false} isSelected={selected == s.commissioningPackageNo} key={s.commissioningPackageNo} data={s} onClick={() => { setSelectedAndScroll(s.commissioningPackageNo) }} /> </div>)}
      </div>
      <div style={{ height: "100%", width: "100%" }}>
        <Typography variant="h1_bold">Planned Packages for RFOC</Typography> <span style={{ display: "flex", alignItems: "center", fontWeight: 500 }}><Icon style={{ cursor: "pointer" }} name="chevron_left" color={tokens.colors.interactive.primary__resting.hex} onClick={() => { setStartIndex(s => s - 1) }} /> Week {gardenRaw?.at(startIndex)?.columnName.slice(5)} <Icon name="chevron_right" color={tokens.colors.interactive.primary__resting.hex} onClick={() => { setStartIndex(s => s + 1) }} style={{ cursor: "pointer" }} /> </span>
        <div> <div style={{ display: "flex", gap: "20px", fontWeight: 500 }}>
          {filterState.map(s => <FilterGroup onCheck={onClickFilter} key={s.name} group={s} />)}
        </div></div>
        <div style={{ boxSizing: "border-box", padding: "20px", height: "100%", width: "100%", display: "flex", flexDirection: "column", gap: "20px" }}>
          <VirtualCommPkgCards selected={selected} commPkg={gardenFiltered} />
        </div>
      </div>
    </div>
  )
}

type VirtualCommPkgCardsProps = {
  commPkg: HandoverPackage[];
  selected: string | null;
}
function VirtualCommPkgCards({ commPkg, selected }: VirtualCommPkgCardsProps) {
  const parentRef = React.useRef<HTMLDivElement | null>(null)

  const rowVirtualizer = useVirtualizer({
    count: commPkg.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 180,
  })

  useEffect(() => {
    if (selected) {
      rowVirtualizer.scrollToIndex(commPkg.findIndex(s => s.commissioningPackageNo == selected), {align: "center"})
    }
  }, [selected])
  return (
    <>
      {/* The scrollable element for your list */}
      <div
        ref={parentRef}
        style={{
          height: `100%`,
          overflow: 'auto', // Make it scroll!
        }}
      >
        {/* The large inner element to hold all of the items */}
        <div
          style={{
            height: `${rowVirtualizer.getTotalSize()}px`,
            width: '100%',
            position: 'relative',
          }}
        >
          {/* Only the visible items in the virtualizer, manually positioned to be in view */}
          {rowVirtualizer.getVirtualItems().map((virtualItem) => (
            <div
              key={virtualItem.key}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: `${virtualItem.size}px`,
                transform: `translateY(${virtualItem.start}px)`,
              }}
            >
              <CommPkgCard isSelected={selected == commPkg[virtualItem.index].commissioningPackageNo} commPkg={commPkg[virtualItem.index]} />
            </div>
          ))}
        </div>
      </div>
    </>
  )
}


export const useOutsideClick = (
  handler: (e: MouseEvent, el: HTMLElement) => void,
  ...refs: MutableRefObject<HTMLElement | null>[]
) => {
  const onOutsideClick = (e: MouseEvent) => {
    /** Eds input LI is removed from dom before callback runs */
    if (!document.contains(e.target as Node)) {
      return;
    }

    // updated this to use the passed componentRef
    const inMain = refs.some((s) => s.current?.contains(e.target as HTMLElement));
    const isOutside = !inMain;
    if (isOutside) {
      handler(e, e.target as HTMLElement);
    }
  };
  useEffect(() => {
    document.addEventListener('click', onOutsideClick);
    return () => {
      document.removeEventListener('click', onOutsideClick);
    };
  }, [refs]);
};
type FilterGroupProps = {
  group: FilterStateGroup;
  onCheck: (name: string, value: string, add: boolean) => void;
}
function FilterGroup({ group, onCheck }: FilterGroupProps) {
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
        {group.allValues.map(s => <StyledFilterItem key={s}><Checkbox onChange={() => {
          onCheck(group.name, s, !group.values.includes(s))
        }} checked={group.values.includes(s)} />{s}</StyledFilterItem>)}
      </Popover.Content>
    </Popover>
  </>)
}
const StyledFilterItem = styled.div`
display: flex;
align-items: center;
`

type StyledStatusPropertyProps = {
  title: string;
  value: string | React.ReactNode;
}
const StyledStatusProperty = ({ title, value }: StyledStatusPropertyProps) => {
  return <Typography style={{ display: "flex", alignItems: "center", gap: "5px" }}>{title}<Typography bold>{value}</Typography></Typography>
}

export const getItemSize = (
  volume: number,
  maxVolume: number
): 'small' | 'medium' | 'large' => {
  if (maxVolume <= 0) return 'small';
  const percentage = (volume / maxVolume) * 100;
  return percentage > 66 ? 'large' : percentage > 33 ? 'medium' : 'small';
};

type CommPkgCardProps = {
  commPkg: HandoverPackage
  isSelected: boolean;
}
const CommPkgCard = ({ commPkg, isSelected }: CommPkgCardProps) => {
  const contextId = useContextId();
  const ccapi = useHttpClient("cc-api");
  const { data: punch, isLoading: isPunchLoading } = useQuery({
    queryKey: ["punch", commPkg.commissioningPackageNo],
    staleTime: Infinity,
    refetchOnWindowFocus: false,
    queryFn: async (): Promise<Punch[]> => {
      const res = await ccapi.fetchAsync(`api/contexts/${contextId}/handover/${commPkg.commissioningPackageUrlId}/punch`)
      return res.json();
    }
  })
  const { data: workorders, isLoading: isWorkordersLoading } = useQuery({
    queryKey: ["workorders", commPkg.commissioningPackageNo],
    enabled: false,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
    queryFn: async (): Promise<Workorder[]> => {
      const res = await ccapi.fetchAsync(`api/contexts/${contextId}/handover/${commPkg.commissioningPackageUrlId}/work-orders`)
      return res.json();
    }
  })

  const { data: unsignedTasks, isLoading: isUnsignedTasksLoading } = useQuery({
    queryKey: ["unsignedTasks", commPkg.commissioningPackageNo],
    staleTime: Infinity,
    refetchOnWindowFocus: false,
    queryFn: async () => {
      const res = await ccapi.fetchAsync(`api/contexts/${contextId}/handover/${commPkg.commissioningPackageUrlId}/unsigned-tasks`)
      return (await res.json()).length
    }
  })

  const { data: unsignedActions, isLoading: isUnsignedActionsLoading } = useQuery({
    queryKey: ["unsignedActions", commPkg.commissioningPackageNo],
    staleTime: Infinity,
    refetchOnWindowFocus: false,
    enabled: !!commPkg.hasUnsignedActions,
    queryFn: async () => {
      const res = await ccapi.fetchAsync(`api/contexts/${contextId}/handover/${commPkg.commissioningPackageUrlId}/unsigned-actions`)
      return (await res.json()).length
    }
  })
  const size = getItemSize(commPkg.volume, 100 || 0)
  return (
    <div style={{ height: "150px", border: isSelected ? "1px solid red" : undefined, gap: "10px", padding: "10px", boxSizing: "border-box", width: "100%", display: "grid", gridTemplateRows: "1fr 1fr", background: "white", boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.1), 0 6px 20px 0 rgba(0, 0, 0, 0.1)" }}>
      <div style={{ display: "flex", justifyContent: "space-between", flexDirection: "row", gap: "5px", position: "relative" }}>
        <div>
          <StyledSizes size={size} color='grey' />
          <Typography bold style={{ marginLeft: "24px" }}>{commPkg.commissioningPackageNo}</Typography>
        </div>
        <div style={{ display: "flex", flexDirection: "row", gap: "10px" }}>
          {true ? <></> : isWorkordersLoading ? <Skeleton height='24px' width='140px' /> : <StyledStatusProperty title="WO progress:" value={`${workorders?.reduce((acc, curr) => curr.projectProgress < acc ? curr.projectProgress : acc, 0)}%`} />}
          <StyledStatusProperty title="RFC status:" value={`${commPkg.mechanicalCompletionPkgsRfccSignedCount} / ${commPkg.mechanicalCompletionPkgsCount}`} />
          <StyledStatusProperty title="MC status:" value={<StatusCircle content={commPkg.mechanicalCompletionStatus} statusColor={statusColorMap[commPkg.mechanicalCompletionStatus]} />} />
          <StyledStatusProperty title="Commissioning status:" value={<StatusCircle content={commPkg.dynamicCommissioningStatus} statusColor={statusColorMap[commPkg.dynamicCommissioningStatus]} />} />
        </div>
      </div>

      <div style={{ display: "flex", gap: "5px", justifyContent: "space-between", alignItems: 'center', }}>
        <span style={{ display: "flex", gap: "20px" }}>
          {isPunchLoading ? <>
            <Skeleton height='24px' width='120px' />
            <Skeleton height='24px' width='120px' />
          </> :
            <>
              <StyledStatusProperty title="Punch A:" value={<div style={{ display: "flex", gap: "5px", alignItems: "center" }}>{punch && punch.filter(s => s.category == "PA").length}<Icon name="info_circle" color="red" /></div>} />
              <StyledStatusProperty title="Punch B:" value={<div style={{ display: "flex", gap: "5px", alignItems: "center" }}>{punch && punch.filter(s => s.category == "PB").length}<Icon name="info_circle" color="orange" /></div>} />
            </>}
        </span>
        <span style={{ display: "flex", gap: "5px" }}>
          <StyledStatusProperty title="Unsigned CPCL:" value="3" />
          {isUnsignedActionsLoading ? <Skeleton width='140px' height='20px' /> : <StyledStatusProperty title="Unsigned Actions:" value={commPkg.hasUnsignedActions ? unsignedActions : 0} />}
          {isUnsignedTasksLoading ? <Skeleton width='140px' height='20px' /> : <StyledStatusProperty title="Unsigned Tasks:" value={unsignedTasks} />}
        </span>
      </div>
    </div>
  )
}

const queryclient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    }
  }
})

const TransferApp = () => {
  const ccApi = useHttpClient("cc-api")
  return (
    <QueryClientProvider client={queryclient}>
      <RootAppWrapper client={ccApi}>
        <Transfer />
      </RootAppWrapper>
    </QueryClientProvider>
  );
};


export const render = createRender(TransferApp, configure, 'Transfer');

export default render;

