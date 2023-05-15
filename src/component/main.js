import react, { useEffect } from "react";
import { useState} from "react";
import TableData from "./TableData";
import { useNavigate } from "react-router-dom";
import { userContext } from "../context/context";
import { useSelector } from "react-redux";

export default function TableMerge() {

  const data = useSelector((state) => state.transaction.value)
  

  const getDataFromLS = data;


  const [groupBy, setGroupBy] = useState({});
  const [globalKey,setGlobalKey] = useState();
  const navigate = useNavigate();

  const handleGroup = (e) => {
    const selctKey = e.target.value;
    // console.log("e.tagr",e.target.value)
    setGlobalKey(selctKey);
    const get = getDataFromLS.reduce(function (a, b) {
      let key = b[e.target.value];
      // console.log("keys",key)
      if (!a[key]) {
        a[key] = [];
      }
      a[key].push(b);
      return a;
    }, {});
    setGroupBy(get);
   
    
  };


  //it will call on delete functionality
  useEffect(()=>{
    const get = getDataFromLS.reduce(function (a, b) {
      let key =b[globalKey];
      // console.log("keyyyyyyy",globalKey)
      // console.log("keys",key)
      if (!a[key]) {
        a[key] = [];
      }
      a[key].push(b);
      return a;
    }, {});
  // console.log("getttttt0",get)
    setGroupBy(get);
  },[getDataFromLS])



  // console.log("gte::::",groupBy)
  // console.log("keys::: ",Object.keys(groupBy))
  const handleRemove = () => {
    localStorage.removeItem("Token");
    navigate("/");
  };

  const selectClass = {
    marginLeft: "3%",
    border: "2px solid red",
  };

  const btn = {
    color: "white",
    marginLeft: "70%",
    backgroundColor: "red",
    border: "1px solid red",
    fontWeight: "bold",
  };

  const label = {
    marginLeft: "20px",
    fontWeight: "bold",
  };

  const handleSignIn = () => {
    navigate("/form");
  };
  const logout = {
    color: "white",
    marginLeft: "80%",
    backgroundColor: "green",
    border: "1px solid green",
    fontWeight: "bold",
    marginTop: "20px",
  };

  return (
    <>
      <div>
        <button onClick={handleRemove} style={logout}>
          Logout
        </button>
      </div>

      <label style={label}>Check tables here:</label>
      <select style={selectClass} defaultValue="" onChange={handleGroup}>
        <option value="">Whole Table</option>
        <option value="month">Month-year</option>
        <option value="transactionType">Transaction-type</option>
        <option value="fromAccount">From Account</option>
        <option value="toAccount">To Account</option>
      </select>

      <button style={btn} onClick={handleSignIn}>
        Add Details
      </button>

      {Object.keys(groupBy).length > 0 ? (
        Object.keys(groupBy).map((data, index) => (
          <>
            {/* /<TableData key={index} data={groupBy[data]} setData={setAllData} /> */}
         
            <TableData key={index} data={groupBy[data]}/>
          </>
        ))
      ) : (
        <TableData data={getDataFromLS} />
      )}
    </>
  );
}
