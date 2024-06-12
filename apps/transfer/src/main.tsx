import { createRender } from '@cc-components/shared';
import {
  ComponentRenderArgs,
  IAppConfigurator,
} from '@equinor/fusion-framework-react-app';
import { enableContext } from '@equinor/fusion-framework-react-module-context';
import buildQuery from 'odata-query';
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query'
import { useHttpClient } from '@equinor/fusion-framework-react/http';
import React from 'react';
import { Autocomplete, CircularProgress } from '@equinor/eds-core-react'

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
const CommPkg = () => {
  const client = useHttpClient("cc-api")
  const { isLoading, data, error } = useQuery<FamCommPkg[]>({
    queryKey: ["commpkgs"], queryFn: async () => {
      var res = await client.fetch("/v2/dynamic", {
        method: "POST",
        headers: { ["content-type"]: "application/json" },
        body: JSON.stringify({
          "query": "SELECT * FROM Completion.CommissioningPackage_v3",
          "pagination": null,
          "options": null
        })
      })
      var data = await res.json();
      return data.data as FamCommPkg[]
    }
  })
  if (isLoading) {
    return <CircularProgress />
  }
  if (!data) {
    return <div>uh-oh</div>
  }
  return (
    <div style={{ height: "100%", width: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ width: "500px" }}>
        <Autocomplete optionLabel={s => s.commissioningPackageNo} selectedOptions={[]} multiple={false} onSelect={(a) => { console.log(a) }} options={data} label={"Search commpkg for transfer"} />
      </div>
    </div>)
}

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

