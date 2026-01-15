export type EmbedInfo = {
  type: number;
  embedConfig: {
    name: string | null;
    embedUrl: string;
    reportId: string;
  };
};

export type EmbedToken = {
  expirationUtc: string;
  token: string;
};

export interface PublishedBy {
  id: string;
  azureUniqueId: string;
  name: string;
  department: string;
  jobTitle: string;
  officeLocation: string;
  mail: string;
  mobilePhone: string;
  isAffiliateAccess: boolean;
  accountType: string;
}

export interface OwnedBy {
  id: string;
  azureUniqueId: string;
  name: string;
  department: string;
  jobTitle: string;
  officeLocation: string;
  mail: string;
  mobilePhone: string;
  isAffiliateAccess: boolean;
  accountType: string;
}

export interface SecurityRequirement {
  id: string;
  requirementType: number;
  value: string;
}

export interface ReportInfo {
  id: string;
  globalIdentifier: string;
  title: string;
  dateCreatedUtc: Date;
  dateModifiedUtc: Date;
  datePublishedUtc: Date;
  publishedBy: PublishedBy;
  ownedBy: OwnedBy;
  userTargetGroup: string;
  dataRefreshRate: string;
  dataSources: string;
  access: string;
  allowExternalUsers: boolean;
  allowOnlyEmployees: boolean;
  denyExtHire: boolean;
  isPublished: boolean;
  isEmbedOnly: boolean;
  securityRequirementCheck: number;
  securityRequirements: SecurityRequirement[];
  reportType: number;
  isEditable: boolean;
}

export type StaticInformation = {
  title: string;
  dataSource: string;
  dataRefreshRate: string;
  access: string;
  isAffiliate?: boolean;
};

export type DynamicInformation = {
  reportUri: string;
  isAffiliate?: boolean;
};

export type Information = StaticInformation | DynamicInformation;

export const isDynamicInformation = (info: Information): info is DynamicInformation => {
  return 'reportUri' in info;
};
