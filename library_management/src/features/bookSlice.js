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

    return res.data;
});
//Delete book in Api
export const deleteBook = createAsyncThunk("deleteBook", async (id) => {
    const res = await axios.delete(`${BookURL}/${id}`)

    return res.id
});

//edit book in Api
export const editBook = createAsyncThunk("editBook", async ({ id, updatedData }) => {
    const res = await axios.patch(`${BookURL}/${id}`, updatedData);
    return res.data;
});

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

        builder.addCase(fetchBooks.rejected, (state) => {
            state.status = "error"

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

        //Delete Book in Api cases
        builder.addCase(deleteBook.pending, (state) => {
            state.status = "loding"
        });

        builder.addCase(deleteBook.fulfilled, (state, action) => {
  state.status = "success";
  state.books = state.books.filter((book) => book.id !== action.payload);
});
        builder.addCase(deleteBook.rejected, (state) => {
            state.status = "error"
        });

        //Delete Book in Api cases
        builder.addCase(editBook.pending, (state) => {
            state.status = "loding"
        });

        builder.addCase(editBook.fulfilled, (state, action) => {
            state.status = "success";
            const index = state.books.findIndex(book => book.id === action.payload.id);
            if (index !== -1) {
                state.books[index] = action.payload;
            }
        });
        builder.addCase(editBook.rejected, (state) => {
            state.status = "error"
        })






    }
})

export default bookSlice.reducer