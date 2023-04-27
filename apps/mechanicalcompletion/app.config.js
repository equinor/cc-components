import { readFileSync } from 'fs';

const { name } = JSON.parse(readFileSync('./package.json').toString('utf-8'));

export default () => ({
  manifest: {
    key: name,
    name: name,
  },
  environment: {
    uri: 'https://fusion-s-dataproxy-CI.azurewebsites.net',
    defaultScopes: ['5a842df8-3238-415d-b168-9f16a6a6031b/.default'],
  },
  endpoints: {},
});
