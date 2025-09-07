import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// API: Fetch issued books
export const fetchIssue = createAsyncThunk(
  "issue/fetchIssue",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get("http://localhost:3000/issues");
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// API: Issue a new book (add an issue record)
export const issueBook = createAsyncThunk(
  "issue/issueBook",
  async (newIssueData, thunkAPI) => {
    try {
      const response = await axios.post("http://localhost:3000/issues", newIssueData);
      return response.data; // returning the created issue record
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

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
      // fetchIssue
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

      // issueBook
      .addCase(issueBook.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(issueBook.fulfilled, (state, action) => {
        state.status = "succeeded";
        // Add the new issued book to the existing issue array
        state.issue.push(action.payload);
      })
      .addCase(issueBook.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Failed to issue book";
      });
  },
});

export default issueSlice.reducer;
