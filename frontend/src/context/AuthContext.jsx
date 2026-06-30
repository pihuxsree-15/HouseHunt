import { createContext, useContext, useMemo, useState } from 'react';
import api from '../api/api.js';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('househunt_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const saveSession = ({ user: nextUser, token }) => {
    localStorage.setItem('househunt_token', token);
    localStorage.setItem('househunt_user', JSON.stringify(nextUser));
    setUser(nextUser);
  };

  const login = async (credentials) => {
    const { data } = await api.post('/auth/login', credentials);
    saveSession(data);
  };

  const register = async (payload) => {
    const { data } = await api.post('/auth/register', payload);
    saveSession(data);
  };

  const logout = () => {
    localStorage.removeItem('househunt_token');
    localStorage.removeItem('househunt_user');
    setUser(null);
  };

  const value = useMemo(() => ({ user, login, register, logout }), [user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
