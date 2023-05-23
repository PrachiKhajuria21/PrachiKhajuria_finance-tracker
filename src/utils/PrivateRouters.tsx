import { Navigate, Outlet } from "react-router-dom";
import { Cookies } from "react-cookie";

const PrivateRouter: React.FC = () => {
    const cookies = new Cookies();
    let auth = cookies.get("tokenCookie")

    
    return (
        auth ? <Outlet/> : <Navigate to="/logged"/>
    )
   
    
}

export default PrivateRouter;