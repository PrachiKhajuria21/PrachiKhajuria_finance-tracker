import { configureStore } from "@reduxjs/toolkit";
import Rootreducer from "./redux/RootReducer";
import { transactionSlice } from "./redux/Transaction";

const store = configureStore({
  reducer: Rootreducer,
});
// export type RootState = ReturnType<typeof store.getState>;
export type RootState = ReturnType<typeof store.getState>;
export default store;
export type AppDispatch = typeof store.dispatch