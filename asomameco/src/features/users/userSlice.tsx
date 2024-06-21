import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IUser, IUserCreate } from "../../interfaces/user";
import {
    createUser,
    deleteUserApi,
    getAllUsers,
    updateUserApi,
} from "../../services/userService";

interface UserState {
  users: IUser[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: UserState = {
  users: [],
  status: "idle",
  error: null,
};

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  return await getAllUsers();
});

export const addUser = createAsyncThunk(
  "users/addUser",
  async (newUser: IUserCreate) => {
    await createUser(newUser);
    return await getAllUsers(); // Fetch the updated user list
  }
);

export const updateUser = createAsyncThunk(
  "users/updateUser",
  async (updatedUser: IUser) => {
    await updateUserApi(updatedUser);
    return await getAllUsers(); // Fetch the updated user list
  }
);

export const deleteUser = createAsyncThunk(
  "users/deleteUser",
  async (userId: number) => {
    await deleteUserApi(userId);
    return await getAllUsers(); // Fetch the updated user list
  }
);

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || null;
      })
      .addCase(addUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.users = action.payload;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.users = action.payload;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.users = action.payload;
      });
  },
});

export default userSlice.reducer;
