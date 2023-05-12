import react from "react";
import { useState, useContext } from "react";
import TableData from "./TableData";
import { useNavigate } from "react-router-dom";
import { userContext } from "../context/context";

export default function TableMerge() {
  // const getDataFromLS = JSON.parse(localStorage.getItem("Data"));

  const context = useContext(userContext);

  const getDataFromLS = context.data;
  console.log("::::::::", getDataFromLS);

  const [groupBy, setGroupBy] = useState({});
  const navigate = useNavigate();

  const handleGroup = (e) => {
    const get = getDataFromLS.reduce(function (a, b) {
      let key = b[e.target.value];
      if (!a[key]) {
        a[key] = [];
      }
      a[key].push(b);
      return a;
    }, {});
    setGroupBy(get);
  };

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

      {}

      {Object.keys(groupBy).length > 0 ? (
        Object.keys(groupBy).map((data, index) => (
          <>
            {/* /<TableData key={index} data={groupBy[data]} setData={setAllData} /> */}
        
            <TableData key={index} data={groupBy[data]} />
          </>
        ))
      ) : (
        <TableData data={getDataFromLS} />
      )}
    </>
  );
}
