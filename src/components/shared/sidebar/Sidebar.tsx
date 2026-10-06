import { memo } from "react";
interface SidebarProps {
  open: boolean;
  drawerWidth: number;
  handleDrawer: () => void;
}

import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { Typography } from "@mui/material";
import { DrawerHeader } from "./SidebarHeader";
import MainHeader from "../MainHeader/MainHeader";

function Sidebar({ drawerWidth, handleDrawer, open }: SidebarProps) {
  return (
    <Box>
      <CssBaseline />
      <MainHeader drawerWidth={drawerWidth} open={open} handleDrawerOpen={handleDrawer} />
      <Drawer
        sx={{
          width: `${open && drawerWidth}`,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="right"
        open={open}
      >
        <DrawerHeader>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Typography sx={{ fontSize: "18px", fontWeight: "700" }}>Logo</Typography>
            <Box component={"img"} src="./favicon.svg" width={40} />
          </Box>
        </DrawerHeader>
        <Divider />
        <List>
          {["المستحدمين", "المنتجات"].map((text, index) => (
            <ListItem
              sx={{
                direction: "rtl",
                borderRadius: "8px",
                transition: "background .2s",
                "&:hover": {
                  backgroundColor: "accent.light",
                  cursor: "pointer",
                },
              }}
              key={text}
              disablePadding
            >
              <ListItemButton>
                <ListItemIcon sx={{}}>
                  {index % 2 === 0 ? (
                    <InboxIcon sx={{ color: "primary.main" }} />
                  ) : (
                    <MailIcon sx={{ color: "primary.main" }} />
                  )}
                </ListItemIcon>
                <ListItemText
                  sx={{
                    direction: "rtl",
                    textAlign: "start",
                  }}
                  slotProps={{
                    primary: {
                      sx: {
                        fontSize: "18px",
                        fontWeight: 700,
                        color: "primary.main",
                      },
                    },
                  }}
                  primary={text}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </Box>
  );
}

export default memo(Sidebar);
