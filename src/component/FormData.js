import react, { useEffect, useForm, useRef, useState } from "react";
import DropDown from "./DropDown";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useLocation,
  Navigate,
} from "react-router-dom";

export default function FormData({ state }) {
  const INITIAL_STATE = {
    date: "",
    month: "",
    transactionType: "",
    fromAccount: "",
    toAccount: "",
    amount: "",
    receipt: "",
    id: 0,
    receiptSize: 0,
    notes: "",
  };

  const [formData, setFormData] = useState(INITIAL_STATE);

  const location = useLocation();
  const userId = location.state;
  console.log("userID:::::::::", userId);

  const localData = JSON.parse(localStorage.getItem("Data"));
  console.log("localStorage data", localData);
  // console.log("dataaaa inside form::::::: ",location.state)

  const userData = localData.find(({ id }) => id === userId);
  console.log("userData::::", userData);
  // setFormData(userData);

  useEffect(() => {
    if (userData !== undefined) {
      setFormData(userData);
      console.log("::::::", userData);
    } else {
      setFormData(INITIAL_STATE);
    }
  }, []);

  const [validation, setValidation] = useState({});
  const imageRef = useRef(null);

  let errors = {};
  const handleValue = (e) => {
    if (e.target.name === "receipt") {
      let fileSize = e.target.files[0].size;
      setFormData((prev) => ({ ...prev, receiptSize: fileSize }));
      console.log("1- ", e.target.value);
      var filePath = e.target.value;
      if (!filePath.match(/\.(jpg|jpeg|png|gif)$/)) {
        alert("enter valid image");
      }
      // console.log("2- ",e.)
      else {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
          setFormData((prev) => ({
            ...prev,
            receipt: reader.result.toString(),
          }));
        };
        reader.readAsDataURL(file);
      }
    }
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const validate = (value) => {
    
    if (!value.date) {
      errors.date = "Date is required";
    }
    if (!value.month) {
      errors.month = "Month is required";
    }

    if (!value.transactionType) {
      errors.transactionType = "Transaction Type is required";
    }
    if (!value.fromAccount) {
      errors.fromAccount = "From Account is required";
    }

    if (!value.toAccount) {
      errors.toAccount = "To Account is required";
    } else if (value.toAccount === value.fromAccount) {
      errors.toAccount = "Both the accounts are not same";
    }

    if (!value.amount || value.amount === 0) {
      errors.amount = "Amount is required and should be greater than 0";
      console.log("amounnt::", value.amount);
    }

    if (!value.receipt) {
      errors.receipt = "Receipt is required";
    }
 
    if (value.receiptSize > 1024 * 1024) {
      errors.receipt = "Limit exceeded";
    }

    if (!value.notes || value.notes.length > 250) {
      errors.notes = "invalid notes length or notes are not required";
    }

    return errors;
  };

  const handleSubmit = (e) => {
 

    if (userData === undefined) {
      console.log("HHHHHHHHHHHHHHHHHHH");
     const errFunc = validate(formData);
      // console.log("functionValue", validate(formData));
      setValidation(errFunc);

      const errorLength = Object.values(errFunc).filter((item) => item !== "");
      console.log("error length", errorLength.length);

      if (errorLength.length === 0) {
        formData.id = localData.length + 1;
        setFormData(formData.id);
        console.log("formDataID: ", formData.id);

        let array = JSON.parse(localStorage.getItem("Data") || "[]");
        array.push(formData);

        localStorage.setItem("Data", JSON.stringify(array));

        console.log("Array::::", array);
        Navigate("/")
      }
    } else {
      console.log("hellloooooo");

      let array = JSON.parse(localStorage.getItem("Data") || "[]");

      array[userId - 1] = formData;

      localStorage.setItem("Data", JSON.stringify(array));
    }
  };

  console.log("formDataID", formData.id);
  console.log("validation", validation);

  const myvariable = {
    color: "red",
  };

  const backBtn = {
    color: "white",
    marginLeft: "50%",
    backgroundColor: "red",
    border: "1px solid red",
    fontWeight: "bold",
  };
  const submitBtn = {
    marginLeft: "50%",
  };

  return (
    <div className="container">
      <Link to="/table">
        <button style={backBtn}>Back</button>
      </Link>

      <form onSubmit={handleSubmit}>
        <div className="form-group mt-2">
          <label>Transaction Data: </label>
          <input
            type="date"
            className="form-control"
            onChange={handleValue}
            defaultValue={formData.date}
            name="date"
          />
        </div>
        <p style={myvariable}>{validation.date}</p>
        <div className="form-group mt-2">
          <label>Month-year: </label>

          <DropDown
            data={[
              "january",
              "febrary",
              "march",
              "april",
              "may",
              "june",
              "july",
              "august",
              "september",
              "october",
              "november",
              "december",
            ]}
            value={formData.month}
            name="month"
            setFormData={setFormData}
          />
        </div>
        <p style={myvariable}>{validation.month}</p>
        <div className="form-group mt-2">
          <label>Transaction Type: </label>
          <DropDown
            data={["Home Expense", "Personal Expense", "Income Expense"]}
            name="transactionType"
            setFormData={setFormData}
            value={formData.transactionType}
          />
        </div>
        <p style={myvariable}>{validation.transactionType}</p>
        <div className="form-group mt-2">
          <label>From Account: </label>
          <DropDown
            data={[
              "Personal Account",
              "Real Living",
              "My Dream Home",
              "Full Circle",
              "Core Realtors",
              "Big Block",
            ]}
            name="fromAccount"
            setFormData={setFormData}
            value={formData.fromAccount}
          />
        </div>
        <p style={myvariable}>{validation.fromAccount}</p>
        <div className="form-group mt-2">
          <label>To Account: </label>
          <DropDown
            data={[
              "Personal Account",
              "Real Living",
              "My Dream Home",
              "Full Circle",
              "Core Realtors",
              "Big Block",
            ]}
            name="toAccount"
            setFormData={setFormData}
            value={formData.toAccount}
          />
        </div>
        <p style={myvariable}>{validation.toAccount}</p>
        <div className="form-group mt-2">
          <label>Amount: </label>
          <input
            type="number"
            className="form-control"
            onChange={handleValue}
            name="amount"
            value={formData.amount}
          />
        </div>
        <p style={myvariable}>{validation.amount}</p>
        <div className="form-group mt-2">
          <label>Receipt: </label>
          <div className="col-sm-18">
            <img
              // type="file"
              // className="form-control-file"
              ref={imageRef}
              onChange={handleValue}
              name="receipt"
              src={formData.receipt}
            />
            <input
              type="file"
              className="form-control-file"
              onChange={handleValue}
              name="receipt"
              // value={formData.receipt}
            />
          </div>
        </div>
        <p style={myvariable}>{validation.receipt}</p>
        <div className="form-group mt-2">
          <label>Notes: </label>
          <input
            type="textarea"
            className="form-control"
            onChange={handleValue}
            name="notes"
            value={formData.notes}
          />
        </div>
        <p style={myvariable}>{validation.notes}</p>

        <div className="mt-2">
          <button type="submit" style={submitBtn} className="btn btn-primary">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
