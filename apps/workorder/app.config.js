import { readFileSync } from 'fs';

const { name } = JSON.parse(readFileSync('./package.json').toString('utf-8'));

export default () => ({
  manifest: {
    key: name,
    name: name,
  },
  environment: {
    uri: 'https://backend-fusion-data-gateway-test.radix.equinor.com',
    defaultScopes: ['api://ed6de162-dd30-4757-95eb-0ffc8d34fbe0/access_as_user'],
    ai: 'InstrumentationKey=b6f0c853-1b41-4277-ac0a-982005b50a2d;IngestionEndpoint=https://norwayeast-0.in.applicationinsights.azure.com/;LiveEndpoint=https://norwayeast.livediagnostics.monitor.azure.com/',
  },
  endpoints: {},
});
