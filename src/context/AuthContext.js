import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SplashScreen } from "../views/components";

export const AuthContext = createContext();

const AuthContextProvider = (props) => {
  const [isLogin, setIsLogin] = useState(null);
  const [checkLogin, setCheckLogin] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkIfLogin = () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setIsLogin(false);
      } else {
        setIsLogin(true);
      }
    };
    checkIfLogin();
    const splashScreenTimeout = setTimeout(() => {
      setCheckLogin(false);
    }, 1000);

    return () => {
      clearTimeout(splashScreenTimeout);
    };
  }, []);

  const onLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const authData = {
    isLogin,
    setIsLogin,
    onLogout,
  };

  if (checkLogin) {
    return <SplashScreen />;
  }

  return (
    <AuthContext.Provider value={authData}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
