import { ErrorResponse } from "@remix-run/router";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store";
import { addUser } from "../../redux/UserLogin";
import { ErrorType, UserStateType } from "../../model";


const Registration: React.FC = () => {
  const dispatch = useDispatch();

  const INITIAL_STATE: UserStateType = {
    namee: "",
    userName: "",
    email: "",
    password: "",
  };

  const [loginData, setLoginData] = useState(INITIAL_STATE);
  console.log("loginData", loginData);
  const handleValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const localData = useSelector(
    (state: RootState) => state.userLoginInfo.value
  );

  const emailArray: string[] = [];
  let i;
  for (i = 0; i < localData.length; i++) {
    emailArray.push(localData[i].email);
  }

  let error: ErrorType = { namee: "", userName: "", email: "", password: "" };
  const navigate = useNavigate();
  const [validation, setValidation] = useState<UserStateType>();
  const validate = (value: UserStateType) => {
    if (!value.namee) {
      error.namee = "Name is required";
    }
    if (!value.userName) {
      error.userName = "UserName is required";
    }
    const regex = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/;
    const email1 = regex.test(value.email);

    if (!value.email || !email1) {
      error.email = "Please enter valid email";
    } else if (emailArray.includes(value.email)) {
      error.email = "Email already exist";
    }

    const regex1 = /((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{6,20})/;
    console.log("password", value);
    const pass1 = regex1.test(value.password as string);
    if (!value.password || !pass1) {
      error.password = "Please enter valid password";
    }

    return error;
  };

  const myvariable = {
    color: "red",
    marginLeft: "5%",
    fontWeight: "bold",
  };
  const userRegister = {
    color: "blue",
    marginLeft: "40%",
  };
  const userForm = {
    marginLeft: "35%",
    marginTop: "2%",
  };
  const btn1 = {
    color: "white",
    marginLeft: "15%",
    backgroundColor: "green",
    border: "1px solid green",
    fontWeight: "bold",
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const errFunc: any = validate(loginData);
    setValidation(errFunc);

    const errorLength = Object.values(errFunc).filter((item) => item !== "");

    if (errorLength.length === 0) {
      dispatch(addUser(loginData));

      navigate("/");
    }
  };

  return (
    <div>
      <div style={userRegister}>
        <h1>Register</h1>
      </div>

      <form onSubmit={handleSubmit} style={userForm}>
        <div className="form-group mt-2">
          <label>Name: </label>
          <input type="text" name="namee" onChange={handleValue} />
          <p style={myvariable}>{validation?.namee}</p>
        </div>
        <div className="form-group mt-2">
          <label>UserName: </label>
          <input type="text" name="userName" onChange={handleValue} />
          <p style={myvariable}>{validation?.userName}</p>
        </div>
        <div className="form-group mt-2">
          <label>Email: </label>
          <input type="text" name="email" onChange={handleValue} />
        </div>
        <p style={myvariable}>{validation?.email}</p>
        <div className="form-group mt-2">
          <label>Password: </label>
          <input type="password" name="password" onChange={handleValue} />
          <p style={myvariable}>{validation?.password}</p>
        </div>
        <button type="submit" style={btn1}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default Registration;
