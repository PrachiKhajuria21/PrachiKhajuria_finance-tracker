import react, { useEffect, useRef, useState } from "react";

import {
  BrowserRouter as Router,
  Link,
  useLocation,
} from "react-router-dom";
import { addTransaction, editTransaction } from "../redux/transaction";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

export default function FormData() {
  const data = useSelector((state) => state.transaction.value);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const INITIAL_STATE = {
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

  const [formState, setFormState] = useState(INITIAL_STATE);
  const values = formState;

  const location = useLocation();
  const userId = location.state;

  useEffect(() => {
    const userData = data.find(({ id }) => id === userId);
    if (userData !== undefined) {
      setFormState(userData);
    }
  }, []);

  const [receiptData, setReceiptData] = useState("");

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

  const fileTypee = ["image/png", "image/jpeg", "image/jpg"];

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
      .test("fileRequired", "This is required", (value) => {
        if (value.length === 0) {
          return false;
        } else {
          return true;
        }
      })
      .test("fileSize", "Size should not be greater than 1mb", (value) => {
        if (value[0]?.size > 1024 * 1024) {
          return false;
        } else {
          return true;
        }
      })
    .test("fileType", "Image type should be jpeg,png or jpg", (value) => {
      console.log("image type", value[0].type);
      if (value[0].type !== undefined) {
        if (fileTypee.includes(value[0]?.type)) {
          return true;
        } else {
          return false;
        }
      }else{
        return true;
      }

    })
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
  } = useForm({ values, resolver: yupResolver(schema) });

 const [flag,setFlag] = useState(0)
 console.log("flag",flag)

 const [filed, setFiled] = useState();

  const handleReceipt = (e) => {
    const file = e.target.files[0];
    console.log("receipt", file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setReceiptData(reader.result);
      
    };
    reader.readAsDataURL(file);
     setFlag(1)
     setFiled(URL.createObjectURL(e.target.files[0]));


 
  };

  console.log("receipt", receiptData);
  // console.log("formState.receipt", formState.receipt);

 


  const onSubmit = (data1) => {
    if (!userId) {
      const dataAdd = {
        ...data1,
        id: Date.now(),
        receipt: receiptData,
      };
      setFlag(0)
      console.log("flagNewUser",flag)
      dispatch(addTransaction(dataAdd));
     
      navigate("/table");
    } else {
      console.log("receiptData:::::::",typeof(receiptData));
      let dataEdit;
      if(flag === 1)
      {
        dataEdit = {
          ...data1,
          receipt: receiptData,
        }
        setFlag(0);
      }
       else
       {
        dataEdit = data1;
       }
      dispatch(editTransaction({ userId, dataEdit }));
      navigate("/table");
    }
  };

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
            defaultValue={0}
            {...register("amount")}
          ></input>
          <p style={pTag}>{errors.amount?.message}</p>
        </div>

        <div className="form-group mt-2">
          <label>Receipt: </label>
          <div className="col-sm-18">
            {flag === 0 && <img ref={imageRef} src={formState.receipt} />}
            <img src={filed} />
            
            {/* {console.log(formState.receipt)} */}

            <input
              type="file"
              className="form-control-file"
              {...register("receipt")}
              onChange={handleReceipt}
            ></input>

            <p style={pTag}>{errors.receipt?.message}</p>
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
