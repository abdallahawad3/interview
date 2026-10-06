import { Box, useMediaQuery, useTheme } from "@mui/material";
import { useState } from "react";
import Sidebar from "../components/shared/sidebar/Sidebar";
import Users from "../pages/Users";

const drawerWidth = 240;
const miniDrawerWidth = 72;

const MainLayout = () => {
  const [open, setOpen] = useState(true);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const isMini = isSmallScreen || !open;
  const currentDrawerWidth = isMini ? miniDrawerWidth : drawerWidth;

  const handleDrawer = () => {
    setOpen((prev) => !prev);
  };

  return (
    <Box sx={{ minHeight: "100vh", background: "linear-gradient(180deg, #eff4ff 0%, #f8fafc 100%)" }}>
      <Sidebar open={open} drawerWidth={drawerWidth} handleDrawer={handleDrawer} />

      <Box
        component="main"
        sx={{
          width: `calc(100% - ${currentDrawerWidth}px)`,
          marginRight: `${currentDrawerWidth}px`,
          minWidth: 0,
          transition: "margin-right 225ms ease, width 225ms ease",
          minHeight: "100vh",
          mt: "80px",
          px: { xs: 1.5, sm: 2.5, md: 3 },
          py: 3,
        }}
      >
        <Users />
      </Box>
    </Box>
  );
};

export default MainLayout;
