import react, { useState } from "react";
import TableData from "./TableData";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteTransaction } from "../redux/Transaction";

export default function PageMeta({ datar }) {
  const data = useSelector((state) => state.transaction.value);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleEdit = (index) => {
    navigate("/form", { state: index });
  };

  const handleRemove = (index) => {
    dispatch(deleteTransaction({ index, data }));
  };

  const edit = {
    backgroundColor: "green",
    border: "1px solid green",
    fontWeight: "bold",
    color: "white",
    marginLeft: "20px",
  };
  const tableHeader = {
    paddingLeft: "30px",
  };
  const tableHeaderTrans = {
    paddingLeft: "20px",
  };

  return (
    <>
      {datar.length > 0 &&
        datar.map((datar, index) => (
          <tr key={index}>
            {/* <td>{datar.id}</td> */}
            <td style={tableHeader}>{datar.date}</td>
            <td style={tableHeader}>{datar.month}</td>
            <td style={tableHeaderTrans}>{datar.transactionType}</td>
            <td style={tableHeaderTrans}>{datar.fromAccount}</td>
            <td style={tableHeaderTrans}>{datar.toAccount}</td>
            <td style={tableHeaderTrans}>{datar.amount}</td>
            <td style={tableHeaderTrans}>
              <img src={datar.receipt} alt="test" />
            </td>
            <td style={tableHeaderTrans}>{datar.notes}</td>
            <td>
              <button style={edit} onClick={() => handleEdit(datar.id)}>
                Edit
              </button>
            </td>
            <td>
              <button style={edit} onClick={() => handleRemove(datar.id)}>
                Remove
              </button>
            </td>
          </tr>
        ))}
    </>
  );
}
