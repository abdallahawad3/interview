import { memo, useEffect, useState } from "react";
import { MenuItem, Stack, TextField } from "@mui/material";
import {
  SELECT_OPERATORS, // "equals" | "notEquals"
  TEXT_OPERATORS, // "contains" | "equals" | "notEquals" | "startsWith" | "endsWith"
  type DataGridColumn,
  type FilterOperator, // "contains" | "equals" | "notEquals" | "startsWith" | "endsWith"
  type FilterValue, // {operator: FilterOperator, value: string}
} from "./types";
import { useDebounce } from "../../../hooks/useDebounced";

interface Props<T> {
  column: DataGridColumn<T>;
  filter: FilterValue; // {operator: FilterOperator, value: string}
  options: string[];
  onChange: (columnId: string, value: FilterValue) => void;
}

function ColumnFilterFieldInner<T>({ column, filter, options, onChange }: Props<T>) {
  const isSelect = column.filter === "select";
  const operators = isSelect ? SELECT_OPERATORS : TEXT_OPERATORS;
  const [text, setText] = useState(filter.value);
  const debounced = useDebounce(text, 300);

  useEffect(() => {
    if (!isSelect && debounced !== filter.value) {
      onChange(column.id, { ...filter, value: debounced });
    }
  }, [debounced]);

  return (
    <Stack direction="row" spacing={1} sx={{ minWidth: 0, gap: 1, direction: "rtl" }}>
      <TextField
        select
        size="small"
        label={`${column.header} (${isSelect ? "تصفية حسب" : "بحث في"})`}
        value={filter.operator}
        onChange={(e) =>
          onChange(column.id, { ...filter, operator: e.target.value as FilterOperator })
        }
        sx={{ width: 130, flexShrink: 0 }}
      >
        {operators.map((op) => (
          <MenuItem key={op} value={op}>
            {op}
          </MenuItem>
        ))}
      </TextField>

      {isSelect ? (
        <TextField
          select
          size="small"
          fullWidth
          label={column.header}
          value={filter.value}
          onChange={(e) => onChange(column.id, { ...filter, value: e.target.value })}
        >
          <MenuItem value="">الكل</MenuItem>
          {options.map((o) => (
            <MenuItem key={o} value={o}>
              {o}
            </MenuItem>
          ))}
        </TextField>
      ) : (
        <TextField
          size="small"
          fullWidth
          label={column.header}
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      )}
    </Stack>
  );
}

export const ColumnFilterField = memo(ColumnFilterFieldInner) as typeof ColumnFilterFieldInner;
