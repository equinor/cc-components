import { PowerBiController, PowerBIFilter } from '@equinor/workspace-powerbi';
import { Report } from 'powerbi-client';
import { useEffect, useState } from 'react';

type FusionPowerBiFilterProps = {
  controller: PowerBiController;
  usePowerBiFilters?: boolean;
};
export function FusionPowerBiFilter({ controller, usePowerBiFilters }: FusionPowerBiFilterProps) {
  const [report, setReport] = useState<Report | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    const unsub = controller.onReportReady((embed) => {
      setReport(embed);
      setIsLoaded(true);
      embed.on('visualClicked', (ev: any) => {
        if ((ev.detail.visual.type as string).startsWith('Chiclet')) {
          setIsLoaded(false);
        }
      });

      embed.on('rendered', () => {
        setIsLoaded(true);
      });
    });
    return unsub;
  }, []);

  if (!report || !isLoaded) {
    return null;
  }

  return <PowerBIFilter report={report} defaultFilters={controller.filter} usePowerBiFilters={usePowerBiFilters} />;
}
