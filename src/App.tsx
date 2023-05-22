import React, { useState } from "react";
import "./App.css";
import Form from "./pages/FormNew";
import "bootstrap/dist/css/bootstrap.min.css";

const App:React.FC = () => {

  // const [toDo,setToDo]=useState<string>("");

  return(



  <div className="App">
    <h1>Hello World</h1>
    {/* <Form todo = { toDo} setTodo = {setToDo}/> */}
    <Form/>
    </div>
  );
}

export default App;
