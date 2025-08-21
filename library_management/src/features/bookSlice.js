import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"


const BookURL = "http://localhost:3000/books";

//API calling

export const fetchBooks = createAsyncThunk("fetchBooks", async () => {
    const res = await axios.get(BookURL)

    return res.data
})

// Add Book in API
export const addBook = createAsyncThunk("addBook", async (book) => {
    const res = await axios.post(BookURL, book)

    return res.book;
})

const initialState = {
    books: [],
    status: "neutral",
    error: null
}

const bookSlice = createSlice({
    name: "book",
    initialState: initialState,
    reducers: {},
    // API
    extraReducers: (builder) => {

        // Api Calling Cases
        builder.addCase(fetchBooks.pending, (state) => {
            state.status = "loding"
        });

        builder.addCase(fetchBooks.fulfilled, (state, action) => {
            state.status = "success";
            state.books = action.payload
        })

        builder.addCase(fetchBooks.rejected, (state, action) => {
            state.status = "error"
            state.error = action.payload.error
        })


        // Add Book in Api Cases

        builder.addCase(addBook.pending, (state) => {
            state.status = "loding"
        });

        builder.addCase(addBook.fulfilled, (state, action) => {
            state.status = "success";
            state.books.push(action.payload);
        });

        builder.addCase(addBook.rejected, (state) => {
            state.status = "something went wrong"
        });

    }
})

export default bookSlice.reducer