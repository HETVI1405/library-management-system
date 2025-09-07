import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// API base url
const memberApi = "http://localhost:3000/members";

// Fetch all members
export const fetchMembers = createAsyncThunk("members/fetchMembers", async () => {
  const res = await axios.get(memberApi);
  return res.data;
});

// Add new member
export const addMember = createAsyncThunk("members/addMember", async (newMember) => {
  const res = await axios.post(memberApi, newMember);
  return res.data;
});

// Update existing member
export const updateMember = createAsyncThunk("members/updateMember", async (updatedMember) => {
  const { memberId } = updatedMember;
  const res = await axios.put(`${memberApi}/${memberId}`, updatedMember);
  return res.data;
});

// Delete member by id
export const deleteMember = createAsyncThunk("members/deleteMember", async (memberId) => {
  await axios.delete(`${memberApi}/${memberId}`);
  return memberId; // return id for reducer to filter out
});

const initialState = {
  members: [],
  status: "neutral",
  error: null,
};

const memberSlice = createSlice({
  name: "members",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // fetchMembers
    builder.addCase(fetchMembers.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchMembers.fulfilled, (state, action) => {
      state.status = "success";
      state.members = action.payload;
    });
    builder.addCase(fetchMembers.rejected, (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    });

    // addMember
    builder.addCase(addMember.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(addMember.fulfilled, (state, action) => {
      state.status = "success";
      state.members.push(action.payload);
    });
    builder.addCase(addMember.rejected, (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    });

    // updateMember
    builder.addCase(updateMember.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(updateMember.fulfilled, (state, action) => {
      state.status = "success";
      const index = state.members.findIndex(m => m.memberId === action.payload.memberId);
      if (index !== -1) {
        state.members[index] = action.payload;
      }
    });
    builder.addCase(updateMember.rejected, (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    });

    // deleteMember
    builder.addCase(deleteMember.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(deleteMember.fulfilled, (state, action) => {
      state.status = "success";
      state.members = state.members.filter(m => m.memberId !== action.payload);
    });
    builder.addCase(deleteMember.rejected, (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    });
  }
});

export default memberSlice.reducer;
