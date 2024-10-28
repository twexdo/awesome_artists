import React, { createContext, useContext, useEffect, useState } from 'react';
import { login, logout, getProfile, register } from '../api/auth';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

interface AuthContextType {
  user: any;
  loginUser: (email: string, password: string) => Promise<void>;
  logoutUser: () => Promise<void>;
  registerUser: (email: string, password: string, name:string) => Promise<void>;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<any> = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const access_token = localStorage.getItem('jwt'); // Get the JWT from localStorage
    if (access_token) {
      const fetchProfile = async () => {
        try {
          const profile = await getProfile(); // Assuming this method checks the access_token
          setUser(profile);
        } catch {
          setUser(null);
        }
      };
      fetchProfile();
    }
  }, []);

 

  const loginUser = async (email: string, password: string) => {
    const userData = await login(email, password);
    localStorage.setItem('jwt', userData.access_token);
    setCookie("jwt",userData.access_token,7)
    // Store the access_token in localStorage
    setUser(userData.user);
    toast("Welcome Back!")
  };
  const registerUser = async (email: string, password: string, name:string) => {
    try{
      const userData = await register(email, password,name);
      localStorage.setItem('jwt', userData.access_token);
      setCookie("jwt",userData.access_token,7)
      // Store the access_token in localStorage
      setUser(userData.user);
    }catch(_){
      alert("there was an error")
    }
  };

  const logoutUser = async () => {
    await logout();
    localStorage.removeItem('jwt'); 
    deleteCookie("jwt")
    setUser(null);
  };

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider value={{ user, loginUser, logoutUser, registerUser, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

const setCookie = (name:string, value:any, days:number=7) => {
  let expires = '';
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000)); // Convert days to milliseconds
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "") + expires + "; path=/"; // Path sets where the cookie is accessible
};
const deleteCookie = (name: string) => {
  document.cookie = name + '=; Max-Age=0; path=/'; // Set Max-Age to 0 to delete the cookie
};

export const useAuth = () => useContext(AuthContext) as AuthContextType;
