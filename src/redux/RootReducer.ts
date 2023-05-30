import { transactionSlice } from "./Transaction";
import { userSlice } from "./UserLogin";
// import { userSlice } from "./UserLogin";


const Rootreducer = {
    transaction : transactionSlice.reducer,
    userLoginInfo : userSlice.reducer,
}

export default Rootreducer;