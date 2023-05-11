import react, { useEffect, useRef, useState } from "react";
import DropDown from "./DropDown";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useLocation,
  Navigate,
} from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

export default function FormData({ state }) {

  const dataMonth = [
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
  ];
  const dataTransactionType = [
    "Home Expense",
    "Personal Expense",
    "Income Expense",
  ];
  const dataToAccount = [
    "Personal Account",
    "Real Living",
    "My Dream Home",
    "Full Circle",
    "Core Realtors",
    "Big Block",
  ];
  const dataFromAccount = [
    "Personal Account",
    "Real Living",
    "My Dream Home",
    "Full Circle",
    "Core Realtors",
    "Big Block",
  ];

 const fileTypee = ['png','jpeg','jpg'];


  const schema = yup.object().shape({
    date: yup.string().required("date is required"),
    month: yup.string().required("month is required"),
    transactionType: yup.string().required("TransactionType is required"),
    fromAccount: yup.string().required("From Account is required"),
    toAccount: yup
      .string()
      .required("To Account is required")
      .notOneOf(
        [yup.ref("fromAccount")],
        "Both the accounts should not be same"
      ),
    amount: yup
      .number()
      .required("Amount is required")
      .min(1, "amount should be greater than 0"),
    notes: yup
      .string()
      .required("Notes is required")
      .max(250, "notes length should be less than 250"),

    receipt: yup.mixed().test("fileRequired", "This is required", (value) => {
      if (value.length === 0) {
        return false;
      } else {
        return true;
      }
    })
    .test("fileSize","Size should not be greater than 1mb",(value) => {
    //  console.log("size",value[0].size);
     if(value[0]?.size > 1024 * 1024)
     {
        return false;
     }
     else
     {
        return true;
     }
    })
    .test("fileType","Image type should be jpeg,png or jpg",(value) => 
    {
        if(fileTypee.includes(value[0]?.type.slice(6)))
        {
           return true;
        }
        else
        {
          return false;
        }
    })
    ,
  });


  const imageRef = useRef(null);

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
  const pTag = {
    color: "red",
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  // let errorData = {};
  

  const onSubmit = (data) => console.log("new Form Data:::::::::::::", data);
  console.log("eroor::::", errors);

  return (
    <div className="container">
      <Link to="/table">
        <button style={backBtn}>Back</button>
      </Link>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group mt-2">
          <label>Transaction Data: </label>
          <input
            type="date"
            className="form-control"
            {...register("date")}
          ></input>
          <p style={pTag}>{errors.date?.message}</p>
        </div>

        <div className="form-group mt-2">
          <label>Month-year: </label>

          <select className="form-control" {...register("month")}>
            <option value="">Select Option</option>
            {dataMonth.map((data) => (
              <option key={data} value={data}>
                {data}
              </option>
            ))}
          </select>
          <p style={pTag}>{errors.month?.message}</p>
        </div>
        <div className="form-group mt-2">
          <label>Transaction Type: </label>

          <select className="form-control" {...register("transactionType")}>
            <option value="">Select Option</option>
            {dataTransactionType.map((data) => (
              <option key={data} value={data}>
                {data}
              </option>
            ))}
          </select>
          <p style={pTag}>{errors.transactionType?.message}</p>
        </div>
        <div className="form-group mt-2">
          <label>From Account: </label>
          <select className="form-control" {...register("fromAccount")}>
            <option value="">Select Option</option>
            {dataToAccount.map((data) => (
              <option key={data} value={data}>
                {data}
              </option>
            ))}
          </select>
          <p style={pTag}>{errors.fromAccount?.message}</p>
        </div>

        <div className="form-group mt-2">
          <label>To Account: </label>
          <select className="form-control" {...register("toAccount")}>
            <option value="">Select Option</option>
            {dataFromAccount.map((data) => (
              <option key={data} value={data}>
                {data}
              </option>
            ))}
          </select>
          <p style={pTag}>{errors.toAccount?.message}</p>
        </div>

        <div className="form-group mt-2">
          <label>Amount: </label>
          <input
            type="number"
            className="form-control"
            {...register("amount")}
          ></input>
          <p style={pTag}>{errors.amount?.message}</p>
        </div>

        <div className="form-group mt-2">
          <label>Receipt: </label>
          <div className="col-sm-18">
            {/* <img
              // type="file"
              // className="form-control-file"
              ref={imageRef}
              // onChange={handleValue}
              // name="receipt"
              src={formData.receipt}
            /> */}
            <input
              type="file"
              className="form-control-file"
              {...register("receipt")}
            ></input>
          </div>
          <p style={pTag}>{errors.receipt?.message}</p>
        </div>
        {/* <p>{validation.receipt}</p> */}
        <div className="form-group mt-2">
          <label>Notes: </label>
          <input
            type="textarea"
            className="form-control"
            
            {...register("notes")}
          />
        </div>
        <p style={pTag}>{errors.notes?.message}</p>
        <div className="mt-2">
          <button type="submit" style={submitBtn} className="btn btn-primary">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
