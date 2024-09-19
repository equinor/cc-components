import { HandoverPackage } from "@cc-components/handovershared";

export type FilterGroupDef = {
  name: string;
  valueGetter: (s: HandoverPackage) => string | string[]
}

export const filterGroups: FilterGroupDef[] = [
  {
    name: "MC Disciplines",
    valueGetter: (s: HandoverPackage) => s.mcDisciplines?.split(",") ?? "(Blank)"
  }
]

export type FilterState = FilterStateGroup[]

export type FilterStateGroup = { values: string[], name: string, valueGetter: (s: HandoverPackage) => string | string[], allValues: string[] }

