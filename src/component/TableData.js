import PageMeta from "./TableComponent";
import react, { useEffect, useState, useContext } from "react";
import { userContext } from "../context/context";

export default function TableData({ data }) {
  // const getDataFromLS = JSON.parse(localStorage.getItem("Data"));

  const [order, setOrder] = useState("asc");
  const [search, setSearch] = useState("");

  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    if (data && data.length > 0) {
      setTableData(data);
    }
  }, [data]);

  const records = 5;
  const totalRecords = data.length;
  // console.log("total recorsd", totalRecords);

  let pages = Math.ceil(totalRecords / records);
  // console.log(pages);
  let pageNumber = [...Array(pages + 1).keys()].slice(1);

  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLast = records * currentPage;
  const indexOfFirst = indexOfLast - records;

  const handlePagination = (number) => {
    setCurrentPage(number);
  };

  const handleTableData = ({ sort = "", searchValue = search }) => {
    let temp = [...data];
    let tempOrder = order;

    if (sort) {
      // Sorting
      if (tempOrder === "asc") {
        temp = temp.sort((a, b) => (a[sort] < b[sort] ? -1 : 1));

        tempOrder = "desc";
      } else if (tempOrder === "desc") {
        temp = temp.sort((a, b) => (a[sort] > b[sort] ? -1 : 1));
        tempOrder = "";
      } else {
        temp = data;
        tempOrder = "asc";
      }
      setOrder(tempOrder);
    }

    // Searching

    temp = temp.filter((curData) => {
      if (
        curData.month.includes(searchValue) ||
        curData.date.includes(searchValue) ||
        curData.transactionType.includes(searchValue) ||
        curData.fromAccount.includes(searchValue) ||
        curData.toAccount.includes(searchValue) ||
        curData.amount.includes(searchValue) ||
        curData.notes.includes(searchValue)
      ) {
        return curData;
      } else {
        return "";
      }
    });

    setTableData(temp);
  };

  const mystyle = {
    border: "2px solid green",
    margin: "auto",
  };

  const searchClass = {
    marginBottom: "20px",
    marginLeft: "20%",
    marginTop: "30px",
    color: "red",
    fontWeight: "bold",
  };

  useEffect(() => {
    handleTableData({ searchValue: search });
  }, [search]);

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  const pageBottom = {
    fontWeight: "bold",
    color: "red",
    cursor: "pointer",
  };

  return (
    <div>
      <div>
        <label style={searchClass}>Search</label>
        <input type="text" onChange={handleSearch} />
      </div>
      <div className="dropDown"></div>
      <table style={mystyle}>
        <tbody>
          <tr>
            
            <th onClick={() => handleTableData({ sort: "date" })}>
              Transaction Date
            </th>
            <th onClick={() => handleTableData({ sort: "month" })}>
              Month Year
            </th>
            <th onClick={() => handleTableData({ sort: "transactionType" })}>
              Transaction Type
            </th>
            <th onClick={() => handleTableData({ sort: "fromAccount" })}>
              From Account
            </th>
            <th onClick={() => handleTableData({ sort: "toAccount" })}>
              To Account
            </th>
            <th onClick={() => handleTableData({ sort: "amount" })}>Amount</th>
            <th>Receipt</th>
            <th onClick={() => handleTableData({ sort: "notes" })}>Notes</th>
            <th>Action</th>
            <th>View</th>
          </tr>
  
          <PageMeta datar={tableData.slice(indexOfFirst, indexOfLast)} />
         
        </tbody>
      </table>
      <div>
        {data.length > 0 &&
          pageNumber.map((number) => (
            <span
              style={pageBottom}
              key={number}
              onClick={() => handlePagination(number)}
            >
              {number}
            </span>
          ))}
      </div>
    </div>
  );
}
