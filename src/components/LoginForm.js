import React, { useContext, useRef } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../context/auth-context";

const LoginForm = () => {
  const emailRef = useRef();
  const passwordRef = useRef();

  const { isLoggedIn, setLoginState } = useContext(AuthContext);

  const submitHandler = (event) => {
    event.preventDefault();

    const user = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    setLoginState();
  };

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
              <button className="ui primary labeled icon button" type="submit">
                <i className="unlock alternate icon"></i>
                Login
              </button>
            </div>
          </form>
          <div class="ui message">
            New to us? <NavLink to="/register">Regsiter</NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
