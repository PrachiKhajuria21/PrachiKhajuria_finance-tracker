import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { records } from "../Pages/Table/TransactionRecords";
import axios from "axios";
import { InitialStateType } from "../model";
// import { InitialStateType } from "../model";
// import { records } from "../component/TransactionRecords";

export const fetchData: any = createAsyncThunk(
  "data/fetch",
  async (thunkAPI) => {
    const response = await fetch("http://localhost:2000/userr", {
      method: "GET",
    });
    console.log("API CALL", response);
    const data = response.json();
    return data;
  }
);

interface PsersonState {
  value: InitialStateType[];
}

const initialState: PsersonState = {
  value: [],
};
// const initialState:any;

export const transactionSlice = createSlice({
  name: "transaction",
  initialState,
  reducers: {
    addTransaction(state, action) {
      // state.value.push(action.payload);
      // console.log("actionPayload",action.payload)
      axios.post("http://localhost:2000/user", action.payload);
      // .then((response)=>{
      //   console.log(response)
      // },(error)=>{
      //   console.log(error)
      // });
    },
    editTransaction(state, action) {
      console.log("Editted data", action.payload.dataEdit);
      let dataToUpdate = state.value?.map((data) =>
        data.id === action.payload.userId ? action.payload.dataEdit : data
      );
      console.log("daya", dataToUpdate);
      state.value = dataToUpdate;
    },
    deleteTransaction(state, action) {
      // console.log("dataa",data)
      const newArray = state.value?.filter(
        ({ id }: { id: number }) => id !== action.payload.index
      );
      state.value = newArray;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchData.fulfilled, (state, action) => {
      console.log("EXTRA REDUCER", fetchData);
      state.value = action.payload;
    });
  },
});

export const { addTransaction, editTransaction, deleteTransaction } =
  transactionSlice.actions;
