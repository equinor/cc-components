import { ColDef, ICellRendererProps } from "@equinor/workspace-fusion/dist/lib/integrations/grid";
import { Famtag } from "./types";
import { BaseStatus, StatusCell, statusColorMap } from "@cc-components/shared";

export const tagsDef: ColDef<Famtag>[] = [
  {
    headerName: "TagNo",
    valueGetter: (s) => s.data?.tagNo
  },
  {
    headerName: "MCCR status",
    valueGetter: (s) => s.data?.mccrStatus,
    cellRenderer: (props: ICellRendererProps) => {
      if (!props.value) return null;
      const statusColor = statusColorMap[(props.value as BaseStatus) ?? 'OS'];
      return (
        <StatusCell
          content={props.value}
          cellAttributeFn={() => ({
            style: { backgroundColor: statusColor },
          })}
        />
      );
    },
  }
]
