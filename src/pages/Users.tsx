import { useEffect, useMemo, useState } from "react";
import { type User } from "../types/users";
import { transformUser } from "../utils/transformUser";
import DataTable from "../components/shared/GenericTable/DataTable";
import { getUsers } from "../api/user";

import { useDebounced } from "../hooks/useDebounced";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { GridActionsCellItem, type GridColDef, type GridPaginationModel } from "@mui/x-data-grid";

const userColumns: GridColDef[] = [
  {
    field: "name",
    headerName: "الاسم",
    flex: 1,
    minWidth: 150,
  },
  {
    field: "username",
    headerName: "اسم المستخدم",
    flex: 1,
    minWidth: 160,
  },
  {
    field: "email",
    headerName: "البريد الإلكتروني",
    flex: 1,
    minWidth: 240,
  },
  {
    field: "phone",
    headerName: "الهاتف",
    flex: 1,
    minWidth: 170,
  },
  {
    field: "website",
    headerName: "الموقع",
    flex: 1,
    minWidth: 160,
  },
  {
    field: "company",
    headerName: "الشركة",
    type: "singleSelect",
    width: 180,
    valueOptions: [
      "Romaguera-Crona",
      "Deckow-Crist",
      "Romaguera-Jacobson",
      "Robel-Corkery",
      "Keebler LLC",
      "Considine-Lockman",
      "Johns Group",
      "Abernathy Group",
      "Yost and Sons",
      "Hoeger LLC",
    ],
  },
  {
    field: "city",
    headerName: "المدينة",
    flex: 1,
    minWidth: 160,
    type: "singleSelect",
    valueOptions: [
      "Gwenborough",
      "Wisokyburgh",
      "McKenziehaven",
      "South Elvis",
      "Roscoeview",
      "South Christy",
      "Howemouth",
      "Aliyaview",
      "Bartholomebury",
      "Lebsackbury",
    ],
  },

  // Actions
  {
    field: "actions",
    type: "actions",
    headerName: "الإجراءات",
    width: 110,
    getActions: (params) => [
      <GridActionsCellItem
        key="edit"
        icon={
          <EditIcon
            sx={{
              color: "primary.main",
              borderRadius: "4px",
              width: "20px",
              fontSize: "20px",
              height: "20px",
            }}
          />
        }
        label="تعديل"
        onClick={() => {
          console.log("Edit:", params.row);
        }}
      />,

      <GridActionsCellItem
        key="delete"
        icon={
          <DeleteIcon
            sx={{
              color: "error.main",
              borderRadius: "4px",
              width: "20px",
              height: "20px",
              fontSize: "20px",
            }}
          />
        }
        label="حذف"
        onClick={() => {
          console.log("Delete:", params.row);
        }}
      />,
    ],
  },
];

export default function Users() {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    page: 0,
    pageSize: 5,
  });
  const [search, setSearch] = useState<string>("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getUsers();
        setUsers(data);
      } catch {
        setError("حدث خطأ أثناء تحميل المستخدمين");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const debouncedSearch = useDebounced(search, 500);

  useEffect(() => {
    const value = debouncedSearch.trim().toLowerCase();

    if (!value) {
      setFilteredUsers(users);
      return;
    }

    const result = users.filter(
      (user) =>
        user.name.toLowerCase().includes(value) ||
        user.username.toLowerCase().includes(value) ||
        user.email.toLowerCase().includes(value) ||
        user.phone.toLowerCase().includes(value) ||
        user.website.toLowerCase().includes(value) ||
        user.company.name.toLowerCase().includes(value) ||
        user.address.city.toLowerCase().includes(value),
    );

    setFilteredUsers(result);
  }, [debouncedSearch, users]);

  const handleSearchChange = (value: string) => {
    setSearch(value);
  };

  const rows = useMemo(() => filteredUsers.map(transformUser), [filteredUsers]);

  return (
    <DataTable
      rows={rows}
      columns={userColumns}
      loading={loading}
      error={error}
      paginationModel={paginationModel}
      onPaginationModelChange={setPaginationModel}
      search={search}
      onSearch={handleSearchChange}
    />
  );
}
