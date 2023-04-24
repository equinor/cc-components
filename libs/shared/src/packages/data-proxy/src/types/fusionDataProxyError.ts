export interface FusionDataProxyError {
  error: Error;
}

interface Error {
  code: string;
  message: string;
  accessRequirements: AccessRequirement[];
}

interface AccessRequirement {
  code: string;
  description: string;
}
