import {Navigate, Outlet } from "react-router-dom";
import { Cookies } from "react-cookie";

const PrivateRouter = ()=>
{
    const cookies = new Cookies();
    let auth = cookies.get("tokenCookie")
    return (
        auth ? <Outlet/> : <Navigate to="/"/>
    )
    // if(auth)
    // {
    //   return  <Outlet/>
    // }
    // else
    // {
    //    return 
    // }
}

export default PrivateRouter;