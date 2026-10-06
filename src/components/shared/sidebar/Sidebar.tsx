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
import { Typography, useMediaQuery, useTheme } from "@mui/material";
import { DrawerHeader } from "./SidebarHeader";
import PeopleIcon from "@mui/icons-material/People";
import MainHeader from "../MainHeader/MainHeader";

function Sidebar({ drawerWidth, handleDrawer, open }: SidebarProps) {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
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
        <DrawerHeader sx={{ px: 2, py: 1.5, borderBottom: "1px solid rgba(148,163,184,0.14)" }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: isMini ? "center" : "space-between",
              width: "100%",
              gap: 1.5,
            }}
          >
            {!isMini && (
              <Box>
                <Typography
                  variant="subtitle2"
                  sx={{ color: "rgba(255,255,255,0.7)", fontWeight: 700 }}
                >
                  إدارة
                </Typography>
                <Typography sx={{ color: "#fff", fontWeight: 800, fontSize: 18 }}>Atlas</Typography>
              </Box>
            )}

            <Box
              sx={{
                width: 42,
                height: 42,
                borderRadius: 2,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",

                boxShadow: "0 12px 24px rgba(79, 70, 229, 0.35)",
                color: "#fff",
                fontWeight: 800,
              }}
            >
              A
            </Box>
          </Box>
        </DrawerHeader>

        <Divider sx={{ borderColor: "rgba(148,163,184,0.18)" }} />

        <List sx={{ px: 1.5, py: 2 }}>
          {[
            { text: "المستخدمين", active: true },
            { text: "الملف الشخصي" },
            { text: "الإعدادات" },
          ].map(({ text, active }) => (
            <ListItem key={text} disablePadding sx={{ mb: 1, direction: "rtl" }}>
              <ListItemButton
                sx={{
                  justifyContent: isMini ? "center" : "initial",
                  minHeight: 52,
                  px: isMini ? 1 : 2,
                  borderRadius: 3,
                  backgroundColor: active ? "rgba(79, 70, 229, 0.18)" : "transparent",
                  border: active ? "1px solid rgba(165, 180, 252, 0.45)" : "1px solid transparent",
                  color: active ? "#fff" : "rgba(226,232,240,0.8)",
                  "&:hover": {
                    backgroundColor: "rgba(148, 163, 184, 0.12)",
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: isMini ? 0 : 48,
                    justifyContent: "center",
                    color: active ? "#a5b4fc" : "rgba(226,232,240,0.8)",
                  }}
                >
                  <PeopleIcon />
                </ListItemIcon>

                {!isMini && (
                  <ListItemText
                    sx={{ margin: 0, direction: "rtl", textAlign: "start" }}
                    slotProps={{
                      primary: {
                        sx: {
                          fontSize: "16px",
                          fontWeight: 700,
                          color: active ? "#fff" : "rgba(226,232,240,0.9)",
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
