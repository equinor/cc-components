import { ClientGrid } from '@equinor/workspace-ag-grid';
import React, { useEffect, useState } from 'react';
import { Autocomplete, Button, CircularProgress, Icon, Typography } from '@equinor/eds-core-react'
import { commpkgQuery, tagQuery } from './famqueries';
import { FamCommPkg, Famtag } from './types';
import { useFamQuery } from './useFamQuery';
import { tagsDef } from './tagcolumns'
import { StateProps } from './main';
import { tokens } from '@equinor/eds-tokens';
import { useMutation } from '@tanstack/react-query';

const mccr_status_map = {
  0: "OS",
  1: "PA",
  2: "PB",
  3: "OK"
}

function useCommissioningPackages(facility: string) {
  return useFamQuery<FamCommPkg[]>(["commpkgs"], commpkgQuery(facility))
}

export type ScopingProps = {
  tags: Famtag[] | null;
  setTags: (tags: Famtag[]) => void;
} & StateProps

export function Scoping(props: ScopingProps) {
  const [commpkg, setCommPkg] = useState<FamCommPkg | null>(null)

  const { isLoading: tagsLoading, data: tagsData } = useFamQuery<Famtag[]>(["tags", commpkg?.commissioningPackageNo ?? ""], tagQuery(commpkg?.commissioningPackageNo ?? "", props.facility), !!commpkg)
  const tags = tagsData?.map(s => ({ ...s, mccrStatus: mccr_status_map[s.worstStatus] })) as Famtag[]
  const [reports, setReports] = useState<string[]>([])


  const { isPending, mutateAsync } = useMutation({
    mutationFn: async () => {
      const promise = Promise.all([
        new Promise((res) => setTimeout(() => {
          setReports(s => [...s, "MC21 - Commissioning package for certificate"]);
          res("")
        }, 500)),
        new Promise((res) => setTimeout(() => {
          setReports(s => [...s, "DCP01 - Dynamic Commissioning Procedure - Relevant parts of commissioning procedure signed out"]);
          res("")
        }, 1000)),
        new Promise((res) => setTimeout(() => {
          setReports(s => [...s, "MC22 - CPCL/RL content by comm.pkg - CPCL/RL content by comm.pkg for certificate"]);
          res("")
        }, 1500)),
        new Promise((res) => setTimeout(() => {
          setReports(s => [...s, "MC84 - Punchlist report for certificate"]);
          res("")
        }, 2000)),

      ]);
      return await promise
    }
  })

  useEffect(() => {
    props.setTags(tags)
  }, [commpkg?.commissioningPackageNo, tagsData])

  const { isLoading, data, error } = useCommissioningPackages("JCA")


  return (
    <div style={{ height: "100%", border: "2px solid grey", alignItems: "center", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
      <Typography variant='h1_bold'>Scoping</Typography>
      <div style={{ width: "200px", display: "flex", alignItems: "center" }}>
        <Autocomplete disabled={!props.isActive} onOptionsChange={(a) => {
          setCommPkg(a.selectedItems[0] ?? null)
          setReports([])
          mutateAsync()
        }} optionLabel={s => s.commissioningPackageNo} selectedOptions={[]} multiple={false} options={data ?? []} label={"Search commpkg for transfer"} />
        {isLoading && (<CircularProgress size={16} />)}
      </div>
      <Typography style={{ display: "flex", alignItems: "center" }} variant='h3'>Tags {tagsLoading && (<CircularProgress size={16} />)}</Typography>
      <div style={{ width: "500px" }}>
        <ClientGrid height={250} rowData={tags ?? []} colDefs={tagsDef} />
      </div>

      <>{commpkg && (
        <>
          <Typography variant='h3'>Reports</Typography>
          {isPending && (<div><CircularProgress size={16} /><Typography>Generating reports....</Typography></div>)}
          <Reports reports={reports} />
        </>
      )}</>
      <Button disabled={isPending || !tags || tags?.some(s => s.worstStatus < 2) || !props.isActive} onClick={() => {
        props.next()
      }}>Initiate RFOC certificate</Button>

    </div>

  )
}

type ReportsProps = {
  reports: string[]
}
const Reports = (props: ReportsProps) => {
  return (
    <div>
      {props.reports.map(s => <div><Icon name="library_pdf" color={tokens.colors.interactive.primary__resting.hex} />{s}</div>)}
    </div>
  )
}
