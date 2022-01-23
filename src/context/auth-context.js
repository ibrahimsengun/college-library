import React, { useState } from "react";

const AuthContext = React.createContext({
  token: "",
  isLoggedIn: false,
  user: {},

  login: (token) => {},
  logout: () => {},
  setUser: () => {},
});

export const AuthContextProvider = (props) => {
  const initialToken = localStorage.getItem("token");
  const [token, setToken] = useState(initialToken);

  const [userData, setUserData] = useState(null);

  const userIsLoggedIn = !!token;

  const setUserHandler = (user) => {
    setUserData(user);
  };

  const loginHandler = (token) => {
    setToken(token);

    localStorage.setItem("token", token);
  };
  const logoutHandler = () => {
    setToken(null);

    localStorage.removeItem("token");
  };

  const contextValue = {
    token: token,
    isLoggedIn: userIsLoggedIn,
    user: userData,
    login: loginHandler,
    logout: logoutHandler,
    setUser: setUserHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
