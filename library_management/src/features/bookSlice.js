import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

//API calling

export const fetchBooks = createAsyncThunk("fetchBooks", async () => {
    const res = await axios.get("http://localhost:3000/books")

    return res.data
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
        builder.addCase(fetchBooks.pending, (state) => {
            state.status = "loding.."
        });

        builder.addCase(fetchBooks.fulfilled, (state, action) => {
            state.status = "success";
            state.books = action.payload
        })

        builder.addCase(fetchBooks.rejected, (state, action) => {
            state.status = "error"
            state.error = action.payload.error
        })

    }
})

export default bookSlice.reducer