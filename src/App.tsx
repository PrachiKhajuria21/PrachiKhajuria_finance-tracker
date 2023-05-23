import React, { useState } from "react";
import "./App.css";
import Form from "../src/Pages/Form/FormNew";
import "bootstrap/dist/css/bootstrap.min.css";
import TableMerge from "./Pages/Table/Main";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Registration from "./Pages/Login/Registration";
import Login from "./Pages/Login/Login";

const App: React.FC = () => {
  // const [toDo,setToDo]=useState<string>("");

  return (
    <div className="App">
      <h3>Finance Tracker</h3>
      {/* <Form todo = { toDo} setTodo = {setToDo}/> */}
      <Router>
        <Routes>
          <Route element={<Form />} path="/" />
          <Route element={<TableMerge />} path="/reg" />
          <Route element={<Registration/>} path="/login" />
          <Route element={<Login/>} path="/logged" />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
