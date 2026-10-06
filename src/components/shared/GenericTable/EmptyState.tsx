import { alpha, Box, Typography } from "@mui/material";
import InboxIcon from "@mui/icons-material/InboxOutlined";

function EmptyState() {
  return (
    <Box
      sx={{
        height: "100%",
        px: 3,
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <Box
        sx={(theme) => ({
          display: "grid",
          placeItems: "center",
          width: 56,
          height: 56,
          borderRadius: "50%",
          bgcolor: alpha(theme.palette.primary.main, 0.1),
          color: "primary.main",
        })}
      >
        <InboxIcon />
      </Box>
      <Typography
        style={{
          textAlign: "center",
        }}
      >
        لا توجد نتائج
      </Typography>
      <Typography style={{ color: "text.secondary", textAlign: "center" }}>
        جرّب تغيير كلمات البحث أو إزالة الفلاتر.
      </Typography>
    </Box>
  );
}

export default EmptyState;
