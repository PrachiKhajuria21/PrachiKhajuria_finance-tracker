import react, { useEffect, useState } from "react";
export default function TableData() {
  const getDataFromLS = JSON.parse(localStorage.getItem("Data"));

  const [dataFromLs, setDataFromLs] = useState(getDataFromLS);
  const [order, setOrder] = useState("asc");
  const [getPageNumber, setPageNumber] = useState([]);
  // const [pageData,setPageData] = useState({
  //   records:4,
  //   startIndex:0,
  //   pageNumber:0,
  //   pages:0
  // })

  const records = 5;
  const startIndex = 0;

  let pages, pageNumber;

  const handleUserPages = (totalRecords) => {
    let pages = Math.ceil(totalRecords / records);

    let pageNumber = [...Array(pages + 1).keys()].slice(1);
    setPageNumber(pageNumber);
  };

  useEffect(() => {
    const totalRecords = getDataFromLS.length;
    handleUserPages(totalRecords);
  }, []);

  console.log("opages::: 0", pages);

  const handleChange = (page) => {
    let newPage;
    let lastPage = records;
    if (page === 1) {
      newPage = 0;
      lastPage = records;
    } else {
      newPage = (page - 1) * records;
      lastPage = newPage + records;
    }

    let postNew = dataFromLs.slice(newPage, lastPage);
    setDataFromLs(postNew);
  };

  const HandleSort = (getname) => {
    if (order === "asc") {
      sortFunctionasc(getname);
    } else if (order === "desc") {
      sortFunctiondesc(getname);
    } else {
      setDataFromLs(getDataFromLS);
      setOrder("asc");
    }
  };

  const sortFunctionasc = (getname) => {
    const sortedArr = dataFromLs.sort((a, b) =>
      a[getname] < b[getname] ? -1 : 1
    );
    setDataFromLs(sortedArr);
    console.log("sorted array", sortedArr);
    setOrder("desc");
  };

  const sortFunctiondesc = (getname) => {
    const sortedArr = dataFromLs.sort((a, b) =>
      a[getname] > b[getname] ? -1 : 1
    );
    setDataFromLs(sortedArr);
    console.log("sorted array", sortedArr);
    setOrder(" ");
  };

  return (
    <div>
      <table border="1px solid black">
        <tbody>
          <tr>
            <th onClick={() => HandleSort("date")}>Transaction Date</th>
            <th onClick={() => HandleSort("month")}>Month Year</th>
            <th onClick={() => HandleSort("transactionType")}>
              Transaction Type
            </th>
            <th onClick={() => HandleSort("fromAccount")}>From Account</th>
            <th onClick={() => HandleSort("toAccount")}>To Account</th>
            <th onClick={() => HandleSort("amount")}>Amount</th>
            <th>Receipt</th>
            <th onClick={() => HandleSort("notes")}>Notes</th>
            <td>Action</td>
          </tr>

          {dataFromLs.length > 0 &&
            dataFromLs.map((data, index) => (
              <tr key={index}>
                <td>{data.date}</td>
                <td>{data.month}</td>
                <td>{data.transactionType}</td>
                <td>{data.fromAccount}</td>
                <td>{data.toAccount}</td>
                <td>{data.amount}</td>
                <td>
                  <img src={data.receipt} alt="test" />
                </td>
                <td>{data.notes}</td>
              </tr>
            ))}
        </tbody>
      </table>
      <div>
        {dataFromLs.length > 0 &&
          getPageNumber?.map((page, index) => (
            <span
              key={page}
              onClick={() => handleChange(page)}
              className="page"
            >
              {page}
            </span>
          ))}
      </div>
    </div>
  );
}
