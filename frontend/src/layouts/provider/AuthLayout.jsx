import { Navigate, Outlet } from "react-router-dom";
import useAuthContext from "../../context/AuthContext"


const AuthLayout = () => {
  
  const { user } = useAuthContext()
  
  return user ? <Outlet /> : <Navigate to="/provider/login" />
}

export default AuthLayout