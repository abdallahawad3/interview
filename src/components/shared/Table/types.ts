import type { ReactNode } from "react";

export type RowId = string | number;
export type FilterType = "text" | "select";
export type FilterOperator = "contains" | "equals" | "notEquals" | "startsWith" | "endsWith";

export interface DataGridColumn<T> {
  id: string;
  header: string;
  value: (row: T) => string | number;
  render?: (row: T) => ReactNode;
  filter?: FilterType;
  searchable?: boolean;
  minWidth?: number;
}

export interface FilterValue {
  operator: FilterOperator;
  value: string;
}

export type FiltersState = Record<string, FilterValue>;

export const TEXT_OPERATORS: FilterOperator[] = [
  "contains",
  "equals",
  "notEquals",
  "startsWith",
  "endsWith",
];
export const SELECT_OPERATORS: FilterOperator[] = ["equals", "notEquals"];
export const PAGE_SIZES = [10, 25, 50, 100];
