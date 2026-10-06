import { Box } from "@mui/material";
import { useState } from "react";
import Sidebar from "../components/shared/sidebar/Sidebar";
import DataTable from "../components/shared/GenericTable/DataTable";

const drawerWidth = 240;

const MainLayout = () => {
  const [open, setOpen] = useState(true);

  const handleDrawer = () => {
    setOpen((prev) => !prev);
  };

  return (
    <Box>
      <Sidebar open={open} drawerWidth={drawerWidth} handleDrawer={handleDrawer} />

      <Box
        component="main"
        sx={{
          width: `calc(100% - ${open ? drawerWidth : 0}px)`,
          marginRight: open ? `${drawerWidth}px` : 0,
          transition: "margin-right 225ms ease, width 225ms ease",
          minHeight: "100vh",
          mt: "80px",
          padding: 2,
        }}
      >
        <DataTable />
      </Box>
    </Box>
  );
};

export default MainLayout;
