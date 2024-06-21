import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IRole } from "../../interfaces/role";
import { getAllRoles } from "../../services/roleService";

interface RoleState {
  roles: IRole[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: RoleState = {
  roles: [],
  status: "idle",
  error: null,
};

export const fetchRoles = createAsyncThunk("roles/fetchRoles", async () => {
  return await getAllRoles();
});

const roleSlice = createSlice({
  name: "roles",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRoles.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchRoles.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.roles = action.payload;
      });
  },
});

// export const selectRoles = (state: RootState) => state.roles.roles;

export default roleSlice.reducer;
