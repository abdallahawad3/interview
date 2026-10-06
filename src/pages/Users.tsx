import { useEffect, useMemo, useState } from "react";
import { type User, type UserRow } from "../types/users";
import { transformUser } from "../utils/transformUser";
import DataTable from "../components/shared/GenericTable/DataTable";
import { getUsers } from "../api/user";
import type { GridColDef, GridPaginationModel } from "@mui/x-data-grid";
import type { GridFilterModel } from "@mui/x-data-grid";

const userColumns: GridColDef[] = [
  {
    field: "name",
    headerName: "الاسم",
    flex: 1,
  },
  {
    field: "username",
    headerName: "اسم المستخدم",
    flex: 1,
  },
  {
    field: "email",
    headerName: "البريد الإلكتروني",
    flex: 1,
  },
  {
    field: "phone",
    headerName: "الهاتف",
    flex: 1,
  },
  {
    field: "website",
    headerName: "الموقع",
    flex: 1,
  },
  {
    field: "company",
    headerName: "الشركة",
    type: "singleSelect",
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
];

export default function Users() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    page: 0,
    pageSize: 3,
  });

  const rows = useMemo(() => users.map(transformUser), [users]);

  const handleFiltration = (data: GridFilterModel) => {
    // console.log(data);
  };

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

  return (
    <DataTable
      rows={rows}
      columns={userColumns}
      loading={loading}
      error={error}
      paginationModel={paginationModel}
      onPaginationModelChange={setPaginationModel}
    />
  );
}
