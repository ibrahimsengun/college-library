import React, { useState } from "react";

const AuthContext = React.createContext({
  token: "",
  userId: "",
  isLoggedIn: false,

  login: (token) => {},
  logout: () => {},

  setId: (id) => {},
});

export const AuthContextProvider = (props) => {
  const initialToken = localStorage.getItem("token");
  const [token, setToken] = useState(initialToken);

  const [userId, setUserId] = useState(null);

  const userIsLoggedIn = !!token;

  const setIdHandler = (id) => {
    setUserId(id);
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
    userId: userId,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
    setId: setIdHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
