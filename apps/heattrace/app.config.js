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
    modelViewerConfig: {
      hierarchyClientBaseUrl: 'https://app-echo-hierarchy-dev.azurewebsites.net',
      hierarchyClientScope: 'ebc04930-bf9c-43e5-98bc-bc90865600b8/user_impersonation',
      modelClientBaseUrl: 'https://app-echomodeldist-dev.azurewebsites.net',
      modelClientScope: 'd484c551-acf8-45bc-b1e8-3f4373bd0d42/user_impersonation',
      echoClientBaseUrl: 'https://dt-echopedia-api-dev.azurewebsites.net',
      echoClientScope: 'aef35d97-53d4-4fd0-adaf-c5a514b38436/user_impersonation',
    },
  },
  endpoints: {},
});
