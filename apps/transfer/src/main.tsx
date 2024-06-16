import { createRender } from '@cc-components/shared';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React, { useState } from 'react';
import { Famtag } from './types';
import { configure } from './framework-config';
import { check_circle_outlined, library_pdf } from '@equinor/eds-icons';
import { Signing } from './Signing';
import { MaintenanceHistory } from './MaintenanceHistory';
import { Scoping } from './Scoping';
import { Icon, Typography } from '@equinor/eds-core-react';

Icon.add({
  library_pdf,
  check_circle_outlined
})

function Transfer() {
  const [facility] = useState("JCA")
  const [state, setState] = useState<"SCOPING" | "SIGNING" | "MAINTENANCE HISTORY" | "ARCHIVED">("SCOPING");
  const [tags, setTags] = useState<Famtag[] | null>(null);

  return (
    <div style={{ width: "100%", height: "99%", justifyContent: "center", alignItems: "center", display: "flex" }}>
      <div style={{ height: "100%", width: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
        <Scoping isCompleted={state !== "SCOPING"} isActive={state == "SCOPING"} tags={tags} setTags={setTags} next={() => setState("SIGNING")} facility={facility} />
        <Signing isCompleted={state !== "SCOPING" && state !== "SIGNING"} isActive={state == "SIGNING"} next={() => setState("MAINTENANCE HISTORY")} facility={facility} />
        <MaintenanceHistory isCompleted={state == "ARCHIVED"} isActive={state == "MAINTENANCE HISTORY"} next={() => setState("ARCHIVED")} facility={facility} />
      </div>
    </div>
  )
}

export type StateProps = {
  next: () => void;
  isActive: boolean;
  isCompleted: boolean;
  facility: string;
}

type ArchivedProps = {
} & Omit<StateProps, "next">

function Archived(props: ArchivedProps) {

  return (
    <div style={{ height: "100%", border: "2px solid grey", display: "grid", alignContent: "center", justifyItems: "center" }}>
      <Typography variant='h1_bold'>Archived</Typography>
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

