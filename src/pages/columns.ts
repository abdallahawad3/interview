import type { DataGridColumn } from "../components/shared/Table";
import type { User } from "../types/users";

export const userColumns: DataGridColumn<User>[] = [
  { id: "id", header: "ID", value: (u) => u.id },
  {
    id: "name",
    header: "Name",
    value: (u) => u.name,
    filter: "text",
    searchable: true,
    minWidth: 160,
  },
  {
    id: "username",
    header: "Username",
    value: (u) => u.username,
    filter: "text",
    searchable: true,
  },
  {
    id: "email",
    header: "Email",
    value: (u) => u.email,
    filter: "text",
    searchable: true,
    minWidth: 200,
  },
  { id: "phone", header: "Phone", value: (u) => u.phone, searchable: true, minWidth: 170 },
  { id: "website", header: "Website", value: (u) => u.website, filter: "text", searchable: true },
  {
    id: "company",
    header: "Company",
    value: (u) => u.company.name,
    filter: "select",
    minWidth: 160,
  },
  { id: "city", header: "City", value: (u) => u.address.city, filter: "select" },
];

export const getUserId = (u: User) => u.id;
