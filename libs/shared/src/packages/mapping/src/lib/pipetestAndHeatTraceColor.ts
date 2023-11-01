import { tokens } from '@equinor/eds-tokens';

export const pipetestAndHeatTraceColorMap: Record<string, string> = {
  'Pressure test': '#6D889A',
  'Chemical cleaning': '#A8C8DE',
  'Bolt tensioning': '#F7F7F7',
  Painting: tokens.colors.ui.background__medium.hex,
  'A-test': '#FFE7D6',
  Insulation: tokens.colors.infographic.primary__moss_green_55.hex,
  'Box insulation': tokens.colors.infographic.primary__moss_green_34.hex,
  'B-test': '#FFC67A',
  'C-test': '#DCAB6A',
  Marking: tokens.colors.interactive.table__cell__fill_activated.hex,
  'Ht Temporary': tokens.colors.interactive.table__cell__fill_activated.hex, //Possibly only temp. Now checklistStepSequence = 11 is checklistStep = "Ht Teporary"
  Complete: tokens.colors.interactive.success__resting.hex,
};
