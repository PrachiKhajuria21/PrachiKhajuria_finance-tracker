import { createSlice } from "@reduxjs/toolkit";
import { records } from "../component/TransactionRecords";

export const transactionSlice = createSlice({
  name: "transaction",
  initialState: {
    value: records,
  },
  reducers: {
    addTransaction(state, action) {
      state.value.push(action.payload);
    },
    editTransaction(state, action) {
     
      let dataToUpdate = state.value.map((data) =>
        data.id === action.payload.userId ? action.payload.data1 : data
      );   
   
   
      state.value = dataToUpdate;
    },
    deleteTransaction(state,action){
      const data = action.payload.data;

      const newArray = data.filter(({id}) => id !== action.payload.index)
      console.log("newArray",newArray)
      // state.value = newArray;
    }
  },
});
// export const { showTransaction } = userSlice.action
export const { addTransaction, editTransaction,deleteTransaction } = transactionSlice.actions;
