import { jsx as _jsx } from "react/jsx-runtime";
import styled from 'styled-components';
const StyledSvg = styled.svg `
  path {
    fill: ${({ color }) => color || 'currentColor'};
  }
`;
export const CloseIcon = ({ color }) => (_jsx(StyledSvg, { width: "24", height: "24", viewBox: "0 0 24 24", xmlns: "http://www.w3.org/2000/svg", color: color, children: _jsx("path", { xmlns: "http://www.w3.org/2000/svg", d: "M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" }) }));
