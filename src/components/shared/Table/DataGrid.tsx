import { useCallback, useEffect, useMemo, useState, type ChangeEvent } from "react";
import {
  Alert,
  Badge,
  Box,
  Button,
  Checkbox,
  Collapse,
  Grid,
  IconButton,
  InputAdornment,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";
import { useUrlParams } from "../../../hooks/useUrlParams";
import { applyGridFilters } from "../../../utils/filtering";
import { ColumnFilterField } from "./ColumnFilterField";
import { DataGridRow } from "./DataGridRow";
import { DataGridSkeleton } from "./DataGridSkeleton";
import {
  PAGE_SIZES,
  type DataGridColumn,
  type FilterValue,
  type FiltersState,
  type RowId,
} from "./types";
import { useDebounce } from "../../../hooks/useDebounced";

interface DataGridProps<T> {
  title?: string;
  rows: T[] | null;
  columns: DataGridColumn<T>[];
  getRowId: (row: T) => RowId;
  loading?: boolean;
  error?: string | null;
  onRetry?: () => void;
}

const DEFAULT_FILTER: FilterValue = { operator: "contains", value: "" };

export function DataGrid<T>({
  title,
  rows,
  columns,
  getRowId,
  loading,
  error,
  onRetry,
}: DataGridProps<T>) {
  const [params, setParams] = useUrlParams();

  // ---- state kept in the URL ----
  const urlSearch = params.get("q") ?? "";
  const urlPageSize = Number(params.get("pageSize"));
  const pageSize = PAGE_SIZES.includes(urlPageSize) ? urlPageSize : PAGE_SIZES[0];
  const rawPage = Math.max(0, Number(params.get("page")) || 0);

  // ---- local state ----
  const [searchInput, setSearchInput] = useState(urlSearch);
  const debouncedSearch = useDebounce(searchInput, 300);
  const [filters, setFilters] = useState<FiltersState>({});
  const [filtersKey, setFiltersKey] = useState(0); // remounts filter inputs on "clear"
  const [showFilters, setShowFilters] = useState(false);
  const [selected, setSelected] = useState<Set<RowId>>(() => new Set());

  // sync debounced search -> URL (and reset page)
  useEffect(() => {
    if (debouncedSearch !== urlSearch) setParams({ q: debouncedSearch, page: null });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearch]);

  // ---- derived data ----
  const filterableColumns = useMemo(() => columns.filter((c) => c.filter), [columns]);

  const selectOptions = useMemo(() => {
    const map: Record<string, string[]> = {};
    if (!rows) return map;
    filterableColumns
      .filter((c) => c.filter === "select")
      .forEach((c) => {
        map[c.id] = Array.from(new Set(rows.map((r) => String(c.value(r))))).sort((a, b) =>
          a.localeCompare(b),
        );
      });
    return map;
  }, [rows, filterableColumns]);

  const filtered = useMemo(
    () => (rows ? applyGridFilters(rows, columns, urlSearch, filters) : []),
    [rows, columns, urlSearch, filters],
  );

  const maxPage = Math.max(0, Math.ceil(filtered.length / pageSize) - 1);
  const page = Math.min(rawPage, maxPage);

  const pageRows = useMemo(
    () => filtered.slice(page * pageSize, page * pageSize + pageSize),
    [filtered, page, pageSize],
  );
  const pageIds = useMemo(() => pageRows.map(getRowId), [pageRows, getRowId]);

  const selectedOnPage = pageIds.filter((id) => selected.has(id)).length;
  const allSelected = pageIds.length > 0 && selectedOnPage === pageIds.length;
  const someSelected = selectedOnPage > 0 && !allSelected;

  const activeFilterCount = useMemo(
    () => Object.values(filters).filter((f) => f.value !== "").length,
    [filters],
  );

  // ---- handlers (stable references) ----
  const handleFilterChange = useCallback(
    (columnId: string, value: FilterValue) => {
      setFilters((prev) => ({ ...prev, [columnId]: value }));
      setParams({ page: null });
    },
    [setParams],
  );

  const handleClearFilters = useCallback(() => {
    setFilters({});
    setFiltersKey((k) => k + 1);
    setParams({ page: null });
  }, [setParams]);

  const handleToggle = useCallback((id: RowId) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const handleToggleAll = useCallback(() => {
    setSelected((prev) => {
      const next = new Set(prev);
      const every = pageIds.every((id) => next.has(id));
      pageIds.forEach((id) => (every ? next.delete(id) : next.add(id)));
      return next;
    });
  }, [pageIds]);

  const handlePageChange = useCallback(
    (_: unknown, p: number) => setParams({ page: p === 0 ? null : String(p) }),
    [setParams],
  );

  const handlePageSizeChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => setParams({ pageSize: e.target.value, page: null }),
    [setParams],
  );

  const hasData = !!rows && rows.length > 0;
  let body;
  if (loading) {
    body = <DataGridSkeleton columns={columns.length} />;
  } else if (error) {
    body = (
      <TableRow>
        <TableCell colSpan={columns.length + 1}>
          <Alert severity="error" action={onRetry && <Button onClick={onRetry}>Retry</Button>}>
            {error}
          </Alert>
        </TableCell>
      </TableRow>
    );
  } else if (!hasData || filtered.length === 0) {
    body = (
      <TableRow>
        <TableCell colSpan={columns.length + 1} align="center" sx={{ py: 6 }}>
          <Typography color="text.secondary">
            {hasData ? "No results match your search or filters." : "No data available."}
          </Typography>
        </TableCell>
      </TableRow>
    );
  } else {
    body = pageRows.map((row, i) => (
      <DataGridRow
        key={pageIds[i]}
        row={row}
        id={pageIds[i]}
        columns={columns}
        selected={selected.has(pageIds[i])}
        onToggle={handleToggle}
      />
    ));
  }

  return (
    <Paper variant="outlined" sx={{ direction: "rtl" }}>
      <Toolbar
        sx={{
          gap: 1,
          flexWrap: "wrap",
          py: 1.5,
          mb: 1,
          border: "1px solid #e0e0e0",
        }}
      >
        {title && (
          <Typography variant="h6" sx={{ mr: "auto" }}>
            {title}
          </Typography>
        )}
        {selected.size > 0 && (
          <Typography variant="body2" color="primary">
            {selected.size} selected
          </Typography>
        )}
        <TextField
          size="small"
          placeholder="Search name, username, email, phone, website"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          sx={{ width: { xs: "100%", sm: 360 } }}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon fontSize="small" />
                </InputAdornment>
              ),
            },
          }}
        />
        <IconButton aria-label="Toggle filters" onClick={() => setShowFilters((s) => !s)}>
          <Badge badgeContent={activeFilterCount} color="primary">
            <FilterListIcon />
          </Badge>
        </IconButton>
      </Toolbar>

      <Collapse in={showFilters}>
        <Box sx={{ px: 2, pb: 2 }}>
          <Grid container spacing={2} key={filtersKey}>
            {filterableColumns.map((col) => (
              <Grid key={col.id} size={{ xs: 12, md: 6, lg: 4 }}>
                <ColumnFilterField
                  column={col}
                  filter={filters[col.id] ?? DEFAULT_FILTER}
                  options={selectOptions[col.id] ?? []}
                  onChange={handleFilterChange}
                />
              </Grid>
            ))}
          </Grid>
          <Button
            size="small"
            sx={{ mt: 1 }}
            disabled={activeFilterCount === 0}
            onClick={handleClearFilters}
          >
            Clear filters
          </Button>
        </Box>
      </Collapse>

      <TableContainer sx={{ maxHeight: "65vh" }}>
        <Table stickyHeader size="small">
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  checked={allSelected}
                  indeterminate={someSelected}
                  disabled={pageIds.length === 0}
                  onChange={handleToggleAll}
                />
              </TableCell>
              {columns.map((col) => (
                <TableCell key={col.id} sx={{ fontWeight: 600, whiteSpace: "nowrap" }}>
                  {col.header}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>{body}</TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        component="div"
        count={filtered.length}
        page={page}
        rowsPerPage={pageSize}
        rowsPerPageOptions={PAGE_SIZES}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handlePageSizeChange}
      />
    </Paper>
  );
}
