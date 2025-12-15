import { readFileSync } from 'fs';

const { name } = JSON.parse(readFileSync('./package.json').toString('utf-8'));

export default () => ({
  manifest: {
    key: name,
    name: name,
  },
  environment: {
    uri: 'https://api-cc-applications-test.radix.equinor.com',
    defaultScopes: ['api://ed6de162-dd30-4757-95eb-0ffc8d34fbe0/access_as_user'],
  },
  endpoints: {},
});
