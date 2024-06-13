import { jwtDecode } from "jwt-decode";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../features/auth/authSlice";

interface AuthProviderProps {
  children: React.ReactNode;
}

interface DecodedToken {
  exp: number;
  user: string; // Ajusta este tipo según tu payload JWT
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decodedToken = jwtDecode<DecodedToken>(token);
        if (decodedToken.exp && decodedToken.exp * 1000 > Date.now()) {
          dispatch(login(decodedToken.user)); // Assuming the decoded token has a user object
        } else {
          localStorage.removeItem("token");
          navigate("/login");
        }
      } catch (error) {
        console.error("Invalid token:", error);
        localStorage.removeItem("token");
        navigate("/login");
      }
    } else {
      navigate("/login");
    }
  }, [dispatch, navigate]);

  return <>{children}</>;
};

export default AuthProvider;
