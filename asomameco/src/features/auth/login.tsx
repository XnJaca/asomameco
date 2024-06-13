import { Box, Button, Container, Grid, TextField } from "@mui/material";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../../services/authService";
import { login as loginAction } from "./authSlice";

import img from "../../assets/Logo.jpg";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await login({ email: username, password });
      localStorage.setItem("token", response.token); // Almacenar el token en localStorage
      dispatch(loginAction(response.user));
      navigate("/");
    } catch (error) {
      console.error("Error during login:", error);
      // Manejar el error adecuadamente, por ejemplo, mostrando un mensaje al usuario
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Grid
          item
          xs={12}
          sm={6}
          md={4}
          lg={3}
          style={{ marginBottom: 20, borderRadius: 30 }}
        >
          <img
            src={img}
            alt="Logo"
            style={{ width: "100%", borderRadius: 30 }}
          />
        </Grid>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Correo Electrónico"
            name="username"
            autoComplete="username"
            autoFocus
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Contraseña"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Login
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
