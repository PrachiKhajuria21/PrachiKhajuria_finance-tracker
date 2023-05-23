import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { ErrorLoginType, UserStateLoginType } from "../../model";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const userLoginData = useSelector((state:RootState) => state.userLoginInfo.value);

  const INITIAL_STATE:UserStateLoginType = {
    email: "",
    password: "",
  };

  const [loginData, setLoginData] = useState(INITIAL_STATE);

  const emailArray:string[] = [];
  let i;
  for (i = 0; i < userLoginData.length; i++) {
    emailArray.push(userLoginData[i].email);
  }

  let error: ErrorLoginType = { email: "", password: "" };
  const [validation, setValidation] = useState<UserStateLoginType>();
  const handleValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    // validation[e.target.name] = "";
    setLoginData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const validate = (value:UserStateLoginType) => {
    if (!value.email) {
      error.email = "email required";
    } else if (!emailArray.includes(value.email)) {
      error.email = "register yourself first";
    }

    if (!value.password) {
      error.password = "password required";
    }
    if (emailArray.includes(value.email)) {
      const userData = userLoginData.find(({ email }) => email === value.email);
      const pass1 = userData?.password;
      if (value.password !== pass1) {
        error.password = "Incorrect password";
      }
    }

    return error;
  };

  var randomToken = "";
  const userToken = () => {
    const token = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    const tokenLength = 16;

    var i;

    for (i = 0; i < tokenLength; i++) {
      randomToken += token.charAt(Math.floor(Math.random() * token.length));
    }

    return randomToken;
  };
  const [tokenGenerate] = useState(userToken());

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const errFunc = validate(loginData);

    setValidation(errFunc);

    const errorLength = Object.values(errFunc).filter((item) => item !== "");

    if (errorLength.length === 0) {
      var now = new Date();
      var time = now.getTime();
      // time += 60 * 1000;  1min
      time += 3600 * 1000;
      now.setTime(time);
      document.cookie = `tokenCookie=${tokenGenerate};expires=${now.toUTCString()};path=/`;
      navigate("/reg");
    }
    // else {
    //   e.preventDefault();
    // }
  };

  const handleRegister = () => {
    navigate("/reg");
  };

  const myvariable = {
    color: "red",
    marginLeft: "5%",
    fontWeight: "bold",
  };
  const userLogin = {
    color: "blue",
    marginLeft: "40%",
  };
  const userForm = {
    marginLeft: "35%",
    marginTop: "2%",
  };
  const btn2 = {
    color: "white",
    marginLeft: "20%",
    backgroundColor: "red",
    border: "1px solid red",
    fontWeight: "bold",
  };

  const btn1 = {
    color: "white",
    backgroundColor: "green",
    border: "1px solid green",
    fontWeight: "bold",
  };

  return (
    <div>
      <h2 style={userLogin}>Login Page</h2>
      <form onSubmit={handleSubmit} style={userForm}>
        <div className="form-group mt-2">
          <label>Email: </label>
          <input type="text" name="email" onChange={handleValue} />
        </div>
        {/* {console.log("....", validation)} */}
        <p style={myvariable}>{validation?.email}</p>
        <div className="form-group mt-2">
          <label>Password: </label>
          <input type="password" name="password" onChange={handleValue} />
          <p style={myvariable}>{validation?.password}</p>
        </div>
        <button style={btn1}>SignIn</button>
        <button type="submit" style={btn2} onClick={handleRegister}>
          SignUp
        </button>
      </form>
    </div>
  );
}


export default Login;