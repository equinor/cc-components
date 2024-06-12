import { ClientGrid } from '@equinor/workspace-ag-grid';
import { createRender } from '@cc-components/shared';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React, { useState } from 'react';
import { Accordion, Autocomplete, Button, CircularProgress, Dialog, Typography } from '@equinor/eds-core-react'
import { tagQuery, commpkgQuery } from './famqueries';
import { FamCommPkg, Famtag } from './types';
import { AccordionSection } from './Accordion';
import { useFamQuery } from './useFamQuery';
import { configure } from './framework-config';
import { tagsDef } from './tagcolumns'

const mccr_status_map = {
  0: "OS",
  1: "PA",
  2: "PB",
  3: "OK"
}

function useCommissioningPackages(facility: string) {
  return useFamQuery<FamCommPkg[]>(["commpkgs"], commpkgQuery(facility))
}

const CommPkg = () => {
  const [facility] = useState("JCA")
  const [maintenanceConfirmed, setMaintenanceConfirmed] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  const handleOpen = () => {
    setIsOpen(true)
  }
  const handleClose = () => {
    setIsOpen(false)
  }
  const [commpkg, setcommpkg] = useState<FamCommPkg | null>(null)

  const { isLoading, data, error } = useCommissioningPackages(facility)
  const { isLoading: tagsLoading, data: tagsData, error: tagsError } = useFamQuery<Famtag[]>(["tags", commpkg?.commissioningPackageNo], tagQuery(commpkg?.commissioningPackageNo, facility), !!commpkg)
  const tags = tagsData?.map(s => ({ ...s, mccrStatus: mccr_status_map[s.worstStatus] })) as Famtag[]

  if (isLoading) {
    return <CircularProgress />
  }
  if (!data) {
    return <div>uh-oh</div>
  }
  return (
    <div style={{ height: "100%", width: "100%", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column" }}>
      <div style={{ width: "500px" }}>
        <Autocomplete onOptionsChange={(a) => {
          setcommpkg(a.selectedItems[0] ?? null)
        }} optionLabel={s => s.commissioningPackageNo} selectedOptions={[]} multiple={false} onSelect={(a) => { console.log(a) }} options={data} label={"Search commpkg for transfer"} />
      </div>
      <div style={{ width: "500px" }}>
        {tagsLoading ? <CircularProgress /> : !!tags ? <div><ClientGrid height={500} rowData={tags} colDefs={tagsDef} /></div> : <div></div>}
      </div>
      <Button disabled={!tags || tags?.some(s => s.worstStatus < 2)} onClick={() => {
        handleOpen()
      }}>Generate certificate</Button>
      <MaintenanceConfirmationDialog handleClose={handleClose} isOpen={isOpen} setMaintenanceConfirmed={setMaintenanceConfirmed} />
      {maintenanceConfirmed && (<div>✅ Success, certificate generated</div>)}
    </div>)
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
      <CommPkg />
    </QueryClientProvider>
  );
};


export const render = createRender(TransferApp, configure, 'Transfer');

export default render;

