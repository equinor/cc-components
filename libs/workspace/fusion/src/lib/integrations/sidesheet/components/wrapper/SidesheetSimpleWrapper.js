import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { ErrorBoundary } from 'react-error-boundary';
import { useWorkspace } from '../../../../hooks';
import { Suspense } from 'react';
import { CircularProgress } from '@equinor/eds-core-react';
import { SidesheetWrapper } from '../../../../../sidesheet/SidesheetWrapper';
import styled from 'styled-components';
export const SidesheetSimpleWrapper = ({ DetailsSidesheet, CreateSidesheet, }) => {
    const { selection, clearSelection, isCreateSidesheetOpen, closeCreateSidesheet } = useWorkspace();
    return (_jsx(ErrorBoundary, { FallbackComponent: UnhandledSidesheetException, onError: () => console.error('An error occurred in the sidesheet'), children: _jsx(Suspense, { fallback: _jsx(SidesheetFallback, {}), children: selection ? (_jsx(SidesheetWrapper, { children: _jsx(DetailsSidesheet, { id: selection.id, item: selection?.item, close: clearSelection }) })) : isCreateSidesheetOpen ? (_jsx(_Fragment, { children: CreateSidesheet && (_jsx(SidesheetWrapper, { children: _jsx(CreateSidesheet, { close: closeCreateSidesheet }) })) })) : (_jsx(_Fragment, {})) }) }));
};
const SidesheetFallback = () => (_jsx(StyledSidesheetFallback, { children: _jsx(CircularProgress, { size: 48 }) }));
const StyledSidesheetFallback = styled.div `
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;
const UnhandledSidesheetException = () => {
    return _jsx("div", { children: "An unhandled exception was caught in the sidesheet" });
};
