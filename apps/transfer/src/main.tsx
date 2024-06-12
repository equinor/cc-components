import { ColDef, ClientGrid, GridOptions } from '@equinor/workspace-ag-grid';
import { BaseStatus, StatusCell, createRender, statusColorMap } from '@cc-components/shared';
import {
  ComponentRenderArgs,
  IAppConfigurator,
} from '@equinor/fusion-framework-react-app';
import { enableContext } from '@equinor/fusion-framework-react-module-context';
import buildQuery from 'odata-query';
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query'
import { useHttpClient } from '@equinor/fusion-framework-react/http';
import React, { useState } from 'react';
import { Accordion, Autocomplete, Button, CircularProgress, Dialog, Typography } from '@equinor/eds-core-react'
import { ICellRendererProps } from '@equinor/workspace-fusion/dist/lib/integrations/grid';

const mccr_status_map = {
  0: "OS",
  1: "PA",
  2: "PB",
  3: "OK"
}

export interface FamCommPkg {
  messageTimestamp: string
  famBehaviorTime: string
  sourceName: string
  sourceIdentity: string
  facility: string
  project: string
  location: string
  isVoided: boolean
  commissioningPackageNo: string
  description: string
  descriptionOfWork: string
  remark: string
  commissioningPhase: string
  progress: any
  demolition: boolean
  priority1: string
  priority2: string
  priority3: string
  identifier: string
  status: string
  dynamicCommissioningStatus: string
  responsible: string
  createdDate: string
  updatedDate: string
  urlId: string
}
export interface Famtag {
  tagNo: string
  worstStatus: 0 | 1 | 2 | 3
  mccrStatus: "OS" | "OK" | "PA" | "PB"
}
type RProps = {
  header: string;
  description: string;
}
const R = ({ header, description }: RProps) => (<Accordion.Item>
  <Accordion.Header>
    <Accordion.HeaderTitle>
      {header}
    </Accordion.HeaderTitle>
  </Accordion.Header>
  <Accordion.Panel>{description}</Accordion.Panel>
</Accordion.Item>
)
const CommPkg = () => {
  const [facility, setFacility] = useState("JCA")
  const [maintenanceConfirmed, setMaintenanceConfirmed] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const handleOpen = () => {
    setIsOpen(true)
  }
  const handleClose = () => {
    setIsOpen(false)
  }
  const [commpkg, setcommpkg] = useState<FamCommPkg | null>(null)
  const client = useHttpClient("cc-api")
  const { isLoading, data, error } = useQuery<FamCommPkg[]>({
    queryKey: ["commpkgs"], queryFn: async () => {
      var res = await client.fetch("/v2/dynamic", {
        method: "POST",
        headers: { ["content-type"]: "application/json" },
        body: JSON.stringify({
          "query": `SELECT * FROM Completion.CommissioningPackage_v3 where facility = '${facility}'`,
          "pagination": null,
          "options": null
        })
      })
      var data = await res.json();
      return data.data as FamCommPkg[]
    }
  })



  const { isLoading: tagsLoading, data: tags, error: tagsError } = useQuery<Famtag[]>({
    enabled: !!commpkg,
    queryKey: ["tags", commpkg?.commissioningPackageNo],
    queryFn: async () => {
      var res = await client.fetch("/v2/dynamic", {
        method: "POST",
        headers: { ["content-type"]: "application/json" },
        body: JSON.stringify({
          "query": `SELECT tag.tagNo,min(c.tagStatus) as worstStatus
FROM Completion.CompletionTag_v3 as tag
JOIN (
  SELECT
    sourceIdentity,
    tagId,
    CASE
      WHEN status='OS' THEN 0
      WHEN status='PA' THEN 1
      WHEN status='PB' THEN 2
      ELSE 3
    END as tagStatus
  FROM Completion.CompletionChecklist_v2
) as c ON c.tagId = tag.sourceIdentity
WHERE tag.commIssioningPackageNo = '${commpkg?.commissioningPackageNo}' and tag.facility = '${facility}'
GROUP BY tag.tagNo
`,
          "pagination": null,
          "options": null
        })
      })
      var data = await res.json();
      var tags = data.data as Famtag[]
      return tags.map(s => ({ ...s, mccrStatus: mccr_status_map[s.worstStatus] })) as Famtag[]
    }
  })



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
      {maintenanceConfirmed && (<div>✅ Success, certificate generated</div>)}
      <Dialog open={isOpen} isDismissable onClose={handleClose} style={{ width: "500px" }}>
        <Dialog.Header>
          <Dialog.Title>Confirm maintenance history handover</Dialog.Title>
        </Dialog.Header>
        <Dialog.CustomContent>
          <Typography variant="body_short">Please confirm that maintenance history has been handed over to operations</Typography>
          <br />
          <Typography>The following maintenance data should have been handed over</Typography>
          <Accordion>
            <R header='ATEX inspection dates' description='ATEX inspection dates on a tag indicate the schedule for mandatory safety checks of equipment used in explosive atmospheres. These dates ensure compliance with the ATEX directive by verifying that the equipment maintains its integrity and protective features. Regular adherence to these dates is essential for the prevention of accidents in hazardous zones.' />
            <R header='Insulation Resistance (IR) test results' description='Insulation Resistance (IR) test results on a tag provide a snapshot of the electrical insulations integrity between conductive parts. These values, measured in megohms, indicate the effectiveness of the insulation in preventing leakage currents and potential equipment failures. Regular IR testing is crucial for predictive maintenance and ensuring electrical safety standards are met.' />
            <R header='Resistance Test results' description='Resistance Test results on a tag reflect the measured electrical resistance of components, such as grounding connections or continuity paths, ensuring they meet specified parameters. These results are critical for verifying that the electrical system can safely conduct current and maintain proper function. Regular testing helps to identify potential issues before they lead to equipment malfunction or safety hazards.' />
            <R header='Pressure safety valve calibration' description='Pressure Safety Valve (PSV) calibration results on a tag confirm the valves set pressure and blowdown characteristics, ensuring it operates correctly to prevent overpressure conditions. These calibration records are vital for maintaining system safety and compliance with regulatory standards. Regular checks and recalibration are necessary to guarantee the valves reliability and protective performance.' />
            <R header='SIF/SIL shutdown open/close times' description='SIF/SIL shutdown open/close times on a tag document the response times for Safety Instrumented Functions/Systems to reach a safe state, either by opening or closing. These timings are critical for validating that the system meets the Safety Integrity Level requirements, ensuring rapid protective actions during hazardous events. Regular verification of these times is essential for maintaining operational safety and system effectiveness.' />
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
    </div>)
}

const tagsDef: ColDef<Famtag>[] = [
  {
    headerName: "TagNo",
    valueGetter: (s) => s.data?.tagNo
  },
  {
    headerName: "MCCR status",
    valueGetter: (s) => s.data?.mccrStatus,
    cellRenderer: (props: ICellRendererProps) => {
      if (!props.value) return null;
      const statusColor = statusColorMap[(props.value as BaseStatus) ?? 'OS'];
      return (
        <StatusCell
          content={props.value}
          cellAttributeFn={() => ({
            style: { backgroundColor: statusColor },
          })}
        />
      );
    },
  }
]
const queryclient = new QueryClient()
const TransferApp = () => {
  return (
    <QueryClientProvider client={queryclient}>
      <CommPkg />
    </QueryClientProvider>
  );
};

const configure = async (config: IAppConfigurator, c: ComponentRenderArgs) => {
  enableContext(config, async (builder) => {
    builder.setContextType(['ProjectMaster', 'Facility']);
    builder.setContextParameterFn(({ search, type }) => {
      return buildQuery({
        search,
        filter: {
          type: {
            in: type,
          },
        },
      });
    });
  });

  config.configureHttpClient('cc-api', {
    baseUri: "https://famapi.equinor.com",
    defaultScopes: ["api://958bef40-48c3-496e-bc0b-0fe5783f196b/access_as_user"],
  });

};

export const render = createRender(TransferApp, configure, 'Transfer');

export default render;

