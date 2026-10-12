import { useState } from "react";
import UserModel from "../components/shared/models/UserModel";
import { DataGrid } from "../components/shared/Table";
import { useFetch } from "../hooks/useFetch";
import type { User } from "../types/users";
import { createUserColumns, getUserId } from "./columns.tsx";
const USERS_URL = "https://jsonplaceholder.typicode.com/users";

export default function UsersPage() {
  const { data, loading, error, refetch } = useFetch<User[]>(USERS_URL);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isUserModelOpen, setIsUserModelOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isDeleteMode, setIsDeleteMode] = useState(false);
  const handleUserAction = (user: User, action: "view" | "edit" | "delete") => {
    setSelectedUser(user);
    if (action === "view") {
      setIsUserModelOpen(true);
    } else if (action === "edit") {
      setIsEditMode(true);
      console.log(isEditMode);
    } else if (action === "delete") {
      setIsDeleteMode(true);
      console.log(isDeleteMode);
    }
  };

  const userColumns = createUserColumns({
    onView: (user) => handleUserAction(user, "view"),
    onEdit: (user) => handleUserAction(user, "edit"),
    onDelete: (user) => handleUserAction(user, "delete"),
  });

  return (
    <>
      <DataGrid
        title="Users"
        rows={data}
        columns={userColumns}
        getRowId={getUserId}
        loading={loading}
        error={error}
        onRetry={refetch}
      />

      <UserModel
        isOpen={isUserModelOpen}
        onClose={() => {
          setSelectedUser(null);
          setIsUserModelOpen(false);
        }}
        user={selectedUser}
      />
    </>
  );
}
