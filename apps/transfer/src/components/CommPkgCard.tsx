import { HandoverPackage } from "@cc-components/handovershared";
import { StatusCircle, statusColorMap, useContextId } from "@cc-components/shared";
import { Icon, Typography } from "@equinor/eds-core-react";
import { useQuery } from "@tanstack/react-query";
import { useHttpClient } from "@equinor/fusion-framework-react-module-http";
import React from "react";
import { Skeleton } from "@cc-components/sharedcomponents";
import { Punch, Workorder } from '../types'
import { StyledSizes } from '../garden.styles'

type StyledStatusPropertyProps = {
  title: string;
  value: string | React.ReactNode;
}
const StyledStatusProperty = ({ title, value }: StyledStatusPropertyProps) => {
  return <Typography style={{ display: "flex", alignItems: "center", gap: "5px" }}>{title}<Typography bold>{value}</Typography></Typography>
}

const getItemSize = (
  volume: number,
  maxVolume: number
): 'small' | 'medium' | 'large' => {
  if (maxVolume <= 0) return 'small';
  const percentage = (volume / maxVolume) * 100;
  return percentage > 66 ? 'large' : percentage > 33 ? 'medium' : 'small';
};

export type CommPkgCardProps = {
  commPkg: HandoverPackage
  isSelected: boolean;
}
export const CommPkgCard = ({ commPkg, isSelected }: CommPkgCardProps) => {
  const contextId = useContextId();
  const ccapi = useHttpClient("cc-app");
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
