import {configureStore} from "@reduxjs/toolkit"
import bookReducer from "../features/bookSlice"
import memberSlice from "../features/membersSlice"
import finseSlice from "../features/finesSlice"
import issueSlice from "../features/issueSlice"
import userSlice from "../features/userSlice"


export const store = configureStore({
    reducer:{
     books:bookReducer,
     members:memberSlice,
     fines:finseSlice,
     issue:issueSlice,
     users:userSlice,
    },
})

