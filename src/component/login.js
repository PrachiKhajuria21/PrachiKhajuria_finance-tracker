import { ErrorResponse } from "@remix-run/router";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const userLoginData = JSON.parse(localStorage.getItem("Login"));
  // console.log("userLoginData",typeof(userLoginData))

  const INITIAL_STATE = {
    email: "",
    password: "",
  };

  const [loginData, setLoginData] = useState(INITIAL_STATE);

  // console.log("emailData::::",loginData)
  const emailArray = [];
  let i;
  for (i = 0; i < userLoginData.length; i++) {
    emailArray.push(userLoginData[i].email);
  }

  // console.log("emailArray:::::: ",emailArray)
  let error = {};
  const [validation, setValidation] = useState({});
  const handleValue = (e) => {
    
      validation[e.target.name] = "";
    
    console.log({ validation }, e.target.name);
    setLoginData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const validate = (value) => {
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
      // console.log("userData::::", userData.password);
      const pass1 = userData.password;
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
    // console.log("stringTokebn:::::",randomToken);
    return randomToken;
  };
  const [tokenGenerate, setTokenGenerate] = useState(userToken());
  // console.log("Token::::::::::",tokenGenerate)

  const handleSubmit = (e) => {
    console.log("Insideeeeeeee");
    const errFunc = validate(loginData);

    setValidation(errFunc);

    const errorLength = Object.values(errFunc).filter((item) => item !== "");
    // console.log("error length", errorLength.length);

    if (errorLength.length === 0) {
      // console.log("errorrrrrrr not occured");
      localStorage.setItem("Token", tokenGenerate);
      navigate("/table");
    } else {
      e.preventDefault();
      console.log("errFunc");
    }
  };

  const handleRegister = () => {
    navigate("/reg");
  };

  // const dataLocal = localStorage.getItem("token")

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
    // marginLeft:"10%",
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
        {console.log("....", validation)}
        <p style={myvariable}>{validation.email}</p>
        <div className="form-group mt-2">
          <label>Password: </label>
          <input type="password" name="password" onChange={handleValue} />
          <p style={myvariable}>{validation.password}</p>
        </div>
        <button style={btn1}>SignIn</button>
        <button type="submit" style={btn2} onClick={handleRegister}>
          SignUp
        </button>
      </form>
    </div>
  );
}
