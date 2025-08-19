import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

//API calling

export const fetchMembers = createAsyncThunk("fetchMembers", async () => {
    const res = await axios.get("http://localhost:3000/members")

    return res.data
})

const initialState = {
    members: [],
    status: "neutral",
    error: null
}

const memberSlice= createSlice({
    name: "member",
    initialState: initialState,
    reducers: {},
// API
    extraReducers: (builder) => {
        builder.addCase(fetchMembers.pending, (state) => {
            state.status = "loding.."
        });

        builder.addCase(fetchMembers.fulfilled, (state, action) => {
            state.status = "success";
            state.books = action.payload
        })

        builder.addCase(fetchMembers.rejected, (state, action) => {
            state.status = "error"
            state.error = action.payload.error
        })

    }
})

export default memberSlice.reducer