import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BookURL = "http://localhost:3000/books";

// ✅ API call - all books
export const fetchBooks = createAsyncThunk("books/fetchBooks", async () => {
  const res = await axios.get(BookURL);
  return res.data;
});

// ✅ API call - paginated books
export const paginationBooks = createAsyncThunk("books/paginationBooks", async (page) => {

  const res = await axios.get(`${BookURL}?_page=${page}&_limit=8`);
  return res.data;
});

// ✅ Add Book
export const addBook = createAsyncThunk("books/addBook", async (book) => {
  const res = await axios.post(BookURL, book);
  return res.data;
});

// ✅ Delete Book
export const deleteBook = createAsyncThunk("books/deleteBook", async (id) => {
  await axios.delete(`${BookURL}/${id}`);
  return id;
});

// ✅ Fetch one book by ID
export const fetchBookById = createAsyncThunk("books/fetchBookById", async (id) => {
  const res = await axios.get(`${BookURL}/${id}`);
  return res.data;
});

// ✅ Edit Book
export const editBook = createAsyncThunk("books/editBook", async ({ id, updatedData }) => {
  const res = await axios.put(`${BookURL}/${id}`, updatedData, {
    headers: { "Content-Type": "application/json" },
  });
  return res.data;
});

// Initial state
const initialState = {
  allBooks: [],   // full dataset
  books: [],      // paginated dataset
  singleBook: null,
  status: "idle",
  error: null,
};

// Slice
const bookSlice = createSlice({
  name: "books",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // ---- fetch all books ----
    builder
      .addCase(fetchBooks.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.allBooks = action.payload;
      })
      .addCase(fetchBooks.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });

    // ---- fetch paginated books ----
    builder
      .addCase(paginationBooks.pending, (state) => {
        state.status = "loading";
      })
      .addCase(paginationBooks.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.books = action.payload;
      })
      .addCase(paginationBooks.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });

    // ---- add book ----
    builder.addCase(addBook.fulfilled, (state, action) => {
      state.allBooks.push(action.payload); // keep full dataset updated
    });

    // ---- delete book ----
    builder.addCase(deleteBook.fulfilled, (state, action) => {
      state.allBooks = state.allBooks.filter((b) => b.id !== action.payload);
      state.books = state.books.filter((b) => b.id !== action.payload);
    });

    // ---- fetch one book ----
    builder.addCase(fetchBookById.fulfilled, (state, action) => {
      state.singleBook = action.payload;
    });

    // ---- edit book ----
    builder.addCase(editBook.fulfilled, (state, action) => {
      const updatedBook = action.payload;

      // update in allBooks
      const idxAll = state.allBooks.findIndex((b) => b.id === updatedBook.id);
      if (idxAll !== -1) state.allBooks[idxAll] = updatedBook;

      // update in paginated books
      const idxPage = state.books.findIndex((b) => b.id === updatedBook.id);
      if (idxPage !== -1) state.books[idxPage] = updatedBook;

      state.singleBook = updatedBook;
    });
  },
});

export default bookSlice.reducer;
