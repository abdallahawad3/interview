import MuiAppBar, { type AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import { Box, IconButton, styled, Toolbar, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

interface IProps {
  drawerWidth: number;
  handleDrawerOpen: () => void;
  open: boolean;
}

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
  drawerWidth: number;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "drawerWidth",
})<AppBarProps>(({ theme, drawerWidth }) => ({
  width: `calc(100% - ${drawerWidth}px)`,
  marginRight: drawerWidth,
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.standard,
  }),
}));

const MainHeader = ({ drawerWidth, handleDrawerOpen, open }: IProps) => {
  return (
    <AppBar
      drawerWidth={drawerWidth}
      position="fixed"
      open={open}
      sx={{
        background: "linear-gradient(135deg, #4f46e5 0%, #4338ca 50%, #312e81 100%)",
        borderBottom: "1px solid rgba(255,255,255,0.1)",
      }}
    >
      <Toolbar
        sx={{
          minHeight: 78,
          justifyContent: "space-between",
          gap: 2,
          px: { xs: 2, sm: 3 },
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            sx={{
              border: "1px solid rgba(255,255,255,0.2)",
              backgroundColor: "rgba(255,255,255,0.08)",
              "&:hover": { backgroundColor: "rgba(255,255,255,0.14)" },
            }}
          >
            <MenuIcon />
          </IconButton>

          <Typography variant="h6" sx={{ color: "#fff", fontWeight: 700, letterSpacing: 0.2 }}>
            لوحة المستخدمين
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            px: 1.5,
            py: 0.75,
            borderRadius: 999,
            backgroundColor: "rgba(15, 23, 42, 0.18)",
            border: "1px solid rgba(255,255,255,0.12)",
          }}
        >
          <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.85)", fontWeight: 600 }}>
            admin@company
          </Typography>
          <IconButton sx={{ color: "#fff", p: 0.5 }}>
            <AccountCircleIcon />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default MainHeader;
