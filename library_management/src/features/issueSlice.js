// features/issueSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const IssueURL = "http://localhost:3000/issues";

// Fetch all issues
export const fetchIssue = createAsyncThunk("issue/fetchIssue", async (_, thunkAPI) => {
  try {
    const response = await axios.get(IssueURL);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

// ✅ Issue new book (POST)
export const issueBook = createAsyncThunk("issue/issueBook", async (issueData, thunkAPI) => {
  try {
    const response = await axios.post(IssueURL, issueData);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

const issueSlice = createSlice({
  name: "issue",
  initialState: {
    issue: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // fetch issues
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
        state.error = action.payload;
      })

      // ✅ issue new book
      .addCase(issueBook.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.issue.push(action.payload); // નવા issue ને local state માં ઉમેરો
      })
      .addCase(issueBook.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default issueSlice.reducer;
``