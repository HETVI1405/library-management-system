import {configureStore} from "@reduxjs/toolkit"
import bookSlice from "../features/bookSlice"
import memberSlice from "../features/membersSlice"
import finseSlice from "../features/finesSlice"
import issueSlice from "../features/issueSlice"
import reservationSlice from "../features/reservations"


export const store = configureStore({
    reducer:{
     book:bookSlice,
     members:memberSlice,
     fines:finseSlice,
     issue:issueSlice,
     reservation:reservationSlice
    },
})

