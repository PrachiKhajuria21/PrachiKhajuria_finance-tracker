import PageMeta from "./TableComponent";
import react, { useEffect, useState} from "react";


export default function TableData({ data }) {
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
        curData.notes.includes(searchValue)
      ) {
        return curData;
      } else {
        return "";
      }
    });

    setTableData(temp);
  };

  console.log("sorting order",order)

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

  const getArrow = (order) =>
  {
    console.log("order::::",order)
     if(order === 'asc') 
     {
      return '';
     }
     else if(order === 'desc')
     {
      return '↑';
     }
     else
     {
      return '↓';
     }
  }

 const tableHeader = {
  padding:"5px",
  border:"1px solid skyblue",
  backgroundColor:"skyblue",
  fontWeight:"bold",

  
 }
 const header ={
  padding:"10px"
 };
 const headerType = {
  paddingLeft :"10px"
 }
 const pageStyle = {

  marginLeft:"40%",
  marginTop:"2%",
  
 }


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
            
            <th onClick={() => handleTableData({ sort: "date" })} style={header}><button  style={tableHeader}> Transaction Date {getArrow(order)}</button>
             
            </th>
            <th onClick={() => handleTableData({ sort: "month" })} ><button style={tableHeader}> Month Year {getArrow(order)}</button>
              
            </th>
            <th onClick={() => handleTableData({ sort: "transactionType" })} style={headerType}><button style={tableHeader}> Transaction Type {getArrow(order)}</button>
            </th>
            <th onClick={() => handleTableData({ sort: "fromAccount" })} ><button style={tableHeader}> From Account {getArrow(order)}</button>
             
            </th>
            <th onClick={() => handleTableData({ sort: "toAccount" })} ><button style={tableHeader}>  To Account {getArrow(order)}</button>
             
            </th>
            <th onClick={() => handleTableData({ sort: "amount" })}><button style={tableHeader}> Amount {getArrow(order)}</button></th>
            <th style={headerType}><button style={tableHeader}>Receipt</button></th>
            <th style={headerType} onClick={() => handleTableData({ sort: "notes" })}><button style={tableHeader}> Notes {getArrow(order)}</button></th>
            <th><button  style={tableHeader}>Action</button></th>
            <th style={headerType}><button style={tableHeader}>View</button></th>
          </tr>
  
          <PageMeta datar={tableData.slice(indexOfFirst, indexOfLast)} />
         
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
}
