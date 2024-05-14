export type Kpi = {
  /** Mhrs total */
  estMhrs: number;
  /** Mhrs not available */
  remMhrsNotAvailable: number;
  /** Mhrs available */
  remMhrsAvailable: number;
  /** Mhrs ready for execution */
  remMhrsWoOk: number;
  /** Mhrs expended */
  expMhrsCompleted: number;
  /** Mhrs remaining */
  remMhrs: number;
};
