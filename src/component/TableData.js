import PageMeta from "./TableComponent";
import react, { useEffect, useState } from "react";

export default function TableData({ data }) {
  const getDataFromLS = JSON.parse(localStorage.getItem("Data"));

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

  let pages = Math.ceil(totalRecords / records);
  let pageNumber = [...Array(pages + 1).keys()].slice(1);

  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLast = records * currentPage;
  const indexOfFirst = indexOfLast - records;

  const HandleSort = (getname) => {
    if (order === "asc") {
      // if (search.length !== 0) {
      // sortFunctionasc(getname, data);

      return;
      // }
      // sortFunctionasc(getname, data);
    } else if (order === "desc") {
      // if (search.length !== 0) {
      // sortFunctiondesc(getname, data);
      return;
      // }
      // sortFunctiondesc(getname, data);
    } else {
      // if (search.length !== 0) {
      // setData(search);
      // setOrder("desc");
      // }
      // setData(data);
      // setOrder("asc");
    }
  };

  // useEffect(() => {
  //  setTableData(data);
  // }, []);

  // const sortFunctionasc = (getname, param) => {
  //   const sortedArr = param.sort((a, b) => (a[getname] < b[getname] ? -1 : 1));
  //   // setData(sortedArr);
  //   setSearch(sortedArr);
  //   setOrder("desc");

  //   return;
  // };

  // const sortFunctiondesc = (getname, param) => {
  //   const sortedArr = param.sort((a, b) => (a[getname] > b[getname] ? -1 : 1));
  //   // setData(sortedArr);

  //   setOrder(" ");
  // };

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
            <th>ID</th>
            {/* <th onClick={() => HandleSort("date")}>Transaction Date</th> */}
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
          </tr>
          {/* {data.length > 0 && search.length === 0 && ( */}

          <PageMeta datar={tableData.slice(indexOfFirst, indexOfLast)} />
          {/* )} */}
          {/* {search.length > 0 && <PageMeta data={search} />} */}
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
