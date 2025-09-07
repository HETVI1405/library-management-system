import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const IssueURL = "http://localhost:3000/issues";

// API: Fetch issued books
export const fetchIssue = createAsyncThunk("issue/fetchIssue", async (_, thunkAPI) => {
  try {
    const response = await axios.get(IssueURL);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

// API: Add new issue (POST)
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
    status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch
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
      })

      // Issue new book
      .addCase(issueBook.pending, (state) => {
        state.status = "loading";
      })
      .addCase(issueBook.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.issue.push(action.payload);
      })
      .addCase(issueBook.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Failed to issue book";
      });
  },
});

export default issueSlice.reducer;
