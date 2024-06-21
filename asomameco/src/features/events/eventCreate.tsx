import { Box, Button, CircularProgress, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { AppDispatch } from "../../app/store";
import { IEventCreate } from "../../interfaces/event";
import { addEvent, updateEvent } from "./eventSlice";

const EventCreate = ({ event, onClose, onSuccess }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [fecha, setFecha] = useState("");
  const [hora, setHora] = useState("");
  const [lugar, setLugar] = useState("");
  const [estado, setEstado] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (event) {
      setNombre(event.nombre);
      setDescripcion(event.descripcion);
      setFecha(event.fecha);
      setHora(event.hora);
      setLugar(event.lugar);
      setEstado(event.estado);
    }
  }, [event]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const newEvent: IEventCreate = {
      nombre,
      descripcion,
      fecha,
      hora,
      lugar,
      estado,
    };

    const action = event
      ? updateEvent({ ...newEvent, id: event.id })
      : addEvent(newEvent);

    dispatch(action)
      .unwrap()
      .then(() => {
        toast.success(
          event ? "Evento actualizado con éxito" : "Evento creado con éxito"
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
        label="Descripción"
        fullWidth
        margin="normal"
        value={descripcion}
        onChange={(e) => setDescripcion(e.target.value)}
      />
      <TextField
        label="Fecha"
        fullWidth
        margin="normal"
        type="datetime-local"
        value={fecha}
        onChange={(e) => setFecha(e.target.value)}
        InputLabelProps={{
          shrink: true,
        }}
      />
      <TextField
        label="Hora"
        fullWidth
        margin="normal"
        value={hora}
        onChange={(e) => setHora(e.target.value)}
      />
      <TextField
        label="Lugar"
        fullWidth
        margin="normal"
        value={lugar}
        onChange={(e) => setLugar(e.target.value)}
      />
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

export default EventCreate;
