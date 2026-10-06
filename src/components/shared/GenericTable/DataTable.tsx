import {
  DataGrid,
  Toolbar,
  ToolbarButton,
  ColumnsPanelTrigger,
  FilterPanelTrigger,
  ExportCsv,
} from "@mui/x-data-grid";
import type { GridColDef, GridPaginationModel, GridValidRowModel } from "@mui/x-data-grid";
import { arSD } from "@mui/x-data-grid/locales";
import { Alert, Box, Button, InputBase, Paper, Tooltip, Typography } from "@mui/material";
import { alpha, darken, lighten, useTheme } from "@mui/material/styles";
import type { Theme } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/SearchRounded";
import CloseIcon from "@mui/icons-material/CloseRounded";
import ViewColumnIcon from "@mui/icons-material/ViewColumnRounded";
import FilterListIcon from "@mui/icons-material/FilterListRounded";
import DownloadIcon from "@mui/icons-material/FileDownloadOutlined";
import EmptyState from "./EmptyState";
import { type ReactNode } from "react";

type DataTableProps<T extends GridValidRowModel> = {
  rows: T[];
  columns: GridColDef<T>[];
  loading?: boolean;
  error?: string | null;
  onRetry?: () => void;
  title?: string;
  subtitle?: string;
  height?: number | string;
  paginationModel: GridPaginationModel;
  onPaginationModelChange: (model: GridPaginationModel) => void;
  search?: string;
  onSearch?: (value: string) => void;
};

declare module "@mui/x-data-grid" {
  interface ToolbarPropsOverrides {
    search: string;
    onSearch: (value: string) => void;
    filtersSlot?: ReactNode;
  }
}

function TableToolbar({
  search,
  onSearch,
}: {
  search: string;
  onSearch: (v: string) => void;
  filtersSlot?: ReactNode;
}) {
  const theme = useTheme();

  return (
    <Toolbar
      style={{
        display: "flex",
        alignItems: "center",
        gap: 8,
        padding: "12px 16px",
        borderBottom: `1px solid ${theme.palette.divider}`,
        background: theme.palette.background.paper,
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          flex: 1,
          maxWidth: 360,
          px: 1.5,
          height: 40,
          borderRadius: 999,
          bgcolor: theme.palette.action.hover,
          border: "1px solid transparent",
          transition: "border-color .15s, background-color .15s, box-shadow .15s",
          "&:focus-within": {
            bgcolor: "primary.light",
            borderColor: theme.palette.primary.main,
            boxShadow: `0 0 0 3px ${alpha(theme.palette.primary.main, 0.16)}`,
          },
        }}
      >
        <SearchIcon sx={{ color: "text.secondary", fontSize: 20 }} />
        <InputBase
          value={search}
          onChange={(e) => onSearch(e.target.value)}
          placeholder="ابحث في الجدول…"
          inputProps={{ "aria-label": "بحث في الجدول" }}
          sx={{ flex: 1, fontSize: 14 }}
        />
        {search && (
          <ToolbarButton aria-label="مسح البحث" onClick={() => onSearch("")} style={{ padding: 2 }}>
            <CloseIcon sx={{ fontSize: 18 }} />
          </ToolbarButton>
        )}
      </Box>

      <Box sx={{ flex: 1 }} />

      <Tooltip title="الأعمدة">
        <ColumnsPanelTrigger render={<ToolbarButton />}>
          <ViewColumnIcon fontSize="small" />
        </ColumnsPanelTrigger>
      </Tooltip>
      <Tooltip title="الفلاتر">
        <FilterPanelTrigger render={<ToolbarButton />}>
          <FilterListIcon fontSize="small" />
        </FilterPanelTrigger>
      </Tooltip>
      <Tooltip title="تصدير CSV">
        <ExportCsv render={<ToolbarButton />}>
          <DownloadIcon fontSize="small" />
        </ExportCsv>
      </Tooltip>
    </Toolbar>
  );
}

const gridSx = (theme: Theme) => {
  const primary = theme.palette.primary.main;

  const headerBg = theme.palette.mode === "light" ? lighten(primary, 0.92) : darken(primary, 0.7);

  return {
    flex: 1,
    minWidth: 0,
    minHeight: 0,

    border: 0,

    fontSize: 14,
    fontFamily: "inherit",
    color: theme.palette.text.primary,

    "--DataGrid-t-color-border-base": theme.palette.divider,

    direction: "rtl",

    "& .MuiDataGrid-virtualScroller": {
      direction: "rtl",
    },

    /* Header */
    "& .MuiDataGrid-columnHeaders": {
      "--DataGrid-t-header-background-base": headerBg,
    },

    "& .MuiDataGrid-columnHeader": {
      bgcolor: headerBg,

      "&:focus, &:focus-within": {
        outline: "none",
      },

      "&:focus-visible": {
        outline: `2px solid ${primary}`,
        outlineOffset: -2,
      },
    },

    "& .MuiDataGrid-columnHeaderTitle": {
      fontWeight: 600,
      color: theme.palette.text.secondary,
    },

    "& .MuiDataGrid-columnSeparator": {
      display: "none",
    },

    /* Rows */
    "& .MuiDataGrid-row": {
      position: "relative",
      transition: "background-color .12s",

      "&:hover": {
        bgcolor: alpha(primary, 0.05),
      },

      "&.Mui-selected, &.Mui-selected:hover": {
        bgcolor: alpha(primary, 0.1),
      },

      "&.Mui-selected::before": {
        content: '""',
        position: "absolute",
        insetInlineStart: 0,
        top: 10,
        bottom: 10,
        width: 3,
        borderRadius: 3,
        bgcolor: primary,
      },
    },

    "& .MuiDataGrid-cell": {
      display: "flex",
      alignItems: "center",

      "&:focus": {
        outline: "none",
      },

      "&:focus-visible": {
        outline: `2px solid ${primary}`,
        outlineOffset: -2,
      },
    },

    /* Footer */
    "& .MuiDataGrid-footerContainer": {
      borderTop: `1px solid ${theme.palette.divider}`,
      minHeight: 56,
    },

    "& .MuiTablePagination-root, & .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows":
      {
        color: theme.palette.text.secondary,
        fontSize: 13,
      },

    /* Loading */
    "& .MuiDataGrid-overlay": {
      bgcolor: alpha(theme.palette.background.paper, 0.7),
    },
  };
};

function DataTable<T extends GridValidRowModel>({
  rows,
  columns,
  loading,
  error,
  onRetry,
  title,
  subtitle,
  height = "calc(100dvh - 48px)",
  paginationModel,
  onPaginationModelChange,
  onSearch,
  search,
}: DataTableProps<T>) {
  if (error) {
    return (
      <Alert
        severity="error"
        dir="rtl"
        action={
          onRetry ? (
            <Button color="inherit" size="small" onClick={onRetry}>
              إعادة المحاولة
            </Button>
          ) : undefined
        }
        sx={{ borderRadius: 3 }}
      >
        {error}
      </Alert>
    );
  }

  return (
    <Paper
      dir="rtl"
      elevation={0}
      sx={{
        height,
        width: "100%",
        maxWidth: "100%",
        minWidth: 0,

        display: "flex",
        flexDirection: "column",
        overflow: "hidden",

        borderRadius: 4,
        border: 1,
        borderColor: "divider",
        bgcolor: "background.paper",
        boxShadow: "0 1px 2px rgba(16,24,40,.04), 0 12px 32px -16px rgba(16,24,40,.16)",
      }}
    >
      {(title || subtitle) && (
        <Box sx={{ px: 2.5, pt: 2.5, pb: 1.5 }}>
          {title && (
            <Typography component="h2" sx={{ fontSize: 20, fontWeight: 700 }}>
              {title}
            </Typography>
          )}
          {subtitle && (
            <Typography sx={{ fontSize: 14, color: "text.secondary", mt: 0.25 }}>
              {subtitle}
            </Typography>
          )}
        </Box>
      )}

      <DataGrid
        loading={loading}
        rows={rows}
        columns={columns}
        checkboxSelection
        disableRowSelectionOnClick
        disableColumnMenu
        disableColumnFilter
        slotProps={{ toolbar: { search, onSearch } }}
        rowHeight={56}
        columnHeaderHeight={48}
        onFilterModelChange={() => {
          onSearch && onSearch(search || "");
        }}
        paginationModel={paginationModel}
        onPaginationModelChange={onPaginationModelChange}
        pageSizeOptions={[5, 10, 25]}
        showToolbar
        slots={{ toolbar: TableToolbar, noRowsOverlay: EmptyState }}
        localeText={{
          ...arSD.components.MuiDataGrid.defaultProps.localeText,
          paginationRowsPerPage: "عدد الصفوف",
          toolbarColumns: "الأعمدة",
          toolbarFilters: "الفلاتر",
          toolbarDensity: "كثافة",
          toolbarExport: "تصدير",
          toolbarQuickFilterPlaceholder: "بحث...",
          filterPanelAddFilter: "إضافة فلتر",
          filterPanelDeleteIconLabel: "حذف",
          filterPanelRemoveAll: "حذف الكل",
        }}
        sx={gridSx}
      />
    </Paper>
  );
}

export default DataTable;
