import { NodeAppearance, NodeOutlineColor } from '@cognite/reveal';
import { Color } from 'three';

export type ColorOption = 'Default' | 'Grayscale' | 'Ghost';

export const getAppearanceByOption = (option: ColorOption): NodeAppearance => {
  const appearances: Record<ColorOption, NodeAppearance> = {
    Default: {
      color: new Color(0, 0, 0),
      outlineColor: NodeOutlineColor.NoOutline,
      renderGhosted: false,
    },
    Grayscale: {
      color: new Color(128, 128, 128),
      outlineColor: NodeOutlineColor.NoOutline,
      renderGhosted: false,
    },
    Ghost: {
      renderGhosted: true,
    },
  };
  return appearances[option];
};
