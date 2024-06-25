import { StatusCircle, createRender } from '@cc-components/shared';
import { HandoverPackage } from '@cc-components/handovershared';
import { ApiGardenMeta } from '@cc-components/shared/workspace-config';
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query'
import React, { useRef } from 'react';
import { configure } from './framework-config';
import { check_circle_outlined, library_pdf } from '@equinor/eds-icons';
import { Icon, Typography } from '@equinor/eds-core-react';
import { useHttpClient } from '@equinor/fusion-framework-react-module-http';
import { GardenItem } from '@cc-components/handoverapp';
import { StyledSizes } from './garden.styles';

Icon.add({
  library_pdf,
  check_circle_outlined
})

function Transfer() {
  const ccApi = useHttpClient("cc-api");
  const vRef = useRef<HTMLDivElement | null>(null)
  const { data, isLoading } = useQuery<unknown, unknown, ApiGardenMeta>({
    queryKey: ["meta"], queryFn: async () => {
      const body = `{"groupingKeys":["RFOC"],"dateVariant":"Forecast","timeInterval":"Weekly","filter":{"groups":[],"search":""}}`
      const res = await ccApi.fetchAsync(`api/contexts/94dd5f4d-17f1-4312-bf75-ad75f4d9572c/handover/garden-meta`, {
        method: "POST",
        headers: { ["content-type"]: "application/json" },
        body: body,
      })

      return res.json();
    }
  })


  const { data: garden, isLoading: gardenLoading } = useQuery<unknown, unknown, { items: HandoverPackage[], columnName: string }>({
    queryKey: ["garden"],
    enabled: !!data,
    queryFn: async () => {
      const body = `{"columnStart":${data?.startIndex ?? 0},"columnEnd":${data?.startIndex ?? 0},"rowStart":0,"rowEnd":${data?.rowCount},"groupingKeys":["RFOC"],"dateVariant":"Forecast","timeInterval":"Weekly","filter":{"groups":[],"search":""}}`
      const res = await ccApi.fetchAsync(`api/contexts/94dd5f4d-17f1-4312-bf75-ad75f4d9572c/handover/garden`, {
        method: "POST",
        headers: { ["content-type"]: "application/json" },
        body: body
      })
      return (await res.json())[0];
    }
  })
  console.log(garden)
  if (isLoading || gardenLoading) {
    return <div>Be patient little one</div>
  }
  if (!garden) {
    throw new Error("uh-oh")
  }
  return (
    <div style={{ width: "100%", height: "99%", justifyContent: "center", alignItems: "center", display: "flex", boxSizing: "border-box", padding: "5px" }}>
      <div ref={vRef} style={{ flexDirection: "column", height: "100%", width: "300px", display: "flex" }}>
        {garden.items.map(s => <div style={{ height: "40px", boxSizing: "border-box", padding: "0px 7px", display: "flex", alignItems: "center", justifyContent: "center" }}> <GardenItem height={100} width={200} parentRef={vRef} depth={0} columnExpanded={false} isSelected={false} key={s.commissioningPackageNo} data={s} onClick={() => { console.log("clicked") }} /> </div>)}
      </div>
      <div style={{ height: "100%", width: "100%" }}>
        <Typography variant="h1_bold">Planned Packages for RFOC</Typography> <span>{"<"} Week {garden.columnName.slice(5)} {">"} </span>
        <div style={{ boxSizing: "border-box", padding: "20px", height: "100%", width: "100%", display: "flex", flexDirection: "column", gap: "20px" }}>
          {garden.items.map(s => <CommPkgCard key={s.commissioningPackageNo} commPkg={s} />)}
        </div>
      </div>
    </div>
  )
}
type StyledStatusPropertyProps = {
  title: string;
  value: string | React.ReactNode;
}
const StyledStatusProperty = ({ title, value }: StyledStatusPropertyProps) => {
  return <Typography style={{ display: "flex", alignItems: "center", gap: "5px" }}>{title}<Typography bold>{value}</Typography></Typography>
}

type CommPkgCardProps = {
  commPkg: HandoverPackage
}
const CommPkgCard = ({ commPkg }: CommPkgCardProps) => {
  return (
    <div style={{ height: "150px", padding: "10px", boxSizing: "border-box", width: "100%", display: "grid", gridTemplateRows: "1fr 1fr", background: "white", boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.1), 0 6px 20px 0 rgba(0, 0, 0, 0.1)" }}>
      <div style={{ display: "flex", justifyContent: "space-between", flexDirection: "row", gap: "5px", position: "relative" }}>
        <div>
          <StyledSizes size='large' color='grey' />
          <Typography bold style={{ marginLeft: "24px" }}>{commPkg.commissioningPackageNo}</Typography>
        </div>
        <div style={{ display: "flex", flexDirection: "row", gap: "10px" }}>
          <StyledStatusProperty title="WO progress:" value={"100%"} />
          <StyledStatusProperty title="RFC status:" value={"27/27"} />
          <StyledStatusProperty title="MC status:" value={<StatusCircle content='OS' statusColor='red' />} />
          <StyledStatusProperty title="Commissioning status:" value={<StatusCircle content='OK' statusColor='green' />} />
        </div>
      </div>

      <div style={{ display: "flex", gap: "5px", justifyContent: "space-between", alignItems: 'center', }}>
        <span style={{ display: "flex", gap: "20px" }}>
          <StyledStatusProperty title="Punch A:" value={<div style={{ display: "flex", gap: "5px", alignItems: "center" }}>2<Icon name="info_circle" color="red" /></div>} />
          <StyledStatusProperty title="Punch B:" value={<div style={{ display: "flex", gap: "5px", alignItems: "center" }}>2<Icon name="info_circle" color="orange" /></div>} />
        </span>
        <span style={{ display: "flex", gap: "5px" }}>
          <StyledStatusProperty title="Unsigned CPCL:" value="3" />
          <StyledStatusProperty title="Unsigned Tasks:" value="3" />
          <StyledStatusProperty title="Unsigned Actions:" value="3" />
        </span>
      </div>
    </div>
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

