export type McBase = {
  mcPkgNo: string;
  mcPkgId: string;
  description: string | null;
  mcStatus: string | null;
  rfccShippedActualDate: string | null;
  rfccAcceptedActualDate: string | null;
  rfocIsShipped: boolean | null;
  rfocIsAccepted: boolean | null;
  rfocIsRejected: boolean | null;
  rfccIsShipped: boolean | null;
  rfccIsAccepted: boolean | null;
  rfccIsRejected: boolean | null;
  url: string;
};
