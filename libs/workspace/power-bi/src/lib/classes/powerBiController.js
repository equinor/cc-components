import { Observable } from './observable';
export class PowerBiController {
    activePage;
    setActivePage;
    onActivePageChanged;
    filter;
    cb = [];
    constructor(defaultFilter) {
        const page = new Observable();
        this.onActivePageChanged = page.onchange;
        this.setActivePage = page.setValue;
        page.onchange((val) => {
            this.activePage = val;
        });
        this.filter = defaultFilter;
    }
    onReportReady = (callback) => {
        const id = Math.random() * 16;
        this.cb.push({ callback, id });
        return () => {
            this.cb.filter((s) => s.id !== id);
        };
    };
    reportReady = (newValue) => {
        newValue.getActivePage().then(this.setActivePage);
        newValue.on('pageChanged', (page) => {
            this.setActivePage(page.detail.newPage);
        });
        this.cb.map(({ callback }) => callback).forEach((callback) => callback(newValue));
    };
}
