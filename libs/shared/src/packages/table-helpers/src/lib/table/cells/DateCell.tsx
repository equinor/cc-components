type DateCellProps = {
  dateString: string | null | undefined;
};

/**
 * Standard component for displaying a date in a table cell.
 */
export const DateCell = ({ dateString }: DateCellProps): JSX.Element | null => {
  if (!dateString || typeof dateString !== 'string') return null;
  return (
    <div style={{ fontVariantNumeric: 'tabular-nums' }}>
      {new Date(dateString).toLocaleDateString('EN-GB')}
    </div>
  );
};
