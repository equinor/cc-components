import { McPackage } from 'libs/mechanicalcompletionshared/dist/src';

export const getCommissioningStatus = (mcPackage: McPackage): string => {
  if (mcPackage.rfO_IsAccepted) {
    return 'RFOC Accepted';
  } else if (mcPackage.rfC_IsRejected) {
    return 'RFOC Rejected';
  } else if (mcPackage.rfC_IsShipped) {
    return 'RFOC Sent';
  } else if (mcPackage.taC_IsAccepted) {
    return 'TAC Accepted';
  } else if (mcPackage.taC_IsShipped) {
    return 'TAC Sent';
  } else if (mcPackage.rfC_IsAccepted) {
    return 'RFCC Accepted';
  } else if (mcPackage.rfC_IsRejected) {
    return 'RFCC Rejected';
  } else if (mcPackage.rfC_IsShipped) {
    return 'RFCC Sent';
  } else if (mcPackage.punchAcceptedActualtDate) {
    return 'Punch status accepted';
  } else if (mcPackage.finalPunchActualDate) {
    return 'Contractor final punch';
  }
  return 'OS';
};
