export interface Person {
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

  
  export interface AssignedTo {
    type: number;
    person: Person;
  }