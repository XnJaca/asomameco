// import UserCreate from "../features/users/UserCreate";
// Importa otros componentes según sea necesario

import { Grid } from "@mui/material";
import UserList from "../features/users/userList";

const ManageUsers = () => {
  return (
    // <Grid container spacing={2}>
    //   <h1>Manage Users</h1>
    //   <UserList />
    //   {/* <UserCreate /> */}
    //   {/* Agrega otros componentes CRUD aquí */}
    // </div>
    <Grid container spacing={2} p={4}>
      <Grid item xs={12}>
        <UserList />
      </Grid>
    </Grid>
  );
};

export default ManageUsers;
