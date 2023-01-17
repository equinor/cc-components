import styled from 'styled-components';
/**
 * Standard styled component to use for wrapping a Sidesheet component in.
 */
export const StyledSideSheetContainer = styled.div`
  height: 100%;
  width: 100%;
  display: grid;
  grid-template-rows: auto auto 1fr;
  overflow: hidden;
`;
