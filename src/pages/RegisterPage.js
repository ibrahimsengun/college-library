import axios from "axios";
import React, { useRef, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const nameRef = useRef();

  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [checkState, setCheckState] = useState(false);

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
      .then((response) => {
        console.log(response);

        axios
          .put(
            `https://college-library-83790-default-rtdb.europe-west1.firebasedatabase.app/users/${response.data.localId}.json?auth=${response.data.idToken}`,
            {
              id: response.data.localId,
              name: nameRef.current.value,
              email: emailRef.current.value,
              isAdmin: checkState,
            }
          )
          .then((res) => {
            navigate("/login");
            setIsLoading(false);
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
        console.log(error.response.data);
        setErrorMessage(message);
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
                    type="text"
                    name="name"
                    placeholder="Name and Surname"
                    ref={nameRef}
                  />
                </div>
              </div>

              <div className="field">
                <div className="ui left icon input">
                  <i className="envelope icon"></i>
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
                  <i className="user icon"></i>
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    ref={passwordRef}
                  />
                </div>
              </div>

              <div className="field">
                <div className="ui checkbox">
                  <input
                    type="checkbox"
                    name="example"
                    checked={checkState}
                    onChange={() => {
                      setCheckState(!checkState);
                    }}
                  />
                  <label>Is this user admin?</label>
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
          {errorMessage && errorMessage}
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
