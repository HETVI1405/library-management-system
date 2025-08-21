import {configureStore} from "@reduxjs/toolkit"
import bookReducer from "../features/bookSlice"
import memberSlice from "../features/membersSlice"
import finseSlice from "../features/finesSlice"
import issueSlice from "../features/issueSlice"
import reservationSlice from "../features/reservations"


export const store = configureStore({
    reducer:{
     books:bookReducer,
     members:memberSlice,
     fines:finseSlice,
     issue:issueSlice,
     reservation:reservationSlice
    },
})

