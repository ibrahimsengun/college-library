import axios from "axios";
import React, { useRef, useState } from "react";
import { NavLink } from "react-router-dom";

const RegisterForm = () => {
  const emailRef = useRef();
  const passwordRef = useRef();

  const [isLoading, setIsLoading] = useState(false);

  async function submitHandler(event) {
    event.preventDefault();

    setIsLoading(true);

    await axios
      .post(
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBpSorQlW3cjxpl4XkxDMxDzupWvDgEWX4",
        {
          email: emailRef.current.value,
          password: passwordRef.current.value,
          returnSecureToken: true,
        }
      )
      .then(function (response) {
        console.log(response);
        setIsLoading(false);
      })
      .catch(function (error) {
        console.log(error);
        setIsLoading(false);
      });
  }

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
              {isLoading && (
                <div className="ui active inverted dimmer">
                  <div className="ui text loader">Loading</div>
                </div>
              )}
              <button className="ui primary labeled icon button" type="submit">
                <i className="unlock alternate icon"></i>
                Register
              </button>
            </div>
          </form>
          <div className="ui message">
            Already register? <NavLink to="/login">Login</NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
