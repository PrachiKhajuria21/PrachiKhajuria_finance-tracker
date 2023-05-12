import React,{ useContext} from "react";
import { userContext } from "./context";

export default function App()
{
   const context = useContext(userContext);
   return <p>hello {context?.name}</p>
}