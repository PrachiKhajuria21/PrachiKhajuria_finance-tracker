import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { records } from "../Pages/Table/TransactionRecords";
import axios from "axios";
import { InitialStateType } from "../model";
// import { InitialStateType } from "../model";
// import { records } from "../component/TransactionRecords";



interface PsersonState {
  value: InitialStateType[];
}

const initialState: PsersonState = {
  value: [],
};
// const initialState:any;

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


export const deleteTransactionn: any = createAsyncThunk(
  "delete/fetch",
  async (id,thunkAPI) => {
    console.log("CheckID",id)
    const response = await fetch(`http://localhost:2000/user/${id}`, {
      method: "DELETE",
    });
    // console.log("API CALL", response);
    const data = response.json();
    return data;
  }
);

export const transactionSlice = createSlice({
  name: "transaction",
  initialState,
  reducers: {
    addTransaction(state, action) {
      axios.post("http://localhost:2000/user", action.payload);   
    },
    editTransaction(state, action) {
      console.log("Editted data", action.payload.dataEdit);
      let dataToUpdate = state.value?.map((data) =>
        data.id === action.payload.userId ? action.payload.dataEdit : data
      );
      console.log("daya", dataToUpdate);
      state.value = dataToUpdate;
    }
    // deleteTransaction(state, action) {
    //   // console.log("dataa",data)
    //   const newArray = state.value?.filter(
    //     ({ id }: { id: number }) => id !== action.payload.index
    //   );
    //   state.value = newArray;
    // },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchData.fulfilled, (state, action) => {
      state.value = action.payload;
    })
    builder.addCase(deleteTransactionn.fulfilled,(state,action)=>{
      state.value=action.payload
    });


  },
});

export const { addTransaction, editTransaction } =
  transactionSlice.actions;
