import React, { useState, FormEvent, useEffect } from "react";
import { useForm } from "react-hook-form";
import { InitialStateType } from "../../model";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import "./From.css";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { addTransaction, editTransaction } from "../../redux/Transaction";

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
  const data = useSelector((state: RootState) => state.transaction.value);

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
  const [receiptData, setReceiptData] = React.useState<string | ArrayBuffer | null>("");
  const [filed, setFiled] = useState<string>();
  const [flag, setFlag] = useState<number>(0);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formState, setFormState] = useState(initialState);

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

  const values = formState;
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
      .test("fileRequired", "This is required", (value:any) => {
        console.log("fileType",value.length)
        if (value.length === 0) {
          return false;
        } else {
          return true;
        }
      })
      .test("fileSize", "Size should not be greater than 1mb", (value:any) => {
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
          if (value instanceof FileList) {
            if (fileTypee.includes(value[0]?.type)) {
              return true;
            } else {
              return false;
            }
          }
          if (typeof value === "string" || value.length === 0) {
            return true;
          }
        }
      ),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ values, resolver: yupResolver(schema) });

  const location = useLocation();
  const userId = location.state;

  const handleReceipt = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file: File = (e.target.files as FileList)[0];
    const reader = new FileReader();
    reader.onloadend = () => {
 
      setReceiptData(reader.result);
    };
    reader.readAsDataURL(file);
    setFlag(1);
    setFiled(URL.createObjectURL(file));
  };

  // console.log("filled",filed)
  console.log("receipt",receiptData)

  useEffect(() => {
    const userData = data.find(({ id }) => id === userId);
    if (userData !== undefined) {
      setFormState(userData);
    }
  }, []);
  console.log("formSatate", formState);

  const onSubmit = (data: InitialStateType) => {
    // e.preventDefault();
    // setFormData(data);
    // console.log("Hello", data);
    if (!userId) {
      const dataAdd = {
        ...data,
        id: Date.now(),
        receipt: receiptData,
      };
      setFlag(0);
      dispatch(addTransaction(dataAdd));
      navigate("/reg");
    } else {
      let dataEdit;
      if (flag === 1) {
        dataEdit = {
          ...data,
          receipt: receiptData,
        };
        setFlag(0);
      } else {
        dataEdit = data;
      }
      dispatch(editTransaction({ userId, dataEdit }));
      navigate("/reg");
    }
  };

  return (
    <div className="container">
      <Link to="/reg">
        <button className="backBtn">Back</button>
      </Link>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group mt-2">
          <label>Transaction Date: </label>
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
            {flag === 0 && <img src={formState.receipt} />}
            <img src={filed} />

            {/* {console.log(formState.receipt)} */}

            <input
              type="file"
              className="form-control-file"
              {...register("receipt")}
              onChange={handleReceipt}
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
