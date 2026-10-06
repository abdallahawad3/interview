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
      <Typography variant="caption" color="text.secondary" sx={{ display: "block", mb: 0.5 }}>
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
        direction: "ltr",
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
        User Details
      </DialogTitle>

      <IconButton
        aria-label="close"
        onClick={onClose}
        sx={(theme) => ({
          position: "absolute",
          right: 8,
          top: 8,
          color: theme.palette.grey[500],
        })}
      >
        <CloseIcon />
      </IconButton>

      <DialogContent dividers>
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 700 }}>
          Basic Information
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
          <InfoItem label="ID" value={user.id} />
          <InfoItem label="Name" value={user.name} />
          <InfoItem label="Username" value={user.username} />
          <InfoItem label="Email" value={user.email} />
          <InfoItem label="Phone" value={user.phone} />
          <InfoItem label="Website" value={user.website} />
        </Box>

        <Divider sx={{ my: 3 }} />

        {/* Address */}
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 700 }}>
          Address
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
          <InfoItem label="Street" value={user.address.street} />
          <InfoItem label="Suite" value={user.address.suite} />
          <InfoItem label="City" value={user.address.city} />
          <InfoItem label="Zipcode" value={user.address.zipcode} />
          <InfoItem label="Latitude" value={user.address.geo.lat} />
          <InfoItem label="Longitude" value={user.address.geo.lng} />
        </Box>

        <Divider sx={{ my: 3 }} />

        {/* Company */}
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 700 }}>
          Company
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
          <InfoItem label="Company Name" value={user.company.name} />

          <InfoItem label="Catch Phrase" value={user.company.catchPhrase} />

          <InfoItem label="Business" value={user.company.bs} />
        </Box>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </BootstrapDialog>
  );
}
