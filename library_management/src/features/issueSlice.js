import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// API: Fetch issued books
export const fetchIssue = createAsyncThunk("issue/fetchIssue", async (_, thunkAPI) => {
  try {
    const response = await axios.get("http://localhost:3000/issues");
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

const issueSlice = createSlice({
  name: "issue",
  initialState: {
    issue: [],
    status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchIssue.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchIssue.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.issue = action.payload;
      })
      .addCase(fetchIssue.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Failed to fetch issued books";
      });
  },
});

export default issueSlice.reducer;
