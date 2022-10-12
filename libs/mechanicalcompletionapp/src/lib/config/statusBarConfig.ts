import { numberFormat } from '@cc-components/shared';
import { McPackage } from '../types';
import { getStatusBarData } from '../utils-status-bar';
// TODO: Import StatusItem[] type from KPI package
export const statusBarConfig = (data: McPackage[]) => {
  const kpis = getStatusBarData(data);

  return [
    {
      title: 'Total MCpkgs',
      value: () => numberFormat(kpis.mcPkgsCount),
    },
    {
      title: 'Final punch',
      value: () => numberFormat(kpis.finalPunchCount),
    },
    {
      title: 'Punch status Accepted',
      value: () => numberFormat(kpis.punchAcceptedCount),
    },
    {
      title: 'MC to Com',
      value: () => numberFormat(kpis.mcToComCount),
    },
    {
      title: 'RFCC',
      value: () => numberFormat(kpis.rfccCount),
    },
    {
      title: 'RFCC %',
      value: () => `${numberFormat(kpis.rfccPercentage)}%`,
    },
  ];
};
