import { useCallback, useEffect, useMemo, useState } from "react";
import { type User, type UserRow } from "../types/users";
import { transformUser } from "../utils/transformUser";
import DataTable from "../components/shared/GenericTable/DataTable";
import { getUsers } from "../api/user";

import { useDebounced } from "../hooks/useDebounced";
import { type GridColDef, type GridPaginationModel } from "@mui/x-data-grid";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box, IconButton, Tooltip } from "@mui/material";
export default function Users() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);
  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    page: 0,
    pageSize: 5,
  });
  const [search, setSearch] = useState<string>("");

  useEffect(() => {
    const controller = new AbortController();
    void getUsers(controller.signal)
      .then(setUsers)
      .catch(() => {
        if (!controller.signal.aborted) {
          setError("حدث خطأ أثناء تحميل المستخدمين");
        }
      })
      .finally(() => {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      });

    return () => controller.abort();
  }, [retryCount]);

  const debouncedSearch = useDebounced(search, 500);

  const rows = useMemo(() => {
    const value = debouncedSearch.trim().toLowerCase();
    const matchingUsers = value
      ? users.filter((user) =>
          [user.name, user.username, user.email, user.phone, user.website].some((field) =>
            field.toLowerCase().includes(value),
          ),
        )
      : users;

    return matchingUsers.map(transformUser);
  }, [debouncedSearch, users]);

  const handleView = useCallback((user: UserRow) => {
    console.log("View user:", user.id);
  }, []);

  const handleEdit = useCallback((user: UserRow) => {
    console.log("Edit user:", user.id);
  }, []);

  const handleDelete = useCallback((user: UserRow) => {
    console.log("Delete user:", user.id);
  }, []);

  const columns = useMemo<GridColDef<UserRow>[]>(() => {
    const companies = [...new Set(users.map((user) => user.company.name))];
    const cities = [...new Set(users.map((user) => user.address.city))];

    return [
      { field: "id", headerName: "ID", width: 100 },
      { field: "name", headerName: "الاسم", flex: 1, minWidth: 150 },
      { field: "username", headerName: "اسم المستخدم", flex: 1, minWidth: 160 },
      { field: "email", headerName: "البريد الإلكتروني", flex: 1, minWidth: 240 },
      { field: "phone", headerName: "الهاتف", flex: 1, minWidth: 170 },
      { field: "website", headerName: "الموقع", flex: 1, minWidth: 160 },
      {
        field: "company",
        headerName: "الشركة",
        type: "singleSelect",
        valueOptions: companies,
        flex: 1,
        minWidth: 180,
      },
      {
        field: "city",
        headerName: "المدينة",
        type: "singleSelect",
        valueOptions: cities,
        flex: 1,
        minWidth: 160,
      },
      {
        field: "actions",
        headerName: "الإجراءات",
        sortable: false,
        filterable: false,
        width: 150,
        align: "center",
        headerAlign: "center",

        renderCell: (params) => (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 0.5,
              width: "100%",
              height: "100%",
            }}
          >
            <IconButton
              sx={{
                color: "info.main",
                "&:hover": {
                  backgroundColor: "accent.light",
                  color: "primary.dark",
                },
              }}
              size="small"
              onClick={() => handleView(params.row)}
            >
              <VisibilityOutlinedIcon fontSize="small" />
            </IconButton>

            <Tooltip title="تعديل">
              <IconButton
                sx={{
                  color: "primary.dark",
                  "&:hover": {
                    backgroundColor: "primary.light",
                    color: "#fff",
                  },
                }}
                size="small"
                onClick={() => handleEdit(params.row)}
              >
                <EditOutlinedIcon fontSize="small" />
              </IconButton>
            </Tooltip>

            <Tooltip title="حذف">
              <IconButton
                sx={{
                  color: "secondary.dark",
                  "&:hover": {
                    backgroundColor: "secondary.dark",
                    color: "#fff",
                  },
                }}
                size="small"
                onClick={() => handleDelete(params.row)}
              >
                <DeleteIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </Box>
        ),
      },
    ];
  }, [users]);

  const handleSearchChange = useCallback((value: string) => {
    setSearch(value);
    setPaginationModel((current) => ({ ...current, page: 0 }));
  }, []);

  const handleRetry = useCallback(() => {
    setLoading(true);
    setError(null);
    setRetryCount((count) => count + 1);
  }, []);

  return (
    <DataTable
      rows={rows}
      columns={columns}
      loading={loading}
      error={error}
      onRetry={handleRetry}
      paginationModel={paginationModel}
      onPaginationModelChange={setPaginationModel}
      search={search}
      onSearch={handleSearchChange}
    />
  );
}
