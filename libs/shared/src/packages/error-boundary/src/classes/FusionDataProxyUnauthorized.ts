import { FusionDataProxyError } from '../components/errors/FDataProxyUnauthorized';

export class FusionDataProxyUnauthorized extends Error {
  error: FusionDataProxyError;
  constructor(error: FusionDataProxyError) {
    super();
    this.error = error;
  }
}
