import { createRender } from '@cc-components/shared';
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query'
import React, { useState } from 'react';
import { Famtag } from './types';
import { configure } from './framework-config';
import { check_circle_outlined, library_pdf } from '@equinor/eds-icons';
import { Signing } from './Signing';
import { MaintenanceHistory } from './MaintenanceHistory';
import { Scoping } from './Scoping';
import { Icon, Typography } from '@equinor/eds-core-react';
import { useHttpClient } from '@equinor/fusion-framework-react-module-http';

Icon.add({
  library_pdf,
  check_circle_outlined
})

function Transfer() {
  const ccApi = useHttpClient("cc-api");
  const { data, isLoading } = useQuery({
    queryKey: ["meta"], queryFn: async () => {
      const res = await ccApi.fetchAsync(`api/contexts/94dd5f4d-17f1-4312-bf75-ad75f4d9572c/handover/garden-meta`)
      return res.json();
    }
  })
  console.log(data)
  return (
    <div style={{ width: "100%", height: "99%", justifyContent: "center", alignItems: "center", display: "flex" }}>
      <p>Its something</p>
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

