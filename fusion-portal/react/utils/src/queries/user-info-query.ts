import { IHttpClient } from '@equinor/fusion-framework-module-http';
import { PersonDetails } from '../types/person-details';

export async function getCurrentUserInfo(
  client: IHttpClient,
  azureUserId?: string
): Promise<PersonDetails> {
  const res = await client.fetch(
    `/persons/${azureUserId}?api-version=3.0&$expand=positions,contracts,roles`
  );
  if (!res.ok) throw res;
  return res.json();
}
