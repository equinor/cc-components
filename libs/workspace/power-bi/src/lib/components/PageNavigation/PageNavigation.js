import { jsx as _jsx } from "react/jsx-runtime";
import { Tabs } from '@equinor/eds-core-react';
import { useState, useEffect } from 'react';
export function PageNavigation({ controller }) {
    const [activePage, setActivePage] = useState(controller.activePage);
    const [pages, setPages] = useState([]);
    const [report, setReport] = useState(null);
    useEffect(() => {
        const unsub = controller.onReportReady((report) => {
            setReport(report);
            if (pages) {
                report.getPages().then((pages) => setPages(pages.filter((s) => s.visibility !== 1)));
            }
        });
        return unsub;
    }, []);
    useEffect(() => {
        const unsub = controller.onActivePageChanged(setActivePage);
        return unsub;
    }, []);
    return (_jsx(Tabs, { children: pages.map(({ name, displayName, setActive }) => (_jsx(Tabs.Tab, { active: isActivePage(activePage, displayName), onClick: () => {
                report?.setPage(name);
            }, children: displayName }, name))) }));
}
/**
 * Checking displayName because of subpages
 * Ever PBI report has to have same displayName on its subpages for this to work
 */
function isActivePage(page, displayName) {
    return page?.displayName === displayName;
}
