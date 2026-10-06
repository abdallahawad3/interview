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
    <Box>
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
          padding: 2,
        }}
      >
        <Users />
      </Box>
    </Box>
  );
};
export default MainLayout;
