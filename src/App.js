import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import FormData from "./component/FormData";
import TableMerge from "./component/Main";
import Login from "./component/Login";
import "./index.css";
import Registration from "./component/Registration";
import PrivateRouter from "./utils/PrivateRouters";
import ErrorBoundary from "./component/ErrorBoundary";
import React, { Component } from "react";

export default function App() {
  const finance = {
    marginLeft: "35%",
    marginTop: "2%",
    marginBottom: "2%",
  };

  return (
    // <div>
    //

    //     <Router>
    //       <Routes>
    //         {/* <Route exact path="/form" index element={<FormData />}></Route> */}
    //         <Route
    //           exact
    //           path="/form"
    //           index
    //           element={tokenDemo === null ? <Login /> : <FormData />}
    //         ></Route>
    //         {/* <Route
    //           exact
    //           path="/tabledata"
    //           element={
    //             tokenDemo === null ? <Login /> : <Navigate replace to={"/"} />
    //           }
    //         ></Route> */}
    //         {/* <Route exact path="/table" element={<TableMerge/>}></Route> */}
    //         <Route
    //           exact
    //           path="/table"
    //           element={tokenDemo === null ? <Login /> : <TableMerge />}
    //         ></Route>

    //         <Route

    //         path="/" element={<Login />}></Route>
    //         {/* <Route path="/table" element={<TableMerge />}></Route> */}

    //         <Route
    //         exact
    //         path="/reg"
    //         element={tokenDemo === null ? <Registration /> : <TableMerge />}
    //         // path="/reg" element={<Registration />}
    //         ></Route>
    //       </Routes>
    //     </Router>

    // </div>

    <div>
      <h1 style={finance}>Finance tracker</h1>
      <ErrorBoundary>
        <Router>
          <Routes>
            <Route element={<PrivateRouter />}>
              <Route element={<TableMerge />} path="/table" exact />
              <Route element={<FormData />} path="/form" />
            </Route>
            <Route element={<Login />} path="/" exact />
            <Route element={<Registration />} path="/reg" />
          </Routes>
        </Router>
      </ErrorBoundary>
    </div>
  );
}
