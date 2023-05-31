import react, { useEffect } from "react";
import { useState } from "react";
// import TableData from "./TableData";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import TableData from "./TableData";
import { InitialStateType } from "../../model";
// import TableData from "./TableData";

interface GroupByType {
  [key: string]: InitialStateType[];
}


const TableMerge: React.FC = () => {

  const data = useSelector((state: RootState) => state.transaction.value);

  const getDataFromLS = data;

  const [groupBy, setGroupBy] = useState<GroupByType>({});
  const [globalKey, setGlobalKey] = useState<string>("");
  const navigate = useNavigate();

  // useEffect(() => {
  //   console.log("state updated!");
  // }, [groupBy]);

  const handleGroup = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selctKey = e.target.value;
    setGlobalKey(selctKey);
    // console.log("globalKey",typeof(globalKey))
    if (e.target.value === "") {
      setGroupBy({});
    }
    const get = getDataFromLS.reduce(function (a: GroupByType, b: any) {
      let key = b[e.target.value];
      if (!a[key]) {
        a[key] = [];
      }
      a[key].push(b);
      return a;
    }, {});
    setGroupBy(get);
  };

  // it will call on delete functionality
  useEffect(() => {
     const get = getDataFromLS.reduce(function (a: GroupByType, b: any) {
    
      let key = b[globalKey];
      if (!a[key]) {
        a[key] = [];
      }
      a[key].push(b);
      return a;
    }, {});
    setGroupBy(get);
  }, [getDataFromLS]);

  // console.log("data", getDataFromLS);

  const handleRemove = () => {
    document.cookie = "tokenCookie= ";
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
            <TableData key={index} data={groupBy[data as keyof GroupByType]} />
          </>
        ))
      ) : (
        <>
          <TableData data={getDataFromLS} />
        </>
      )}
    </>
  );
};

export default TableMerge;

// groupBy[data]
