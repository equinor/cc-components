import { jsx as _jsx } from "react/jsx-runtime";
import { CircularProgress } from '@equinor/eds-core-react';
import { StyledLoadingWrapper } from './loading.styles';
export function Loading() {
    return (_jsx(StyledLoadingWrapper, { children: _jsx(CircularProgress, { size: 48 }) }));
}
