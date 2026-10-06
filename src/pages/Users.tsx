import { DataGrid } from "../components/shared/Table";
import { useFetch } from "../hooks/useFetch";
import type { User } from "../types/users";
import { getUserId, userColumns } from "./columns";

const USERS_URL = "https://jsonplaceholder.typicode.com/users";

export default function UsersPage() {
  const { data, loading, error, refetch } = useFetch<User[]>(USERS_URL);

  return (
    <DataGrid
      title="Users"
      rows={data}
      columns={userColumns}
      getRowId={getUserId}
      loading={loading}
      error={error}
      onRetry={refetch}
    />
  );
}
