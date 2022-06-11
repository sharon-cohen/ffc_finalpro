import React, { useContext } from "react";
import { AuthContext } from "../App";
import { useNavigate } from "react-router-dom";

const useAuth = () => {
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);
  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    authContext.setIsAuthenticated(false);
    navigate("/auth/login");
  };
  return { ...authContext, logout };
};

export default useAuth;
