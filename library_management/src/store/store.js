import {configureStore} from "@reduxjs/toolkit"
import bookSlice from "../features/bookSlice"
import memberSlice from "../features/membersSlice"
export const store = configureStore({
    reducer:{
     book:bookSlice,
     members:memberSlice
    },
})

