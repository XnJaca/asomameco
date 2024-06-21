import {
  Box,
  Button,
  CircularProgress,
  MenuItem,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { AppDispatch, RootState } from "../../app/store";
import { IUserCreate } from "../../interfaces/user";
import { fetchRoles } from "../role/roleSlice";
import { addUser, updateUser } from "./userSlice";

const UserCreate = ({ user, onClose, onSuccess }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [nombre, setNombre] = useState("");
  const [cedula, setCedula] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");
  const [password, setPassword] = useState("");
  const [rol, setRol] = useState("");
  const [loading, setLoading] = useState(false);

  const roles = useSelector((state: RootState) => state.roles.roles);
  const rolesStatus = useSelector((state: RootState) => state.roles.status);
  const rolesError = useSelector((state: RootState) => state.roles.error);

  useEffect(() => {
    if (user) {
      setNombre(user.nombre);
      setCedula(user.cedula);
      setEmail(user.email);
      setTelefono(user.telefono);
      setPassword("");
      setRol(user.rol.id);
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const newUser: IUserCreate = {
      nombre,
      cedula,
      email,
      telefono,
      password,
      rolId: Number(rol),
    };

    const action = user
      ? updateUser({ ...newUser, id: user.id })
      : addUser(newUser);

    dispatch(action)
      .unwrap()
      .then(() => {
        toast.success(
          user ? "Usuario actualizado con éxito" : "Usuario creado con éxito"
        );
        setTimeout(onSuccess, 1000);
      })
      .catch((error) => {
        toast.error(`Error: ${error.message}`);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    if (rolesStatus === "idle") {
      dispatch(fetchRoles());
    }
  }, [rolesStatus, dispatch]);

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
      <ToastContainer />
      <TextField
        label="Nombre"
        fullWidth
        margin="normal"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
      />
      <TextField
        label="Cédula"
        fullWidth
        margin="normal"
        value={cedula}
        onChange={(e) => setCedula(e.target.value)}
      />
      <TextField
        label="Email"
        fullWidth
        margin="normal"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        label="Teléfono"
        fullWidth
        margin="normal"
        value={telefono}
        onChange={(e) => setTelefono(e.target.value)}
      />
      <TextField
        label="Contraseña"
        fullWidth
        margin="normal"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <TextField
        label="Rol"
        fullWidth
        margin="normal"
        value={rol}
        select
        onChange={(e) => setRol(e.target.value)}
      >
        {roles.map((role) => (
          <MenuItem key={role.id} value={role.id}>
            {role.nombre}
          </MenuItem>
        ))}
      </TextField>
      <Box sx={{ mt: 2, display: "flex", justifyContent: "space-between" }}>
        <Button
          type="button"
          variant="outlined"
          color="error"
          onClick={onClose}
          sx={{ marginRight: 2 }}
          disabled={loading}
        >
          Cancelar
        </Button>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} /> : "Guardar"}
        </Button>
      </Box>
    </Box>
  );
};

export default UserCreate;
