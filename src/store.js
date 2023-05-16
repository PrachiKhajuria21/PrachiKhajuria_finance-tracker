import {  configureStore } from "@reduxjs/toolkit";
import { transactionSlice } from "./redux/Transaction";
import { userSlice } from "./redux/UserLogin";

 
const store = configureStore({
    reducer:{
     transaction : transactionSlice.reducer,
     userLoginInfo : userSlice.reducer,
    }
})

export default store;