import axios from "axios";
import React, { useContext, useRef, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import AuthContext from "../context/auth-context";

const LoginForm = () => {
  const emailRef = useRef();
  const passwordRef = useRef();

  const authContext = useContext(AuthContext);

  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);

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
        console.log(res);
        setIsLoading(false);

        authContext.login(res.data.idToken);
        navigate("/library");
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }

  return (
    <div className="login">
      <div className="ui middle aligned center aligned grid">
        <div className="column">
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
            New to us? <NavLink to="/register">Regsiter</NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
