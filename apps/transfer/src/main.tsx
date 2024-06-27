import { RootAppWrapper, createRender } from '@cc-components/shared';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React from 'react';
import { configure } from './framework-config';
import * as icons from '@equinor/eds-icons';
import { Icon } from '@equinor/eds-core-react';
import { useHttpClient } from '@equinor/fusion-framework-react-module-http';
import { Transfer } from './Transfer';
Icon.add(icons)

const queryclient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    }
  }
})

const TransferApp = () => {
  const ccApi = useHttpClient("cc-app")
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

