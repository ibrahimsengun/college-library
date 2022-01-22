import React, { useState } from "react";

export const AuthContext = React.createContext({
  isLoggedIn: false,
  setLoginState: () => {},
});

const AuthContextProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const setLoginState = () => {
    setIsLoggedIn(!isLoggedIn);
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        setLoginState,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
