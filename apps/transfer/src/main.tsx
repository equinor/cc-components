import { Skeleton } from '@cc-components/sharedcomponents';
import { RootAppWrapper, StatusCircle, createRender, statusColorMap, useContextId } from '@cc-components/shared';
import { HandoverPackage } from '@cc-components/handovershared';
import { ApiGardenMeta } from '@cc-components/shared/workspace-config';
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query'
import React, { useRef } from 'react';
import { configure } from './framework-config';
import * as icons from '@equinor/eds-icons';
import { Icon, Typography } from '@equinor/eds-core-react';
import { useHttpClient } from '@equinor/fusion-framework-react-module-http';
import { GardenItem } from '@cc-components/handoverapp';
import { StyledSizes } from './garden.styles';
import { Punch, Workorder } from './types';

Icon.add(icons)

function Transfer() {
  const ccApi = useHttpClient("cc-api");
  const vRef = useRef<HTMLDivElement | null>(null)
  const contextId = useContextId();
  const { data, isLoading } = useQuery<unknown, unknown, ApiGardenMeta>({
    queryKey: ["meta"],
    refetchOnWindowFocus: false,
    queryFn: async () => {
      const body = `{"groupingKeys":["RFOC"],"dateVariant":"Forecast","timeInterval":"Weekly","filter":{"groups":[],"search":""}}`
      const res = await ccApi.fetchAsync(`api/contexts/${contextId}/handover/garden-meta`, {
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
    refetchOnWindowFocus: false,
    queryFn: async () => {
      const body = `{"columnStart":${data?.startIndex ?? 0},"columnEnd":${data?.startIndex ?? 0},"rowStart":0,"rowEnd":${data?.rowCount},"groupingKeys":["RFOC"],"dateVariant":"Forecast","timeInterval":"Weekly","filter":{"groups":[],"search":""}}`
      const res = await ccApi.fetchAsync(`api/contexts/${contextId}/handover/garden`, {
        method: "POST",
        headers: { ["content-type"]: "application/json" },
        body: body
      })
      return (await res.json())[0];
    }
  })

  if (isLoading || gardenLoading) {
    return <div>Loading...</div>
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
  const contextId = useContextId();
  const ccapi = useHttpClient("cc-api");
  const { data: punch, isLoading: isPunchLoading } = useQuery({
    queryKey: ["punch", commPkg.commissioningPackageNo],
    refetchOnWindowFocus: false,
    queryFn: async (): Promise<Punch[]> => {
      const res = await ccapi.fetchAsync(`https://backend-fusion-data-gateway-test.radix.equinor.com/api/contexts/${contextId}/handover/${commPkg.commissioningPackageUrlId}/punch`)
      return res.json();
    }
  })
  const { data: workorders, isLoading: isWorkordersLoading } = useQuery({
    queryKey: ["workorders", commPkg.commissioningPackageNo],
    refetchOnWindowFocus: false,
    queryFn: async (): Promise<Workorder[]> => {
      const res = await ccapi.fetchAsync(`https://backend-fusion-data-gateway-test.radix.equinor.com/api/contexts/${contextId}/handover/${commPkg.commissioningPackageUrlId}/work-orders`)
      return res.json();
    }
  })

  const { data: unsignedTasks, isLoading: isUnsignedTasksLoading } = useQuery({
    queryKey: ["unsignedTasks", commPkg.commissioningPackageNo],
    refetchOnWindowFocus: false,
    queryFn: async () => {
      const res = await ccapi.fetchAsync(`https://backend-fusion-data-gateway-test.radix.equinor.com/api/contexts/${contextId}/handover/${commPkg.commissioningPackageUrlId}/unsigned-tasks`)
      return (await res.json()).length
    }
  })

  const { data: unsignedActions, isLoading: isUnsignedActionsLoading } = useQuery({
    queryKey: ["unsignedActions", commPkg.commissioningPackageNo],
    refetchOnWindowFocus: false,
    enabled: !!commPkg.hasUnsignedActions,
    queryFn: async () => {
      const res = await ccapi.fetchAsync(`https://backend-fusion-data-gateway-test.radix.equinor.com/api/contexts/${contextId}/handover/${commPkg.commissioningPackageUrlId}/unsigned-actions`)
      return (await res.json()).length
    }
  })

  return (
    <div style={{ height: "150px", gap: "10px", padding: "10px", boxSizing: "border-box", width: "100%", display: "grid", gridTemplateRows: "1fr 1fr", background: "white", boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.1), 0 6px 20px 0 rgba(0, 0, 0, 0.1)" }}>
      <div style={{ display: "flex", justifyContent: "space-between", flexDirection: "row", gap: "5px", position: "relative" }}>
        <div>
          <StyledSizes size='large' color='grey' />
          <Typography bold style={{ marginLeft: "24px" }}>{commPkg.commissioningPackageNo}</Typography>
        </div>
        <div style={{ display: "flex", flexDirection: "row", gap: "10px" }}>
          {isWorkordersLoading ? <Skeleton height='24px' width='140px' /> : <StyledStatusProperty title="WO progress:" value={`${workorders?.reduce((acc, curr) => curr.projectProgress < acc ? curr.projectProgress : acc, 0)}%`} />}
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

