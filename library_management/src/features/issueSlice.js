import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const IssueURL = "http://localhost:3000/issues";

// Post issue
export const issueBook = createAsyncThunk("issue/issueBook", async (issueData) => {
  const res = await axios.post(IssueURL, issueData);
  return res.data;
});

// Fetch all issues
export const fetchIssue = createAsyncThunk("issue/fetchIssue", async () => {
  const res = await axios.get(IssueURL);
  return res.data;
});

const issueSlice = createSlice({
  name: "issue",
  initialState: {
    issue: [],
    status: "idle",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchIssue.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchIssue.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.issue = action.payload;
      })
      .addCase(issueBook.fulfilled, (state, action) => {
        state.issue.push(action.payload);
      });
  },
});

export default issueSlice.reducer;
