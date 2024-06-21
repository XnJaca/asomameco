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
import { IUser } from "../../interfaces/user";
import UserCreate from "./userCreate";
import { deleteUser, fetchUsers } from "./userSlice";

const UserList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const users = useSelector((state: RootState) => state.users.users);
  const userStatus = useSelector((state: RootState) => state.users.status);
  const error = useSelector((state: RootState) => state.users.error);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [open, setOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    if (userStatus === "idle") {
      dispatch(fetchUsers());
    }
  }, [userStatus, dispatch]);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleClickOpen = (user = null) => {
    setCurrentUser(user);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setCurrentUser(null);
  };

  const handleSuccess = () => {
    setOpen(false);
    setCurrentUser(null);
  };

  const handleDeleteUser = (id: number) => {
    dispatch(deleteUser(id));
  };

  let content;

  if (userStatus === "loading") {
    content = <p>Loading...</p>;
  } else if (userStatus === "succeeded") {
    content = (
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Nombre</TableCell>
              <TableCell>Cédula</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Teléfono</TableCell>
              <TableCell>Estado</TableCell>
              <TableCell>Rol</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((user: IUser) => (
                <TableRow key={user.id}>
                  <TableCell>{user.id}</TableCell>
                  <TableCell>{user.nombre}</TableCell>
                  <TableCell>{user.cedula}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.telefono}</TableCell>
                  <TableCell>{user.estado ? "Activo" : "Inactivo"}</TableCell>
                  <TableCell>{user.rol.nombre}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleClickOpen(user)}>
                      <Edit />
                    </IconButton>
                    <IconButton onClick={() => handleDeleteUser(user.id)}>
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        <TablePagination
          component="div"
          count={users.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
    );
  } else if (userStatus === "failed") {
    content = <p>{error}</p>;
  }

  return (
    <section>
      <Box
        sx={{ display: "flex", justifyContent: "space-between" }}
        marginBottom={2}
      >
        <Typography variant="h4">Usuarios</Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<Add />}
          onClick={() => handleClickOpen()}
        >
          Agregar Usuario
        </Button>
      </Box>
      {content}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          {currentUser ? "Editar Usuario" : "Agregar Nuevo Usuario"}
        </DialogTitle>
        <DialogContent>
          <UserCreate
            user={currentUser}
            onClose={handleClose}
            onSuccess={handleSuccess}
          />
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default UserList;
