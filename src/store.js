import {  configureStore } from "@reduxjs/toolkit";
import { transactionSlice } from "./redux/transaction";
import { userSlice } from "./redux/userLogin";
 
const store = configureStore({
    reducer:{
     transaction : transactionSlice.reducer,
     userLoginInfo : userSlice.reducer,
    }
})

export default store;