import { memo } from 'react';
import { Skeleton, TableCell, TableRow } from '@mui/material';

interface Props {
  columns: number;
  rows?: number;
}

export const DataGridSkeleton = memo(function DataGridSkeleton({ columns, rows = 8 }: Props) {
  return (
    <>
      {Array.from({ length: rows }, (_, r) => (
        <TableRow key={r}>
          {Array.from({ length: columns + 1 }, (_, c) => (
            <TableCell key={c}>
              <Skeleton variant="text" />
            </TableCell>
          ))}
        </TableRow>
      ))}
    </>
  );
});
