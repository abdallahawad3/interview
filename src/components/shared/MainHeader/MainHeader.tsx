import MuiAppBar, { type AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import { IconButton, styled, Toolbar } from "@mui/material";
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
  shouldForwardProp: (prop) => prop !== "open" && prop !== "drawerWidth",
})<AppBarProps>(({ theme, open, drawerWidth }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),

  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginRight: drawerWidth,

    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const MainHeader = ({ drawerWidth, handleDrawerOpen, open }: IProps) => {
  return (
    <AppBar
      drawerWidth={drawerWidth}
      position="fixed"
      open={open}
      sx={{
        backgroundColor: "primary.main",
      }}
    >
      <Toolbar
        sx={{
          justifyContent: "space-between",
        }}
      >
        <IconButton color="inherit" aria-label="open drawer" onClick={handleDrawerOpen}>
          <MenuIcon />
        </IconButton>

        <IconButton
          sx={{
            color: "#fff",
          }}
        >
          <AccountCircleIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default MainHeader;
