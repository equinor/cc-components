type DateCellProps = {
  dateString: string | null | undefined;
};

/**
 * Standard component for displaying a date in a table cell.
 */
export const DateCell = ({ dateString }: DateCellProps): JSX.Element => {
  if (!dateString || typeof dateString !== 'string') return <div>No date</div>;
  return <div>{new Date(dateString).toLocaleDateString('EN-GB')}</div>;
};
