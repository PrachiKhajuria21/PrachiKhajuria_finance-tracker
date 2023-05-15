import {  configureStore } from "@reduxjs/toolkit";
import { transactionSlice } from "./redux/transaction";
 
const store = configureStore({
    reducer:{
     transaction : transactionSlice.reducer
    }
})

export default store;