import { configureStore } from "@reduxjs/toolkit";
import bookReducer from "../features/bookSlice";
import memberReducer from "../features/membersSlice";
import finesReducer from "../features/finesSlice";
import issueReducer from "../features/issueSlice";
import reservationSlice from "../features/reservations";
import authReducer from "../features/authSlice";


export const store = configureStore({
  reducer: {
    books: bookReducer,
    members: memberReducer,
    fines: finesReducer,
    issue: issueReducer,
    reservation: reservationSlice,
  auth: authReducer,
  },
});
