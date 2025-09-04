// issueSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchIssue = createAsyncThunk("issue/fetchIssue", async () => {
  const res = await axios.get("http://localhost:3000/issue");
  return res.data;
});

// NEW: issue a book
export const issueBook = createAsyncThunk("issue/issueBook", async (book) => {
  const res = await axios.post("http://localhost:3000/issue", book);
  return res.data;
});

const initialState = {
  issue: [],
  status: "neutral",
  error: null,
};

const issueSlice = createSlice({
  name: "issue",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchIssue.pending, (state) => {
      state.status = "loading...";
    });

    builder.addCase(fetchIssue.fulfilled, (state, action) => {
      state.status = "success";
      state.issue = action.payload;
    });

    builder.addCase(fetchIssue.rejected, (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    });

    // handle issueBook
    builder.addCase(issueBook.fulfilled, (state, action) => {
      state.issue.push(action.payload); // add new issued book
    });
  },
});

export default issueSlice.reducer;
