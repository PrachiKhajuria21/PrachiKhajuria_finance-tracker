import React, { useState, FormEvent } from "react";
import { useForm } from "react-hook-form";
import { InitialStateType } from "../../model";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import "./From.css";

// interface Props{
//   todo:string;
//   setTodo: React.Dispatch<React.SetStateAction<string>>
// }

// const Form = ({todo,setTodo}:Props) => {
//   const [formData,setFormData] = useState<initialState>()

//   return (
//     <div>djnfsjkbsd</div>
//   )
// }

const Form: React.FC = () => {
  const initialState: InitialStateType = {
    date: "",
    month: "",
    transactionType: "",
    fromAccount: "",
    toAccount: "",
    amount: 0,
    receipt: "",
    id: Date.now(),
    notes: "",
  };
  const [formData, setFormData] = useState(initialState);

  const dataMonth: string[] = [
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
  const dataTransactionType: string[] = [
    "Home Expense",
    "Personal Expense",
    "Income Expense",
  ];
  const dataToAccount: string[] = [
    "Personal Account",
    "Real Living",
    "My Dream Home",
    "Full Circle",
    "Core Realtors",
    "Big Block",
  ];
  const dataFromAccount: string[] = [
    "Personal Account",
    "Real Living",
    "My Dream Home",
    "Full Circle",
    "Core Realtors",
    "Big Block",
  ];
  const fileTypee = ["image/png", "image/jpeg", "image/jpg"];

  const values = formData;
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

    receipt: yup
      .mixed()
      .test("fileRequired", "This is required", (value: any) => {
        if (value.length === 0) {
          return false;
        } else {
          return true;
        }
      })
      .test("fileSize", "Size should not be greater than 1mb", (value: any) => {
        if (value[0]?.size > 1024 * 1024) {
          return false;
        } else {
          return true;
        }
      })
      .test(
        "fileType",
        "Image type should be jpeg,png or jpg",
        (value: any) => {
          // console.log(value[0]?.type )
          if (fileTypee.includes(value[0]?.type)) {
            return true;
          } else {
            return false;
          }
        }
      ),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ values, resolver: yupResolver(schema) });

  const onSubmit = (data: any) => {
    // e.preventDefault();
    setFormData(data);
    console.log("Hello", data);
  };

  console.log(formData);

  return (
    <div className="container">
      {/* <Link to="/table"> */}
      <button>Back</button>
      {/* </Link> */}

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group mt-2">
          <label>Transaction Data: </label>
          <input
            type="date"
            className="form-control"
            {...register("date")}
          ></input>
          <p className="ptag">{errors.date?.message}</p>
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
          <p className="ptag">{errors.month?.message}</p>
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
          <p className="ptag">{errors.transactionType?.message}</p>
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
          <p className="ptag">{errors.fromAccount?.message}</p>
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
          <p className="ptag">{errors.toAccount?.message}</p>
        </div>

        <div className="form-group mt-2">
          <label>Amount: </label>
          <input
            type="number"
            className="form-control"
            defaultValue={0}
            {...register("amount")}
          ></input>
          <p className="ptag">{errors.amount?.message}</p>
        </div>

        <div className="form-group mt-2">
          <label>Receipt: </label>
          <div className="col-sm-18">
            {/* {flag === 0 && <img ref={imageRef} src={formState.receipt} />}
            <img src={filed} /> */}

            {/* {console.log(formState.receipt)} */}

            <input
              type="file"
              className="form-control-file"
              {...register("receipt")}
              // onChange={handleReceipt}
            ></input>

            <p className="ptag">{errors.receipt?.message}</p>
          </div>
        </div>
        <div className="form-group mt-2">
          <label>Notes: </label>
          <input
            type="textarea"
            className="form-control"
            {...register("notes")}
          />
        </div>
        <p className="ptag">{errors.notes?.message}</p>
        <div className="mt-2">
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;
