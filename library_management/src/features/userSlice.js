import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// API base url
const usersApi = "http://localhost:3000/users";

// Fetch all users
export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  const res = await axios.get(usersApi);
  return res.data;
});

// Add new user
export const addUsers = createAsyncThunk("users/addUsers", async (newUser) => {
  const res = await axios.post(usersApi, newUser);
  return res.data;
});

// Update existing user
export const updateUser = createAsyncThunk("users/updateUser", async (updatedUser) => {
  const { memberId } = updatedUser;
  const res = await axios.put(`${usersApi}/${memberId}`, updatedUser);
  return res.data;
});

// Delete user by id
export const deleteUser = createAsyncThunk("users/deleteUser", async (memberId) => {
  await axios.delete(`${usersApi}/${memberId}`);
  return memberId; // return id for reducer to filter out
});

const initialState = {
  users: [],
  status: "idle",  // usually initial state is 'idle' or 'neutral'
  error: null,
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // fetchUsers
    builder.addCase(fetchUsers.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.users = action.payload;
    });
    builder.addCase(fetchUsers.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });

    // addUsers
    builder.addCase(addUsers.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(addUsers.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.users.push(action.payload);
    });
    builder.addCase(addUsers.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });

    // updateUser
    builder.addCase(updateUser.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(updateUser.fulfilled, (state, action) => {
      state.status = "succeeded";
      const index = state.users.findIndex((u) => u.memberId === action.payload.memberId);
      if (index !== -1) {
        state.users[index] = action.payload;
      }
    });
    builder.addCase(updateUser.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });

    // deleteUser
    builder.addCase(deleteUser.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(deleteUser.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.users = state.users.filter((u) => u.memberId !== action.payload);
    });
    builder.addCase(deleteUser.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });
  },
});

export default usersSlice.reducer;
