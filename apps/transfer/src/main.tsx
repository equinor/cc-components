import { ClientGrid } from '@equinor/workspace-ag-grid';
import { createRender } from '@cc-components/shared';
import { QueryClient, QueryClientProvider, useMutation } from '@tanstack/react-query'
import React, { ReactElement, useEffect, useState } from 'react';
import { Accordion, Autocomplete, Button, CircularProgress, Dialog, Icon, Typography } from '@equinor/eds-core-react'
import { tagQuery, commpkgQuery } from './famqueries';
import { FamCommPkg, Famtag } from './types';
import { AccordionSection } from './Accordion';
import { useFamQuery } from './useFamQuery';
import { configure } from './framework-config';
import { tagsDef } from './tagcolumns'
import { tokens } from '@equinor/eds-tokens';
import { check_circle_outlined, library_pdf } from '@equinor/eds-icons';
import { Signing } from './Signing';
import { MaintenanceHistory } from './MaintenanceHistory';

Icon.add({
  library_pdf,
  check_circle_outlined
})

const mccr_status_map = {
  0: "OS",
  1: "PA",
  2: "PB",
  3: "OK"
}

function useCommissioningPackages(facility: string) {
  return useFamQuery<FamCommPkg[]>(["commpkgs"], commpkgQuery(facility))
}


function Transfer() {
  const [facility] = useState("JCA")
  const [state, setState] = useState<"SCOPING" | "SIGNING" | "MAINTENANCE HISTORY" | "ARCHIVED">("SCOPING");
  const [tags, setTags] = useState<Famtag[] | null>(null);

  return (
    <div style={{ width: "100%", height: "100%", justifyContent: "center", alignItems: "center", display: "flex" }}>
      <div style={{ height: "700px", width: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
        <Scoping isActive={state == "SCOPING"} tags={tags} setTags={setTags} next={() => setState("SIGNING")} facility={facility} />
        <Signing isActive={state == "SIGNING"} next={() => setState("MAINTENANCE HISTORY")} facility={facility} />
        <MaintenanceHistory isActive={state == "MAINTENANCE HISTORY"} next={() => setState("ARCHIVED")} facility={facility} />
      </div>
    </div>
  )
}

export type StateProps = {
  next: () => void;
  isActive: boolean;
  facility: string;
}

type ScopingProps = {
  tags: Famtag[] | null;
  setTags: (tags: Famtag[]) => void;
} & StateProps



type ArchivedProps = {
} & Omit<StateProps, "next">

function Scoping(props: ScopingProps) {
  const [commpkg, setCommPkg] = useState<FamCommPkg | null>(null)

  const { isLoading: tagsLoading, data: tagsData, error: tagsError } = useFamQuery<Famtag[]>(["tags", commpkg?.commissioningPackageNo], tagQuery(commpkg?.commissioningPackageNo, props.facility), !!commpkg)
  const tags = tagsData?.map(s => ({ ...s, mccrStatus: mccr_status_map[s.worstStatus] })) as Famtag[]
  const [reports, setReports] = useState<string[]>([])


  const { isPending, isSuccess, mutateAsync } = useMutation({
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

function Archived(props: ArchivedProps) {

  return (
    <div style={{ height: "100%", border: "2px solid grey", display: "grid", alignContent: "center", justifyItems: "center" }}>
      <Typography variant='h1_bold'>Archived</Typography>
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
export type MaintenanceConfirmationDialogProps = {
  handleClose: VoidFunction;
  isOpen: boolean;
  setMaintenanceConfirmed: (val: boolean) => void;
}
export function MaintenanceConfirmationDialog({ handleClose, isOpen, setMaintenanceConfirmed }: MaintenanceConfirmationDialogProps) {
  return (
    <Dialog open={isOpen} isDismissable onClose={handleClose} style={{ width: "500px" }}>
      <Dialog.Header>
        <Dialog.Title>Confirm maintenance history handover</Dialog.Title>
      </Dialog.Header>
      <Dialog.CustomContent>
        <Typography variant="body_short">Please confirm that maintenance history has been handed over to operations</Typography>
        <br />
        <Typography>The following maintenance data should have been handed over</Typography>
        <Accordion>
          <AccordionSection header='ATEX inspection dates' description='ATEX inspection dates on a tag indicate the schedule for mandatory safety checks of equipment used in explosive atmospheres. These dates ensure compliance with the ATEX directive by verifying that the equipment maintains its integrity and protective features. Regular adherence to these dates is essential for the prevention of accidents in hazardous zones.' />
          <AccordionSection header='Insulation Resistance (IR) test results' description='Insulation Resistance (IR) test results on a tag provide a snapshot of the electrical insulations integrity between conductive parts. These values, measured in megohms, indicate the effectiveness of the insulation in preventing leakage currents and potential equipment failures. Regular IR testing is crucial for predictive maintenance and ensuring electrical safety standards are met.' />
          <AccordionSection header='Resistance Test results' description='Resistance Test results on a tag reflect the measured electrical resistance of components, such as grounding connections or continuity paths, ensuring they meet specified parameters. These results are critical for verifying that the electrical system can safely conduct current and maintain proper function. Regular testing helps to identify potential issues before they lead to equipment malfunction or safety hazards.' />
          <AccordionSection header='Pressure safety valve calibration' description='Pressure Safety Valve (PSV) calibration results on a tag confirm the valves set pressure and blowdown characteristics, ensuring it operates correctly to prevent overpressure conditions. These calibration records are vital for maintaining system safety and compliance with regulatory standards. Regular checks and recalibration are necessary to guarantee the valves reliability and protective performance.' />
          <AccordionSection header='SIF/SIL shutdown open/close times' description='SIF/SIL shutdown open/close times on a tag document the response times for Safety Instrumented Functions/Systems to reach a safe state, either by opening or closing. These timings are critical for validating that the system meets the Safety Integrity Level requirements, ensuring rapid protective actions during hazardous events. Regular verification of these times is essential for maintaining operational safety and system effectiveness.' />
        </Accordion>
        <br />
      </Dialog.CustomContent>
      <Dialog.Actions>
        <Button onClick={() => {
          setMaintenanceConfirmed(true)
          handleClose()
        }}>Yes</Button>
        <Button variant="ghost" onClick={handleClose}>Cancel</Button>
      </Dialog.Actions>
    </Dialog>

  )
}

const queryclient = new QueryClient()
const TransferApp = () => {
  return (
    <QueryClientProvider client={queryclient}>
      <Transfer />
    </QueryClientProvider>
  );
};


export const render = createRender(TransferApp, configure, 'Transfer');

export default render;

