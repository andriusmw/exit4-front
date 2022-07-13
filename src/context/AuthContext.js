
import { createContext, useEffect } from "react";
import { useState } from "react";
import { getMyUserDataService } from "../services";

export const AuthContext = createContext();

export const AuthProviderComponent = ({ children }) => {
  //console.log(localStorage.getItem("token"))
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState(null);
  // const [emailAuth, setEmailAuth] = useState(null);

  useEffect(() => {
    localStorage.setItem("token", token);
  }, [token]);
  //Cada vez que cambia el token se guarda en localStorage

  //espacio para funcion del get user por token
  useEffect(() => {
    const getUserData = async () => {
      try {
        const data = await getMyUserDataService(token);
        //conseguir acceso a email
        //console.log("authcontext")
        //console.log(emailAuth)
        console.log(data);
        console.log(data.role);
        setUser(data);
      } catch (error) {
        console.log("logout por error");
        logout();
      }
    };

    if (token) {
      getUserData();
    }
  }, [token]);

  const login = (token) => {
    setToken(token);
  };

  const logout = () => {
    setToken("");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ token, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

