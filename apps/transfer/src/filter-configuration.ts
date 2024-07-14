import { HandoverPackage } from "@cc-components/handovershared";

export type FilterGroupDef = {
  name: string;
  valueGetter: (s: HandoverPackage) => string | string[]
}

export const filterGroups: FilterGroupDef[] = [
  {
    name: "MC Status",
    valueGetter: (s: HandoverPackage) => s.mechanicalCompletionStatus
  },
  {
    name: "Comm Status",
    valueGetter: (s: HandoverPackage) => s.dynamicCommissioningStatus
  },
  {
    name: "MC Disciplines",
    valueGetter: (s: HandoverPackage) => s.mcDisciplines?.split(",") ?? "(Blank)"
  },
  {
    name: "Missing PunchOut",
    valueGetter: (s: HandoverPackage) => {

      switch (true) {
        case !s.remainingPunchOutCount || s.remainingPunchOutCount == 0:
          return "0"
        case s!.remainingPunchOutCount! <= 5:
          return "1-5"
        case s.remainingPunchOutCount! <= 10:
          return "5-10"
        default:
          return "11+"

      }
    }
  }
]

export type FilterState = FilterStateGroup[]

export type FilterStateGroup = { values: string[], name: string, valueGetter: (s: HandoverPackage) => string | string[], allValues: string[] }

