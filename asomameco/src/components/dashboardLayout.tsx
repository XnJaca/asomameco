import {
  Campaign,
  Dashboard,
  LogoutOutlined,
  Menu,
  People as PeopleIcon
} from "@mui/icons-material";
import {
  AppBar,
  Box,
  ButtonBase,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import img from "../assets/Logolg.png";
import { logout, selectAuth } from "../features/auth/authSlice";

const drawerWidth = 240;
const drawerClosedWidth = 80;

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(true);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const auth = useSelector(selectAuth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(logout());
    navigate("/login");
  };

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar
        position="fixed"
        sx={{
          width: isMobile
            ? "100%"
            : `calc(100% - ${
                isDrawerOpen ? drawerWidth : drawerClosedWidth
              }px)`,
          ml: isMobile
            ? 0
            : `${isDrawerOpen ? drawerWidth : drawerClosedWidth}px`,
          bgcolor: "background.default",
          color: "primary.contrastText",
          boxShadow: 0,
        }}
      >
        <Toolbar>
          {isMobile && (
            <IconButton
              color="primary"
              aria-label="open drawer"
              edge="start"
              onClick={toggleDrawer}
              sx={{ mr: 2 }}
            >
              <Menu />
            </IconButton>
          )}
          <Typography
            variant="h6"
            noWrap
            component="div"
            color={"primary.main"}
          >
            Bienvenido, {auth.user?.nombre ?? "Usuario"} 👋
          </Typography>
        </Toolbar>
      </AppBar>
      {isMobile ? (
        <Drawer
          anchor="top"
          open={isDrawerOpen}
          onClose={toggleDrawer}
          sx={{
            [`& .MuiDrawer-paper`]: {
              width: "100%",
              boxSizing: "border-box",
              bgcolor: "background.default",
              color: "text.primary",
            },
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <img
              src={img}
              alt="Logo"
              style={{
                width: "80%",
                height: "60px",
                marginRight: "10px",
                marginBottom: "10px",
                borderRadius: "10px",
              }}
            />
          </Box>
          <Divider />
          <Box sx={{ overflow: "auto" }}>
            <List
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 1,
                alignItems: "center",
              }}
            >
              <ListItem
                component={ButtonBase}
                key="Home"
                onClick={() => {
                  navigate("/");
                  toggleDrawer(); // Cerrar el menú al seleccionar una opción
                }}
              >
                <ListItemIcon sx={{ justifyContent: "center", minWidth: 0 }}>
                  <Dashboard sx={{ color: "primary.main" }} />
                </ListItemIcon>
                <ListItemText primary="HOME" />
              </ListItem>

              <ListItem
                component={ButtonBase}
                key="Usuarios"
                onClick={() => {
                  navigate("/users");
                  toggleDrawer(); // Cerrar el menú al seleccionar una opción
                }}
              >
                <ListItemIcon sx={{ justifyContent: "center", minWidth: 0 }}>
                  <PeopleIcon sx={{ color: "primary.main" }} />
                </ListItemIcon>
                <ListItemText primary="USUARIOS" />
              </ListItem>
              <ListItem
                component={ButtonBase}
                onClick={() => {
                  handleLogout();
                  toggleDrawer(); // Cerrar el menú al seleccionar una opción
                }}
                key="Cerrar Sesión"
              >
                <ListItemIcon sx={{ justifyContent: "center", minWidth: 0 }}>
                  <LogoutOutlined sx={{ color: "primary.main" }} />
                </ListItemIcon>
                <ListItemText primary="Cerrar Sesión" />
              </ListItem>
            </List>
          </Box>
        </Drawer>
      ) : (
        <Drawer
          variant="permanent"
          sx={{
            width: isDrawerOpen ? drawerWidth : drawerClosedWidth,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: {
              width: isDrawerOpen ? drawerWidth : drawerClosedWidth,
              boxSizing: "border-box",
              bgcolor: "background.default",
              color: "text.primary",
              boxShadow: 0,
              overflowX: "hidden",
            },
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: isDrawerOpen ? "center" : "flex-end",
            }}
          >
            {isDrawerOpen && (
              <img
                src={img}
                alt="Logo"
                style={{
                  width: "80%",
                  height: "60px",
                  marginRight: "10px",
                  marginBottom: "10px",
                  borderRadius: "10px",
                }}
              />
            )}
            <IconButton
              color="primary"
              aria-label="open drawer"
              edge="start"
              onClick={toggleDrawer}
            >
              <Menu />
            </IconButton>
          </Box>
          <Divider />
          <Box sx={{ overflow: "auto" }}>
            <List
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 1,
                alignItems: "end",
              }}
            >
              <ListItem
                component={ButtonBase}
                key="Home"
                onClick={() => {
                  navigate("/");
                  toggleDrawer(); // Cerrar el menú al seleccionar una opción
                }}
              >
                <ListItemIcon sx={{ justifyContent: "center", minWidth: 0 }}>
                  <Dashboard sx={{ color: "primary.main" }} />
                </ListItemIcon>
                <ListItemText primary="Inicio" />
              </ListItem>
              <ListItem
                component={ButtonBase}
                key="Usuarios"
                onClick={() => {
                  navigate("/manage-users");
                }}
              >
                <ListItemIcon sx={{ justifyContent: "center", minWidth: 0 }}>
                  <PeopleIcon sx={{ color: "primary.main" }} />
                </ListItemIcon>
                {isDrawerOpen && <ListItemText primary="Usuarios" />}
              </ListItem>

              <ListItem
                component={ButtonBase}
                key="Eventos"
                onClick={() => {
                  navigate("/manage-events");
                }}
              >
                <ListItemIcon sx={{ justifyContent: "center", minWidth: 0 }}>
                  <Campaign sx={{ color: "primary.main" }} />
                </ListItemIcon>
                {isDrawerOpen && <ListItemText primary="Eventos" />}
              </ListItem>
              <ListItem
                component={ButtonBase}
                onClick={handleLogout}
                key="Cerrar Sesión"
              >
                <ListItemIcon sx={{ justifyContent: "center", minWidth: 0 }}>
                  <LogoutOutlined sx={{ color: "primary.main" }} />
                </ListItemIcon>
                {isDrawerOpen && <ListItemText primary="Cerrar Sesión" />}
              </ListItem>
            </List>
          </Box>
        </Drawer>
      )}
      <Box
        component="main"
        sx={{
          marginTop: "100px",
          flexGrow: 1,
          bgcolor: "background.default",
          p: 1,
          minHeight: "100vh",
        }}
      >
        {children}
        <Outlet />
      </Box>
    </Box>
  );
};

export default DashboardLayout;
