import { ColDef } from '@equinor/workspace-ag-grid';
import { format } from 'date-fns/format';

export const defaultColDef: ColDef = {
  valueFormatter: (a) => tryFormat(a.value),
  resizable : true
};

function tryFormat(value: unknown): string {
  switch (typeof value) {
    case 'string': {
      const maybeDate = new Date(value);
      if (Number.isNaN(maybeDate.valueOf())) {
        return value;
      }
      return formatDate(maybeDate);
    }

    case 'number': {
      return formatNumber(value);
    }

    case 'object': {
      if (value === null) {
        return formatNull();
      }

      if (value instanceof Date) {
        return formatDate(value);
      }
    }

    case 'undefined': {
      return formatUndefined();
    }

    case 'boolean': {
      return formatBoolean(value);
    }

    default: {
      return '-';
    }
  }
}

function formatNumber(val: number) {
  return val.toLocaleString('no');
}

function formatNull() {
  return '-';
}

function formatUndefined() {
  return '-';
}

function formatBoolean(val: boolean) {
  return val ? 'yes' : 'no';
}

function formatDate(date: Date) {
  return format(date, 'dd/MM/yy').toString();
}
