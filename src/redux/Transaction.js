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
      // console.log("Editted data",action.payload.dataEdit)
      let dataToUpdate = state.value.map((data) =>
        data.id === action.payload.userId ? action.payload.dataEdit : data
      );
      console.log("daya", dataToUpdate);
      state.value = dataToUpdate;
    },
    deleteTransaction(state, action) {
      const data = action.payload.data;
      const newArray = data.filter(({ id }) => id !== action.payload.index);

      state.value = newArray;
    },
  },
});

export const { addTransaction, editTransaction, deleteTransaction } =
  transactionSlice.actions;
