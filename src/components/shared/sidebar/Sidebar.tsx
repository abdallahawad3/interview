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
import { Typography, useMediaQuery, useTheme } from "@mui/material";
import { DrawerHeader } from "./SidebarHeader";
import MainHeader from "../MainHeader/MainHeader";
import PeopleIcon from "@mui/icons-material/People";
function Sidebar({ drawerWidth, handleDrawer, open }: SidebarProps) {
  const theme = useTheme();

  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  // Mobile أو Sidebar مقفول → mini width
  const isMini = isSmallScreen || !open;

  const sidebarWidth = isMini ? 72 : drawerWidth;

  return (
    <Box>
      <CssBaseline />

      <MainHeader drawerWidth={sidebarWidth} open={open} handleDrawerOpen={handleDrawer} />

      <Drawer
        variant="permanent"
        sx={{
          width: sidebarWidth,
          flexShrink: 0,

          "& .MuiDrawer-paper": {
            width: sidebarWidth,
            boxSizing: "border-box",

            transition: theme.transitions.create("width", {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.standard,
            }),
          },
        }}
        anchor="right"
      >
        <DrawerHeader>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",

              justifyContent: isMini ? "center" : "flex-start",

              gap: 1,
              width: "100%",
            }}
          >
            {/* Logo Text */}
            {!isMini && (
              <Typography
                sx={{
                  fontSize: "18px",
                  fontWeight: 700,
                }}
              >
                Logo
              </Typography>
            )}

            {/* Logo Icon */}
            <Box component="img" src="./favicon.svg" width={40} />
          </Box>
        </DrawerHeader>

        <Divider />

        <List>
          {["المستخدمين"].map((text) => (
            <ListItem
              key={text}
              disablePadding
              sx={{
                direction: "rtl",
                borderRadius: "8px",

                transition: "background .2s",

                "&:hover": {
                  backgroundColor: "accent.light",
                  cursor: "pointer",
                },
              }}
            >
              <ListItemButton
                sx={{
                  justifyContent: isMini ? "center" : "initial",

                  minHeight: 48,

                  px: isMini ? 1 : 2,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: isMini ? 0 : 56,

                    justifyContent: "center",
                  }}
                >
                  <PeopleIcon sx={{ color: "primary.main" }} />
                </ListItemIcon>

                {/* Menu Text */}
                {!isMini && (
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
                )}
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </Box>
  );
}

export default memo(Sidebar);
