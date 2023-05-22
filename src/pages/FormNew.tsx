import React, { useState, FormEvent } from "react";
import { useForm } from "react-hook-form";
import { initialState } from "../model";

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

const Form = () => {
  const [formData, setFormData] = useState<initialState>();
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

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data:any) => {
    // e.preventDefault();
    console.log("Hello",data);
  };

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
          {/* <p style={pTag}>{errors.date?.message}</p> */}
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
          {/* <p style={pTag}>{errors.month?.message}</p> */}
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
          {/* <p style={pTag}>{errors.transactionType?.message}</p> */}
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
          {/* <p style={pTag}>{errors.fromAccount?.message}</p> */}
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
          {/* <p style={pTag}>{errors.toAccount?.message}</p> */}
        </div>

        <div className="form-group mt-2">
          <label>Amount: </label>
          <input
            type="number"
            className="form-control"
            defaultValue={0}
            {...register("amount")}
          ></input>
          {/* <p style={pTag}>{errors.amount?.message}</p> */}
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

            {/* <p style={pTag}>{errors.receipt?.message}</p> */}
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
        {/* <p style={pTag}>{errors.notes?.message}</p> */}
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
