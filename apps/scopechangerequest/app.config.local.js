import { readFileSync } from 'fs';

const { name } = JSON.parse(readFileSync('./package.json').toString('utf-8'));

export default () => ({
  manifest: {
    key: name,
    name: name,
  },
  environment: {
    uri: 'https://localhost:7074',
    defaultScopes: ['api://4e1ab5e5-9b1a-4366-9638-6fe5624ae550/access_as_user'],
  },
  endpoints: {},
});
