import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import type { User } from "../../../types/users";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },

  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

type IProps = {
  user: User | null;
  isOpen: boolean;
  onClose: () => void;
};

function InfoItem({ label, value }: { label: string; value: string | number }) {
  return (
    <Box>
      <Typography
        variant="caption"
        color="text.secondary"
        sx={{
          display: "block",
          mb: 0.5,
        }}
      >
        {label}
      </Typography>

      <Typography variant="body1" sx={{ fontWeight: 500 }}>
        {value}
      </Typography>
    </Box>
  );
}

export default function UserModel({ isOpen, onClose, user }: IProps) {
  if (!user) return null;

  return (
    <BootstrapDialog
      sx={{
        direction: "rtl",
      }}
      onClose={onClose}
      aria-labelledby="user-dialog-title"
      open={isOpen}
      fullWidth
      maxWidth="md"
    >
      <DialogTitle
        sx={{
          m: 0,
          p: 2,
          fontWeight: 700,
        }}
        id="user-dialog-title"
      >
        تفاصيل المستخدم
      </DialogTitle>

      <IconButton
        aria-label="إغلاق"
        onClick={onClose}
        sx={(theme) => ({
          position: "absolute",
          left: 8,
          top: 8,
          color: theme.palette.grey[500],
        })}
      >
        <CloseIcon />
      </IconButton>

      <DialogContent dividers>
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 700 }}>
          المعلومات الأساسية
        </Typography>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(2, 1fr)",
            },
            gap: 3,
          }}
        >
          <InfoItem label="المعرّف" value={user.id} />
          <InfoItem label="الاسم" value={user.name} />
          <InfoItem label="اسم المستخدم" value={user.username} />
          <InfoItem label="البريد الإلكتروني" value={user.email} />
          <InfoItem label="رقم الهاتف" value={user.phone} />
          <InfoItem label="الموقع الإلكتروني" value={user.website} />
        </Box>

        <Divider sx={{ my: 3 }} />

        <Typography variant="h6" sx={{ mb: 2, fontWeight: 700 }}>
          العنوان
        </Typography>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(2, 1fr)",
            },
            gap: 3,
          }}
        >
          <InfoItem label="الشارع" value={user.address.street} />
          <InfoItem label="الوحدة" value={user.address.suite} />
          <InfoItem label="المدينة" value={user.address.city} />
          <InfoItem label="الرمز البريدي" value={user.address.zipcode} />
          <InfoItem label="خط العرض" value={user.address.geo.lat} />
          <InfoItem label="خط الطول" value={user.address.geo.lng} />
        </Box>

        <Divider sx={{ my: 3 }} />

        <Typography variant="h6" sx={{ mb: 2, fontWeight: 700 }}>
          الشركة
        </Typography>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(2, 1fr)",
            },
            gap: 3,
          }}
        >
          <InfoItem label="اسم الشركة" value={user.company.name} />

          <InfoItem label="الشعار" value={user.company.catchPhrase} />

          <InfoItem label="مجال العمل" value={user.company.bs} />
        </Box>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>إغلاق</Button>
      </DialogActions>
    </BootstrapDialog>
  );
}
