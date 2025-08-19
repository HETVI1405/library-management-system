import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

//API calling

export const fetchReservation= createAsyncThunk("fetchIssue", async() => {
    const res = await axios.get("http://localhost:3000/reservations")

    return res.data
})

const initialState = {
    reservations: [],
    status: "neutral",
    error: null
}

const reservationsSlice= createSlice({
    name: "issue",
    initialState: initialState,
    reducers: {},
// API
    extraReducers: (builder) => {
        builder.addCase(fetchReservation.pending, (state) => {
            state.status = "loding.."
        });

        builder.addCase(fetchReservation.fulfilled, (state, action) => {
            state.status = "success";
            state.books = action.payload
        })

        builder.addCase(fetchReservation.rejected, (state, action) => {
            state.status = "error"
            state.error = action.payload.error
        })

    }
})

export default reservationsSlice.reducer