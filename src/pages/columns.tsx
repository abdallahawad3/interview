import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";

import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import type { DataGridColumn } from "../components/shared/Table";
import type { User } from "../types/users";

interface UserColumnActions {
  onView: (user: User) => void;
  onEdit: (user: User) => void;
  onDelete: (user: User) => void;
}

export const createUserColumns = ({
  onView,
  onEdit,
  onDelete,
}: UserColumnActions): DataGridColumn<User>[] => [
  {
    id: "id",
    header: "المعرّف",
    value: (u) => u.id,
  },
  {
    id: "name",
    header: "الاسم",
    value: (u) => u.name,
    filter: "text",
    searchable: true,
    minWidth: 160,
  },
  {
    id: "username",
    header: "اسم المستخدم",
    value: (u) => u.username,
    filter: "text",
    searchable: true,
  },
  {
    id: "email",
    header: "البريد الإلكتروني",
    value: (u) => u.email,
    filter: "text",
    searchable: true,
    minWidth: 200,
  },
  {
    id: "phone",
    header: "رقم الهاتف",
    value: (u) => u.phone,
    searchable: true,
    minWidth: 170,
  },
  {
    id: "website",
    header: "الموقع الإلكتروني",
    value: (u) => u.website,
    filter: "text",
    searchable: true,
  },
  {
    id: "company",
    header: "الشركة",
    value: (u) => u.company.name,
    filter: "select",
    minWidth: 160,
  },
  {
    id: "city",
    header: "المدينة",
    value: (u) => u.address.city,
    filter: "select",
  },
  {
    id: "actions",
    header: "الإجراءات",
    value: () => "",
    render: (user) => (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 4,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <Tooltip title="عرض">
          <IconButton size="small" color="info" onClick={() => onView(user)}>
            <VisibilityIcon fontSize="small" />
          </IconButton>
        </Tooltip>

        <Tooltip title="تعديل">
          <IconButton size="small" color="primary" onClick={() => onEdit(user)}>
            <EditIcon fontSize="small" />
          </IconButton>
        </Tooltip>

        <Tooltip title="حذف">
          <IconButton size="small" color="error" onClick={() => onDelete(user)}>
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </div>
    ),
    minWidth: 150,
  },
];

export const getUserId = (u: User) => u.id;
