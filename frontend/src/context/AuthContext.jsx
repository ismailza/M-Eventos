import { createContext, useContext, useState } from "react";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const csrf = () => axios.get('/sanctum/csrf-cookie');
  
  const getUser = async () => {
    await csrf();
    try {
      const { data } = await axios.get('/api/provider/user');
      setUser(data);
    } catch (err) {
      console.log(err);
    }
  }

  const login = async ({ ...credentials }) => {
    await csrf();
    try {
      await axios.post('/api/provider/login', credentials);
      getUser();
      navigate('/provider');
    } catch (err) {
      console.log(err);
      setErrors(err.response.data.errors);
    }
  }

  const register = async ({ ...data }) => {
    await csrf();
    try {
      await axios.post('/api/provider/register', data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      navigate('/provider/login');
    } catch (err) {
      console.log(err);
      setErrors(err.response.data.errors);
    }
  }

  const logout = async () => {
    await csrf();
    try {
      await axios.post('/api/provider/logout');
      setUser(null);
      navigate('/provider/login');
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <AuthContext.Provider value={{ user, errors, login, register, logout, getUser }}>
      {children}
    </AuthContext.Provider>
  )
};

export default function useAuthContext() {
  return useContext(AuthContext);
}