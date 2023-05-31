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

export const insertData:any = createAsyncThunk("data/insert",async(dataAdd)=>{
  console.log("data",dataAdd)
    const response = await fetch(`http://localhost:2000/user`, {
      method: "POST",
      body: JSON.stringify(dataAdd),
      headers: { 'Content-Type': 'application/json' }
    });
  
    const data = response.json();
    console.log("editted data",data)
    return data;
  })

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
  async (id) => {
    console.log("CheckID",id)
    const response = await fetch(`http://localhost:2000/user/${id}`, {
      method: "DELETE",
    });
    const data = response.json();
    return data;
  }
);


export const editTransactionn:any = createAsyncThunk(
  "edit/fetch",
  async (dataconsole:any) => {
    const id = dataconsole.userId;
    const response = await fetch(`http://localhost:2000/userUpdate/${id}`, {
      method: "PUT",
      body: JSON.stringify(dataconsole.dataEdit),
      headers: { 'Content-Type': 'application/json' }
    });
  
    const data = response.json();
    console.log("editted data",data)
    return data;
  }
);


export const transactionSlice = createSlice({
  name: "transaction",
  initialState,
  reducers: {
    // addTransaction(state, action) {
    //   axios.post("http://localhost:2000/user", action.payload);   
    // },

    editTransaction(state, action) {
      // console.log("called");
// const userId = action.payload.userId;
// const data = action.payload.dataEdit
//       axios.put(`http://localhost:2000/userUpdate/${userId}`,data)


      let dataToUpdate = state.value?.map((data) =>
        data.id === action.payload.userId ? action.payload.dataEdit : data
      );
      console.log("daya", dataToUpdate);
      state.value = dataToUpdate;
    }
   
  },
  extraReducers: (builder) => {
    builder.addCase(insertData.fulfilled,(state,action)=>{
       state.value = action.payload
    })
    builder.addCase(fetchData.fulfilled, (state, action) => {
      state.value = action.payload;
    })
    builder.addCase(deleteTransactionn.fulfilled,(state,action)=>{
      state.value=action.payload
    })
    // builder.addCase(editTransactionn.fulfilled,(state,action)=>{
       
    // })

  },
});

export const {editTransaction } =
  transactionSlice.actions;
