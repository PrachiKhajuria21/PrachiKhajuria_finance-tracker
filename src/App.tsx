import React, { useState } from "react";
import "./App.css";
import Form from "../src/Pages/Form/FormNew";
import "bootstrap/dist/css/bootstrap.min.css";
import TableMerge from "./Pages/Table/Main";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

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
        </Routes>
      </Router>
    </div>
  );
};

export default App;
