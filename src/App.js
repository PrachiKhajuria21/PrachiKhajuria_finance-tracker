import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link,Navigate } from "react-router-dom";
// import FormData from "./FormData";
// import TableData from "./TableData"
import TableData from "./component/TableData";
import FormData from "./component/FormData";
import TableMerge from "./component/main";
import Login from "./component/login";
import "./index.css"
import Registration from "./component/registration";

export default function App() {
   const tokenDemo =  localStorage.getItem("Token");

   console.log("tokenDemo::::::::::::",tokenDemo);

   const finance = {
    marginLeft:"35%",
    marginTop:"2%",
    marginBottom:"2%"
   }
   


  return (
    <div>
      <h1 style={finance}>Finance tracker</h1>
     <Router>
      <Routes>
        {/* <Route exact path="/form" index element={<FormData />}></Route> */}
        <Route exact path="/form" index element={(tokenDemo === null) ? <Login /> : <FormData />}></Route>
        <Route exact path="/tabledata" element={(tokenDemo === null) ? <Login /> : <Navigate replace to={"/"} />}></Route>
        {/* <Route exact path="/table" element={<TableMerge/>}></Route> */}
        <Route exact path="/table" element={(tokenDemo === null) ? <Login /> : <TableMerge />}></Route>

        <Route path="/" element={<Login/>}></Route>
        <Route path="/reg" element={<Registration/>}></Route>
      </Routes>
    </Router>
    </div>
    
  );
}
