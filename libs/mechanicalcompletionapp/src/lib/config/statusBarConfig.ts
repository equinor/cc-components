import { numberFormat } from '@cc-components/shared';
import { StatusBarConfig } from '@equinor/workspace-fusion/status-bar';
import { McPackage } from '../types';
import { getStatusBarData } from '../utils-status-bar';
export const statusBarConfig: StatusBarConfig<McPackage> = (data) => {
  const kpis = getStatusBarData(data);

  return [
    {
      title: 'Total MCpkgs',
      value: numberFormat(kpis.mcPkgsCount),
    },
    {
      title: 'Final punch',
      value: numberFormat(kpis.finalPunchCount),
    },
    {
      title: 'Punch status Accepted',
      value: numberFormat(kpis.punchAcceptedCount),
    },
    {
      title: 'MC to Com',
      value: numberFormat(kpis.mcToComCount),
    },
    {
      title: 'RFCC',
      value: numberFormat(kpis.rfccCount),
    },
    {
      title: 'RFCC %',
      value: `${numberFormat(kpis.rfccPercentage)}%`,
    },
  ];
};
