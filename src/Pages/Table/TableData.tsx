// import PageMeta from "./TableComponent";
import { useEffect, useState } from "react";
import { string } from "yup";
import { InitialStateType, sortt } from "../../model";
// import PageMeta from "./TableComponent";
// import PageMeta from "./TableComponent";

interface Props {
  data: InitialStateType[];
}

const TableData = ({ data }: Props) => {
  const [order, setOrder] = useState<string>("asc");
  const [search, setSearch] = useState("");

  const [tableData, setTableData] = useState<InitialStateType[]>(data);

  const records: number = 5;
  const totalRecords: number = data.length;

  let pages: number = Math.ceil(totalRecords / records);

  const pageNumber = [...Array(pages + 1).keys()].slice(1);
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLast = records * currentPage;
  const indexOfFirst = indexOfLast - records;

  const handlePagination = (number: number) => {
    setCurrentPage(number);
  };

  const handleTableData = ({
    sort = "id",
    searchValue = search,
  }: {
    sort?:sortt;
    searchValue?: string;
  }) => {
    let temp = [...data];
    let tempOrder = order;

    if (sort !== "id") {
      // Sorting
      if (tempOrder === "asc") {
        temp = temp.sort((a: InitialStateType, b: InitialStateType) =>
          a[sort] < b[sort] ? -1 : 1
        );

        tempOrder = "desc";
      } else if (tempOrder === "desc") {
        temp = temp.sort((a: any, b: any) => (a[sort] > b[sort] ? -1 : 1));
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
        curData.month.toLocaleLowerCase().includes(searchValue.trim()) ||
        curData.date.includes(searchValue.trim()) ||
        curData.transactionType.includes(searchValue.trim()) ||
        curData.fromAccount.includes(searchValue.trim()) ||
        curData.toAccount.includes(searchValue.trim()) ||
        curData.notes.includes(searchValue.trim()) ||
        curData.amount.toString().includes(searchValue.trim())
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
  const edit = {
    backgroundColor: "green",
    border: "1px solid green",
    fontWeight: "bold",
    color: "white",
    marginLeft: "20px",
  };

  const searchClass = {
    marginBottom: "20px",
    marginLeft: "20%",
    marginTop: "30px",
    color: "red",
    fontWeight: "bold",
  };
  const tableHeaderTrans = {
    paddingLeft: "20px",
  };

  useEffect(() => {
    handleTableData({ searchValue: search });
  }, [search]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log("search::::", event.target.value);
    setSearch(event.target.value);
  };

  const pageBottom = {
    fontWeight: "bold",
    color: "red",
    cursor: "pointer",
  };

  const getArrow = (order:string) => {
    if (order === "asc") {
      return "";
    } else if (order === "desc") {
      return "↑";
    } else {
      return "↓";
    }
  };

  const tableHeader = {
    padding: "5px",
    border: "1px solid skyblue",
    backgroundColor: "skyblue",
    fontWeight: "bold",
  };
  const header = {
    padding: "10px",
  };
  const headerType = {
    paddingLeft: "10px",
  };
  const pageStyle = {
    marginLeft: "40%",
    marginTop: "2%",
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
            <th
              style={headerType}
              onClick={() => handleTableData({ sort: "date" })}
            >
              <button style={tableHeader}>Date{getArrow(order)}</button>
            </th>
            <th onClick={() => handleTableData({ sort: "month" })}>
              <button style={tableHeader}>
                Month Year
                {getArrow(order)}
              </button>
            </th>
            <th
              onClick={() => handleTableData({ sort: "transactionType" })}
              style={headerType}
            >
              <button style={tableHeader}>
                Transaction Type {getArrow(order)}{" "}
              </button>
            </th>
            <th
              onClick={() => handleTableData({ sort: "fromAccount"})}
              style={headerType}
            >
              <button style={tableHeader}>
                {" "}
                From Account
                {getArrow(order)}
              </button>
            </th>
            <th onClick={() => handleTableData({ sort: "toAccount" })}>
              <button style={tableHeader}>
                {" "}
                To Account
                {getArrow(order)}
              </button>
            </th>
            <th onClick={() => handleTableData({ sort: "amount"})}>
              <button style={tableHeader}>
                {" "}
                Amount
                {getArrow(order)}
              </button>
            </th>
            <th style={headerType}>
              <button style={tableHeader}>Receipt</button>
            </th>
            <th
              style={headerType}
              onClick={() => handleTableData({ sort: "notes" })}
            >
              <button style={tableHeader}>
                {" "}
                Notes
                {getArrow(order)}
              </button>
            </th>
            <th>
              <button style={tableHeader}>Action</button>
            </th>
            <th style={headerType}>
              <button style={tableHeader}>View</button>
            </th>
          </tr>

          {tableData.length > 0 &&
            tableData.slice(indexOfFirst, indexOfLast).map((data, index) => (
              <tr key={index}>
                <td>{data.id}</td>
                <td style={tableHeaderTrans}>{data.date}</td>
                <td style={tableHeaderTrans}>{data.month}</td>
                <td style={tableHeaderTrans}>{data.transactionType}</td>
                <td style={tableHeaderTrans}>{data.fromAccount}</td>
                <td style={tableHeaderTrans}>{data.toAccount}</td>
                <td style={tableHeaderTrans}>{data.amount}</td>
                <td style={tableHeaderTrans}>
                  <img src={data.receipt} alt="test" />
                </td>
                <td style={tableHeaderTrans}>{data.notes}</td>
                <td>
                  <button
                    style={edit}
                    // onClick={() => handleEdit(data.id)}
                  >
                    Edit
                  </button>
                </td>
                <td>
                  <button
                    style={edit}
                    // onClick={() => handleRemove(datar.id)}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <div style={pageStyle}>
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
};

export default TableData;
