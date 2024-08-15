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
import { Autocomplete, Button, Checkbox, EdsProvider, Icon, Switch, Typography } from '@equinor/eds-core-react';
import { VirtualCommPkgCards } from './components/VirtualCommpkgList';
import { TransferSidesheet } from './sidesheet/index'
import { SidesheetWrapper } from './SidesheetWrapper';
import { Skeleton } from '@cc-components/sharedcomponents';
import styled from 'styled-components';

export const colorPallet = {
  cardDark: "#2C4251",
  cardWhite: "#fffff",
  uiDark: "#132634",
  uiWhite: "#fffff",
}


const Moon = () => (<svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M8 6C7.99965 7.40007 8.36673 8.77571 9.06457 9.98947C9.76241 11.2032 10.7666 12.2126 11.9767 12.9167C13.1868 13.6208 14.5605 13.995 15.9606 14.0019C17.3606 14.0088 18.738 13.6482 19.955 12.956C19.474 18.03 15.2 22 10 22C4.477 22 0 17.523 0 12C0 6.8 3.97 2.526 9.044 2.045C8.35756 3.24994 7.99768 4.61325 8 6ZM2 12C2 14.1217 2.84285 16.1566 4.34315 17.6569C5.84344 19.1571 7.87827 20 10 20C11.4135 19.9999 12.8017 19.6256 14.0237 18.9151C15.2456 18.2047 16.2577 17.1834 16.957 15.955C16.641 15.985 16.321 16 16 16C10.477 16 6 11.523 6 6C6 5.679 6.015 5.36 6.045 5.043C4.81664 5.74232 3.79533 6.75439 3.08486 7.97633C2.37438 9.19827 2.00008 10.5865 2 12ZM16.164 2.291L17 2.5V3.5L16.164 3.709C15.8124 3.79693 15.4913 3.97875 15.235 4.23503C14.9788 4.4913 14.7969 4.8124 14.709 5.164L14.5 6H13.5L13.291 5.164C13.2031 4.8124 13.0212 4.4913 12.765 4.23503C12.5087 3.97875 12.1876 3.79693 11.836 3.709L11 3.5V2.5L11.836 2.291C12.1874 2.20291 12.5083 2.02102 12.7644 1.76475C13.0205 1.50849 13.2021 1.18748 13.29 0.836L13.5 0H14.5L14.709 0.836C14.7969 1.1876 14.9788 1.5087 15.235 1.76497C15.4913 2.02125 15.8124 2.20307 16.164 2.291ZM21.164 7.291L22 7.5V8.5L21.164 8.709C20.8124 8.79693 20.4913 8.97875 20.235 9.23503C19.9788 9.4913 19.7969 9.8124 19.709 10.164L19.5 11H18.5L18.291 10.164C18.2031 9.8124 18.0212 9.4913 17.765 9.23503C17.5087 8.97875 17.1876 8.79693 16.836 8.709L16 8.5V7.5L16.836 7.291C17.1876 7.20307 17.5087 7.02125 17.765 6.76497C18.0212 6.5087 18.2031 6.1876 18.291 5.836L18.5 5H19.5L19.709 5.836C19.7969 6.1876 19.9788 6.5087 20.235 6.76497C20.4913 7.02125 20.8124 7.20307 21.164 7.291Z" fill="#6F6F6F" />
</svg>)


export function Transfer() {
  const ccApi = useHttpClient("cc-app");
  const [selected, setSelected] = useState<string | null>(null)
  const vRef = useRef<HTMLDivElement | null>(null)
  const cardsRef = useRef<HTMLDivElement | null>(null)
  const contextId = useContextId();
  const [startIndex, setStartIndex] = useState(-1);
  const [isCompact, setIsCompact] = useState(false)
  const [isDark, setIsDark] = useState(false)
  const [disciplines, setDisciplines] = useState<string[]>([])
  const [discipline, setDiscipline] = useState<string | undefined>()
  const [selectedPackages, setSelectedPackages] = useState<string[]>([])

  const { data, isLoading: isMetaLoading } = useQuery<unknown, unknown, ApiGardenMeta>({
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
      setDisciplines(r[0].allValues)
      return columns
    }
  })

  const gardenFiltered = useMemo(() => {
    if (!gardenRaw) return []
    if (discipline) {
      return gardenRaw[startIndex].items.filter(s => {
        if (s.mcDisciplines == null) {
          return discipline == "(Blank)"
        } else {
          return s.mcDisciplines.split(",").includes(discipline)
        }
      })
    } else {
      return gardenRaw[startIndex].items
    }
  }, [discipline, gardenRaw, startIndex])

  const isLoading = isMetaLoading || gardenLoading || isPending

  console.log(cardsRef?.current?.scrollHeight)
  return (
    <EdsProvider density={isCompact ? "compact" : "comfortable"}>
      <div key={isDark ? "abc" : "bbc"} style={{ display: "flex", flexDirection: "column", background: isDark ? colorPallet.uiDark : colorPallet.uiWhite, height: "100%" }}>
        <Settings toggleDarkMode={() => setIsDark(s => !s)} toggleCompact={() => setIsCompact(s => !s)} isDark={isDark} isCompact={isCompact} />
        <Header setDiscipline={(d) => setDiscipline(d)} decrementStartIndex={() => setStartIndex(s => s - 1)} incrementStartIndex={() => setStartIndex(s => s + 1)} gardenRaw={gardenRaw} startIndex={startIndex} disciplines={disciplines} />

        <div style={{ width: "100%", height: "100%", justifyContent: "center", display: "flex", boxSizing: "border-box", }}>
          <div ref={vRef} style={{ flexDirection: "column", height: "100%", width: "300px", display: "flex" }}>
            {isLoading ? <>
              {new Array(24).fill(null).map(s => <StyledGardenItemWrapper> <Skeleton height={"35px"} width={"100%"} /> </StyledGardenItemWrapper>)}
            </> : <>
              {gardenFiltered.map(s => <div key={s.commissioningPackageNo} style={{ height: "40px", boxSizing: "border-box", padding: "0px 7px", display: "flex", alignItems: "center", justifyContent: "center" }}> <GardenItem height={100} width={200} parentRef={vRef} depth={0} columnExpanded={false} isSelected={selected == s.commissioningPackageNo} key={s.commissioningPackageNo} data={s} onClick={() => { setSelected(s.commissioningPackageNo) }} /> </div>)}
            </>}
          </div>
          <div style={{ paddingRight: "40px", borderLeft: "1px solid grey" }} />
          <div ref={cardsRef} style={{ height: "calc(100% - 100px)", width: "100%", display: "flex", flexDirection: "column", gap: "5px", position: "relative" }}>
            <VirtualCommPkgCards setSelected={(s) => {
              if (selectedPackages.includes(s)) {
                setSelectedPackages(x => [...x.filter(y => y !== s)])
              } else {
                setSelectedPackages(x => [...x, s])
              }
            }} selectedPackages={selectedPackages} isLoading={isLoading} onClickCard={setSelected} selected={selected} commPkgs={gardenFiltered} />
            {!!selectedPackages.length && (<div style={{ position: "absolute", height: "70px", width: "100%", boxSizing: "border-box", padding: "10px", display: "flex", alignItems: "center", justifyContent: "space-between", background: "white", borderTop: "1px solid grey", top: (cardsRef.current?.clientHeight ?? 0) - 70, right: 0 }}>
              <Typography>{selectedPackages.length} package(s) selected</Typography>
              <span style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                <Button>Initiate selected packages</Button>
                <Button variant='outlined'>Postpone selected packages</Button>
              </span>
            </div>)}
          </div>

          <Sidesheet selected={selected} gardenFiltered={gardenFiltered} onClose={() => setSelected(null)} />
        </div>
      </div>
    </EdsProvider>
  )
}

type SidesheetProps = {
  selected: string | null;
  gardenFiltered: HandoverPackage[] | undefined
  onClose: VoidFunction;
}
const Sidesheet = ({ selected, gardenFiltered, onClose }: SidesheetProps) => {
  return (
    <>
      {selected && (
        <div style={{ position: "absolute", top: 0, right: 0, height: "100%" }}>
          <SidesheetWrapper>
            <TransferSidesheet id={gardenFiltered?.find(s => s.commissioningPackageNo == selected)?.commissioningPackageUrlId!} close={onClose} item={gardenFiltered?.find(s => s.commissioningPackageNo == selected)} />
          </SidesheetWrapper>
        </div>
      )}
    </>
  )
}

type HeaderProps = {
  decrementStartIndex: VoidFunction;
  incrementStartIndex: VoidFunction;
  gardenRaw: { columnName: string }[] | undefined;
  startIndex: number;
  disciplines: string[];
  setDiscipline: (discipline: string | undefined) => void;
}
const Header = ({ gardenRaw, decrementStartIndex, setDiscipline, incrementStartIndex, startIndex, disciplines }: HeaderProps) => {
  return (
    <span style={{ width: "100%", border: "1px solid grey", display: "flex", alignItems: "center", justifyContent: "space-between", boxSizing: "border-box", padding: "10px", height: "50px" }}>
      <span style={{ display: "flex" }}>
        <Typography variant="h1_bold">Planned Packages for RFOC</Typography>
        <span style={{ display: "flex", alignItems: "center", fontWeight: 500 }}>
          <Icon style={{ cursor: "pointer" }} name="chevron_left" color={tokens.colors.interactive.primary__resting.hex} onClick={decrementStartIndex} />
          Week {gardenRaw?.at(startIndex)?.columnName.slice(5)}
          <Icon name="chevron_right" color={tokens.colors.interactive.primary__resting.hex} onClick={incrementStartIndex} style={{ cursor: "pointer" }} />
        </span>
      </span>

      <span style={{ display: "flex", alignItems: 'center', gap: "10px" }}>
        <Typography>0 unsigned and 0 signed packages</Typography>
        <Autocomplete options={disciplines} label={""} onOptionsChange={(ev) => setDiscipline(ev.selectedItems[0])} placeholder='Filter by discipline' />
        <span style={{ display: "flex", alignItems: "center" }}>
          <Checkbox />
          <Typography style={{ whiteSpace: "nowrap" }}>Include signed packages</Typography>
        </span>
      </span>
    </span>

  )
}


const StyledGardenItemWrapper = styled.div`
height: 40px;
box-sizing: border-box;
padding: 0px 7px;
display: flex;
align-items: center;
justify-content: center;
`

type SettingsProps = {
  isCompact: boolean;
  isDark: boolean;
  toggleDarkMode: VoidFunction;
  toggleCompact: VoidFunction;
}

const Settings = ({ isCompact, isDark, toggleCompact, toggleDarkMode }: SettingsProps) => {
  return (
    <span style={{ height: "50px", display: "flex", alignItems: "center", justifyContent: "flex-end" }}>
      <span style={{ display: "flex", alignItems: "center" }}>
        <Switch checked={isDark ? true : false} onChange={toggleDarkMode} />
        <Moon />
      </span>
      <span style={{ display: "flex", alignItems: "center" }}>
        <Switch checked={isCompact ? true : false} onChange={toggleCompact} />
        <Icon name="format_size" color='#6F6F6F' />
      </span>
    </span>

  )
}
