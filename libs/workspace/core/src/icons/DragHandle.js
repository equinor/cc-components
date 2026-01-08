import { jsx as _jsx } from "react/jsx-runtime";
import styled from 'styled-components';
const StyledSvg = styled.svg `
  path {
    fill: ${({ color }) => color || 'currentColor'};
  }
`;
export const DragHandleIcon = ({ color, style }) => (_jsx(StyledSvg, { width: "24", height: "24", viewBox: "0 0 24 24", xmlns: "http://www.w3.org/2000/svg", color: color, style: style, children: _jsx("path", { xmlns: "http://www.w3.org/2000/svg", "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M4 9h16v2H4zm16 6H4v-2h16z" }) }));
