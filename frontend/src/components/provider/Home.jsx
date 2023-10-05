import { useEffect } from "react"
import useAuthContext from "../../context/AuthContext"
import { useNavigate } from "react-router-dom";

const Home = () => {

  const { user, getUser } = useAuthContext();

  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      getUser();
    }
  }, []);

  return (
    <div>{ user?.firstname }</div>
  )
}

export default Home