import "./index.css";
import Form from "../src/Pages/Form/FormNew";
import "bootstrap/dist/css/bootstrap.min.css";
import TableMerge from "./Pages/Table/Main";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Registration from "./Pages/Login/Registration";
import Login from "./Pages/Login/Login";
import PrivateRouter from "./utils/PrivateRouters";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchData } from "./redux/Transaction";

export default function App() {
  const finance = {
    marginLeft: "35%",
    marginTop: "2%",
    marginBottom: "2%",
  };

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchData());
  });

  return (
    <div>
      <h1 style={finance}>Finance tracker</h1>

      <Router>
        <Routes>
          <Route element={<PrivateRouter />}>
            <Route element={<TableMerge />} path="/reg" />
            <Route element={<Form />} path="/form" />
          </Route>
          <Route element={<Login />} path="/" />
          <Route element={<Registration />} path="/login" />
        </Routes>
      </Router>
    </div>
  );
}
