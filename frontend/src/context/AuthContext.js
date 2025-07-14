import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const navigate = useNavigate();

  const register = async (formData) => {
    try {
      const res = await axios.post('http://localhost:5000/api/auth/register', formData);
      setToken(res.data.token);
      localStorage.setItem('token', res.data.token);
      await loadUser();
      navigate('/login');
    } catch (err) {
      console.error(err.response.data);
      throw err;
    }
  };

  const login = async (formData) => {
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', formData);
      console.log(res);
      setToken(res.data.token);
      localStorage.setItem('token', res.data.token);
      await loadUser();
      navigate('/dashboard');
    } catch (err) {
      console.error(err.response.data);
      throw err;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
    navigate('/login');
  };

  const loadUser = async () => {
    if (token) {
      axios.defaults.headers.common['x-auth-token'] = token;
      try {
        const res = await axios.get('http://localhost:5000/api/auth/user');
        setUser(res.data);
      } catch (err) {
        console.error(err.response.data);
        localStorage.removeItem('token');
        setToken(null);
        setUser(null);
      }
    }
  };

  useEffect(() => {
    if (token) {
      loadUser();
    } else {
      delete axios.defaults.headers.common['x-auth-token'];
    }
  }, [token]);

  return (
    <AuthContext.Provider value={{ user, token, register, login, logout, loadUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);