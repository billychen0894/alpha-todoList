import { signup, login } from 'api/auth';
import { checkPermission } from 'api/auth';
import { useEffect } from 'react';
import { useContext, useState } from 'react';
import { useLocation } from 'react-router-dom';
import * as jwt from 'jsonwebtoken';

const { createContext } = require('react');

const defaultAuthContext = {
  isAuthenticated: false,
  currentMember: null,
  register: () => {},
  login: () => {},
  logout: () => {},
};
const AuthContext = createContext(defaultAuthContext);

export const useAuth = () => useContext(AuthContext);
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [payload, setPayload] = useState(null);
  const { pathname } = useLocation();

  useEffect(() => {
    const checkTokenIsValid = async () => {
      const authToken = localStorage.getItem('authToken');

      if (!authToken) {
        setIsAuthenticated(false);
        setPayload(null);
        return;
      }

      const isAuthorized = await checkPermission(authToken);

      if (isAuthorized) {
        setIsAuthenticated(true);
        const tempPayload = jwt.decode(authToken);
        setPayload(tempPayload);
      } else {
        setIsAuthenticated(false);
        setPayload(null);
      }
    };
    checkTokenIsValid();
  }, [pathname]);

  const registerHandler = async (data) => {
    const { success, authToken } = await signup({
      username: data.username,
      email: data.email,
      password: data.password,
    });

    const tempPayload = jwt.decode(authToken);

    if (tempPayload) {
      setPayload(tempPayload);
      setIsAuthenticated(true);
      localStorage.setItem('authToken', authToken);
    } else {
      setIsAuthenticated(false);
      setPayload(null);
    }
    return success;
  };

  const loginHandler = async (data) => {
    const { success, authToken } = await login({
      username: data.username,
      password: data.password,
    });

    const tempPayload = jwt.decode(authToken);

    if (tempPayload) {
      setPayload(tempPayload);
      setIsAuthenticated(true);
      localStorage.setItem('authToken', authToken);
    } else {
      setIsAuthenticated(false);
      setPayload(null);
    }
    return success;
  };

  const logoutHandler = async () => {
    localStorage.removeItem('authToken');
    setPayload(null);
    setIsAuthenticated(false);
  };

  const authContext = {
    isAuthenticated,
    currentMember: payload && { id: payload.sub, name: payload.name },
    register: registerHandler,
    login: loginHandler,
    logout: logoutHandler,
  };
  return (
    <AuthContext.Provider value={authContext}>{children}</AuthContext.Provider>
  );
};
