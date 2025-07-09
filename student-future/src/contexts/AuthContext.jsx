import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../api/axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [userType, setUserType] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedUser  = localStorage.getItem('user');
    const storedUser Type = localStorage.getItem('userType');

    if (token && storedUser  && storedUser Type) {
      setIsAuthenticated(true);
      setUser(JSON.parse(storedUser ));
      setUserType(storedUser Type);
      api.defaults.headers.common['Authorization'] = `Token ${token}`;
    }
  }, []);

  const login = async (email, password, userType) => {
    try {
      const response = await api.post('/api/auth/login/', {
        email,
        password,
        user_type: userType
      });

      const { token, user_id, user_type } = response.data;

      const userResponse = await api.get(`/api/users/${user_id}/`);
      const userData = userResponse.data;

      localStorage.setItem('token', token);
      localStorage.setItem('userType', user_type);
      localStorage.setItem('user', JSON.stringify(userData));

      setIsAuthenticated(true);
      setUser(userData);
      setUserType(user_type);
      api.defaults.headers.common['Authorization'] = `Token ${token}`;

    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userType');
    localStorage.removeItem('user');

    setIsAuthenticated(false);
    setUser(null);
    setUserType(null);
    delete api.defaults.headers.common['Authorization'];
  };

  const value = {
    isAuthenticated,
    user,
    userType,
    login,
    logout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};