import type { DataGridColumn, FiltersState, FilterValue } from "../components/shared/Table/types";

const norm = (v: string | number) => String(v).toLowerCase().trim();

export function matchesFilter(cell: string | number, { operator, value }: FilterValue): boolean {
  const c = norm(cell);
  const v = norm(value);
  switch (operator) {
    case "equals":
      return c === v;
    case "notEquals":
      return c !== v;
    case "startsWith":
      return c.startsWith(v);
    case "endsWith":
      return c.endsWith(v);
    default:
      return c.includes(v);
  }
}

export function applyGridFilters<T>(
  rows: T[],
  columns: DataGridColumn<T>[],
  search: string,
  filters: FiltersState,
): T[] {
  const q = norm(search);
  const searchCols = columns.filter((c) => c.searchable);
  const activeFilters = columns
    .map((col) => ({ col, f: filters[col.id] }))
    .filter(({ f }) => f && f.value !== "");

  if (!q && activeFilters.length === 0) return rows;

  return rows.filter((row) => {
    if (q && !searchCols.some((c) => norm(c.value(row)).includes(q))) return false;
    return activeFilters.every(({ col, f }) => matchesFilter(col.value(row), f));
  });
}
