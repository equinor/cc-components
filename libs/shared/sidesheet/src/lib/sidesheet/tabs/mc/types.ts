export type McBase = {
  mechanicalCompletionPackageId: string;
  mechanicalCompletionPackageUrlId: string;
  mechanicalCompletionPackageNo: string;
  mechanicalCompletionPackageStatus: string | null;
  description: string | null;
  rfoIsShipped: boolean | null;
  rfoIsAccepted: boolean | null;
  rfoIsRejected: boolean | null;
  rfcIsShipped: boolean | null;
  rfcIsAccepted: boolean | null;
  rfcIsRejected: boolean | null;
};
