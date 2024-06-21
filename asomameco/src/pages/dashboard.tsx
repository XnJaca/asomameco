import { Group } from "@mui/icons-material";
import { Box, Grid, Typography } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import React from "react";
import { Link as RouterLink } from "react-router-dom";
import DashboardLayout from "../components/dashboardLayout";
import { MainCard } from "../components/mainCard";

const FitCardWithIcon = ({ icon, title, subtitle, background, to }) => {
  return (
    <Box
      component={RouterLink}
      to={to}
      sx={{
        width: "100%",
        p: 2,
        borderRadius: 6,
        bgcolor: background || "background.paper",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        textDecoration: "none", // Para eliminar el subrayado del enlace
        color: "inherit", // Para heredar el color de texto
        "&:hover": {
          textDecoration: "none",
          bgcolor: background || "background.paper", // Mantener el mismo color de fondo al hacer hover
        },
      }}
    >
      <Box>
        <Typography variant="h5">{title}</Typography>
        <Typography variant="subtitle1">{subtitle}</Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
        }}
      >
        {icon}
      </Box>
    </Box>
  );
};

const Dashboard: React.FC = () => {
  return (
    <DashboardLayout>
      <Grid container spacing={2}>
        <Grid item xs={12} md={8} lg={9}>
          <MainCard title="Panel Administrativo">
            <Grid container spacing={3}>
              <Grid item xs={12} md={4} lg={6}>
                <FitCardWithIcon
                  title="Usuarios"
                  subtitle="Gestion de usuarios"
                  icon={<Group />}
                  background={"primary.300"}
                  to={"/manage-users"}
                />
              </Grid>
              {/* <Grid item xs={12} md={4} lg={4}>
                <FitCardWithIcon
                  title="Grupos"
                  subtitle="150"
                  icon={<Group />}
                  background={"primary.300"}
                />
              </Grid> */}
            </Grid>
          </MainCard>
        </Grid>
        <Grid item xs={12} md={4} lg={3}>
          <MainCard title="Eventos">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateCalendar />
            </LocalizationProvider>
          </MainCard>
        </Grid>
      </Grid>
    </DashboardLayout>
  );
};

export default Dashboard;
