import { memo } from "react";
import { Checkbox, TableCell, TableRow } from "@mui/material";
import type { DataGridColumn, RowId } from "./types";

interface Props<T> {
  row: T;
  id: RowId;
  columns: DataGridColumn<T>[];
  selected: boolean;
  onToggle: (id: RowId) => void;
}

function DataGridRowInner<T>({ row, id, columns, selected, onToggle }: Props<T>) {
  return (
    <TableRow
      hover
      selected={selected}
      onClick={() => onToggle(id)}
      sx={{
        cursor: "pointer",
        backgroundColor: selected ? "rgba(79, 70, 229, 0.04)" : undefined,
        "&:hover": { backgroundColor: "rgba(79, 70, 229, 0.03)" },
      }}
    >
      <TableCell padding="checkbox">
        <Checkbox
          checked={selected}
          aria-label={selected ? "إلغاء تحديد الصف" : "تحديد الصف"}
          onClick={(e) => e.stopPropagation()}
          onChange={() => onToggle(id)}
        />
      </TableCell>

      {columns.map((col) => (
        <TableCell
          key={col.id}
          sx={{
            minWidth: col.minWidth,
            whiteSpace: "nowrap",
            borderBottom: "1px solid rgba(148, 163, 184, 0.12)",
          }}
        >
          {col.render ? col.render(row) : col.value(row)}
        </TableCell>
      ))}
    </TableRow>
  );
}

export const DataGridRow = memo(DataGridRowInner) as typeof DataGridRowInner;
