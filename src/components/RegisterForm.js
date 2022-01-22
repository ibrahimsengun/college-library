import React, { useRef } from "react";
import { NavLink } from "react-router-dom";

const RegisterForm = () => {
  const emailRef = useRef();
  const passwordRef = useRef();

  const submitHandler = (event) => {
    event.preventDefault();

    const user = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };
    console.log(user);
  };

  return (
    <div className="login">
      <div className="ui middle aligned center aligned grid">
        <div className="column">
          <h1>Register</h1>
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
                Register
              </button>
            </div>
          </form>
          <div class="ui message">
            Already register? <NavLink to="/login">Login</NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
