import axios from "axios";
import React, { useContext, useRef, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import AuthContext from "../context/auth-context";

const LoginPage = () => {
  const emailRef = useRef();
  const passwordRef = useRef();

  const { login, setUser, user } = useContext(AuthContext);

  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  async function submitHandler(event) {
    event.preventDefault();

    setIsLoading(true);

    await axios
      .post(
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBpSorQlW3cjxpl4XkxDMxDzupWvDgEWX4",
        {
          email: emailRef.current.value,
          password: passwordRef.current.value,
          returnSecureToken: true,
        }
      )
      .then((res) => {
        axios
          .get(
            `https://college-library-83790-default-rtdb.europe-west1.firebasedatabase.app/users/${res.data.localId}.json?auth=${res.data.idToken}`
          )
          .then((response) => {
            login(res.data.idToken);

            if (response.data.isAdmin) navigate("/admin");
            else navigate("/home");
          });
      })
      .catch((error) => {
        const message = (
          <div className="ui negative message">
            <i
              className="close icon"
              onClick={() => {
                setErrorMessage(null);
              }}
            ></i>
            <div className="header">Login Error</div>
            <p>{error.response.data.error.message}</p>
          </div>
        );  
        setErrorMessage(message);
        setIsLoading(false);
      });
  }

  return (
    <div className="ui four column centered grid">
      <div className="column center aligned">
        <h1>Login</h1>
        <form className="ui large form" onSubmit={submitHandler}>
          <div className="ui stacked segment">
            <div className="field">
              <div className="ui left icon input">
                <i className="user icon"></i>
                <input
                  type="email"
                  name="email"
                  placeholder="E-Mail"
                  ref={emailRef}
                />
              </div>
            </div>
            <div className="field">
              <div className="ui left icon input">
                <i className="lock icon"></i>
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  ref={passwordRef}
                />
              </div>
            </div>
            {isLoading && (
              <div className="ui active inverted dimmer">
                <div className="ui text loader">Loading</div>
              </div>
            )}
            <button className="ui primary labeled icon button" type="submit">
              <i className="unlock alternate icon"></i>
              Login
            </button>
          </div>
        </form>
        <div className="ui message">
          New to us? <NavLink to="/register">Register</NavLink>
        </div>
        {errorMessage && errorMessage}
      </div>
    </div>
  );
};

export default LoginPage;
