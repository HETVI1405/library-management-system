// features/issueSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

<<<<<<< HEAD
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
=======
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
>>>>>>> cac6c0f189acf375d09f1b26b13e6729251a9f7b
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
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
<<<<<<< HEAD
      // fetch issues
=======
      // fetchIssue
>>>>>>> cac6c0f189acf375d09f1b26b13e6729251a9f7b
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
<<<<<<< HEAD
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
=======
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
>>>>>>> cac6c0f189acf375d09f1b26b13e6729251a9f7b
      });
  },
});

export default issueSlice.reducer;
``