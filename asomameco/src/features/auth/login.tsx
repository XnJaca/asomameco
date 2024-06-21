import { Box, Button, Container, Grid, TextField } from "@mui/material";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import * as yup from "yup";
import { login } from "../../services/authService";
import { login as loginAction } from "./authSlice";

import img from "../../assets/Logo.jpg";

const validationSchema = yup.object({
  username: yup
    .string()
    .matches(/^\d+$/, "La cédula debe contener solo números")
    .required("La cédula es requerida"),
  password: yup.string().required("La contraseña es requerida"),
});

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const loginPromise = () => {
        return new Promise((resolve, reject) => {
          login({ email: values.username, password: values.password })
            .then((response) => {
              localStorage.setItem("token", response.token); // Almacenar el token en localStorage
              dispatch(loginAction(response.user));
              resolve(response);
              navigate("/");
            })
            .catch((error) => {
              console.error("Error during login:", error.response.data.error);
              reject(
                new Error(error.response?.data?.error || "Login failed 🤯")
              );
            });
        });
      };

      toast.promise(loginPromise(), {
        pending: "Logging in...",
        success: "Login successful 👌",
        error: {
          render({ data }) {
            return (data as Error).message;
          },
        },
      });
    },
  });

  return (
    <Container component="main" maxWidth="xs">
      <ToastContainer />

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
        <Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 1 }}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Cédula"
            name="username"
            autoComplete="username"
            autoFocus
            value={formik.values.username}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.username && Boolean(formik.errors.username)}
            helperText={formik.touched.username && formik.errors.username}
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
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
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
