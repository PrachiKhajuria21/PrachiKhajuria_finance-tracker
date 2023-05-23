import { createSlice } from "@reduxjs/toolkit";
import { userRecords } from "../Pages/Table/TransactionRecords";
// import { userRecords } from "../component/TransactionRecords";

export const userSlice = createSlice({
    name:"usersLoginInfo",
    initialState:{value:userRecords},
    reducers:{
        addUser(state,action){
            console.log("action",action.payload.action)
            state.value.push(action.payload)
        }
    }
})

export const { addUser } = userSlice.actions;