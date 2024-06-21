import { Add, Delete, Edit } from "@mui/icons-material";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../app/store";
import { IEvent } from "../../interfaces/event";
import EventCreate from "./eventCreate";
import { deleteEvent, fetchEvents } from "./eventSlice";

const EventList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const events = useSelector((state: RootState) => state.events.events);
  const eventStatus = useSelector((state: RootState) => state.events.status);
  const error = useSelector((state: RootState) => state.events.error);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [open, setOpen] = useState(false);
  const [currentEvent, setCurrentEvent] = useState(null);

  useEffect(() => {
    if (eventStatus === "idle") {
      dispatch(fetchEvents());
    }
  }, [eventStatus, dispatch]);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleClickOpen = (event = null) => {
    setCurrentEvent(event);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setCurrentEvent(null);
  };

  const handleSuccess = () => {
    setOpen(false);
    setCurrentEvent(null);
  };

  const handleDeleteEvent = (id: number) => {
    dispatch(deleteEvent(id));
  };

  let content;

  if (eventStatus === "loading") {
    content = <p>Loading...</p>;
  } else if (eventStatus === "succeeded") {
    // Agregar validación adicional para asegurarse de que events esté definido
    if (!events || events.length === 0) {
      content = <p>No se han creado eventos aun.</p>;
    } else {
      content = (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Nombre</TableCell>
                <TableCell>Descripción</TableCell>
                <TableCell>Fecha</TableCell>
                <TableCell>Hora</TableCell>
                <TableCell>Lugar</TableCell>
                <TableCell>Estado</TableCell>
                <TableCell>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {events
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((event: IEvent) => (
                  <TableRow key={event.id}>
                    <TableCell>{event.id}</TableCell>
                    <TableCell>{event.nombre}</TableCell>
                    <TableCell>{event.descripcion}</TableCell>
                    <TableCell>{event.fecha}</TableCell>
                    <TableCell>{event.hora}</TableCell>
                    <TableCell>{event.lugar}</TableCell>
                    <TableCell>
                      {event.estado ? "Activo" : "Inactivo"}
                    </TableCell>
                    <TableCell>
                      <IconButton onClick={() => handleClickOpen(event)}>
                        <Edit />
                      </IconButton>
                      <IconButton onClick={() => handleDeleteEvent(event.id)}>
                        <Delete />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
          <TablePagination
            component="div"
            count={events.length}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </TableContainer>
      );
    }
  } else if (eventStatus === "failed") {
    content = <p>{error}</p>;
  }

  return (
    <section>
      <Box
        sx={{ display: "flex", justifyContent: "space-between" }}
        marginBottom={2}
      >
        <Typography variant="h4">Eventos</Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<Add />}
          onClick={() => handleClickOpen()}
        >
          Agregar Evento
        </Button>
      </Box>
      {content}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          {currentEvent ? "Editar Evento" : "Agregar Nuevo Evento"}
        </DialogTitle>
        <DialogContent>
          <EventCreate
            event={currentEvent}
            onClose={handleClose}
            onSuccess={handleSuccess}
          />
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default EventList;
