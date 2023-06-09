import react,{ useState,useContext} from "react";
import TableData from "./TableData";
import { useNavigate } from "react-router-dom";
import { userContext } from "../context/context";

export default function PageMeta({ datar }) {
  console.log("datarrr",datar)

  const { data,setData } = useContext(userContext);

  const navigate = useNavigate();

  const handleEdit = (index) => { 
    navigate("/form",{state:index})
  };

  const handleRemove = (index) =>
  {
     const newArray = data.filter(({id}) => id !== index)
     console.log("newArray",newArray)
     setData(newArray)
  }
  console.log()

  const edit = {
    backgroundColor: "green",
    border: "1px solid green",
    fontWeight: "bold",
    color: "white"
  }

  return (
    <>
      { 
        datar.length > 0 &&
        datar.map((datar, index) => (
          <tr key={index}>
            {/* <td>{datar.id}</td> */}
            <td>{datar.date}</td>
            <td>{datar.month}</td>
            <td>{datar.transactionType}</td>
            <td>{datar.fromAccount}</td>
            <td>{datar.toAccount}</td>
            <td>{datar.amount}</td>
            <td>
              <img src={datar.receipt} alt="test" />
            </td>
            <td>{datar.notes}</td>
            <td>
              <button style={edit} onClick={() => handleEdit(datar.id)}>Edit</button>
            </td>
            <td>
              <button style={edit} onClick={() => handleRemove(datar.id)}>Remove</button>
            </td>
          </tr>
        ))}
    </>
  );
}
