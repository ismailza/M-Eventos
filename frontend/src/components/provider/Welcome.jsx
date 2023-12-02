import { useEffect, useState } from "react";
import useAuthContext from "../../context/AuthContext";
import { Link } from "react-router-dom";

const Welcome = () => {

  const { user, index } = useAuthContext();

  const [currentDate, setCurrentDate] = useState(new Date())

  useEffect(() => {
    index();
    const intervalId = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);
    return () => clearInterval(intervalId);
  }, [])

  const storagePath = "http://localhost:8000/storage/"

  return (
    <div className="upper-left rounded-5 bg-black" style={{ maxHeight: '56px', padding: '0 10px', width: '320px' }}>
      <div className="d-flex justify-content-between align-items-center">
        <Link to={'/provider/profile'}>
          <img className="rounded-circle" src={storagePath + user?.photo} style={{ width: '40px', height: '40px' }} />
        </Link>
        <div className="text-section d-grid text-white">
          <span className="inline-block">
            <strong>Welcome, {user?.firstname + " " + user?.lastname}</strong>
          </span>
          <span className="inline-block">{currentDate.toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
}

export default Welcome;