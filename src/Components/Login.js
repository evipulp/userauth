import React from "react";
import "./Login.css";
import { Link, useHistory } from "react-router-dom";
import { useStateValue } from "../provider/StateProvider";
import { auth } from "../firebase";

const Login = () => {
  const history = useHistory();
  let [state, dispatch] = useStateValue();
  const { rawLoginData } = state;
  const { email, password, errors } = rawLoginData;

  const handleChange = ({ target: { name, value } }) => {
    dispatch({
      type: "SET_LOGINDATA",
      payload: {
        ...rawLoginData,
        [name]: value,
      },
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (validationForm()) {
      auth
        .signInWithEmailAndPassword(email, password)
        .then((auth) => {
          history.push("/dashboard");
        })
        .catch((e) => {
          dispatch({
            type: "SET_LOGINDATA",
            payload: {
              ...rawLoginData,
              errors: { ...{ invalid: "Invalid user name or password!" } },
            },
          });
        });
    }
  };

  const validationForm = () => {
    let error = {};
    let formIsValid = true;

    if (!email) {
      formIsValid = false;
      error["email"] = "Please enter your email-ID";
    }

    if (typeof email !== "undefined") {
      let pattern = new RegExp(
        /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
      );
      if (!pattern.test(email)) {
        formIsValid = false;
        error["email"] = "Please enter valid email-ID";
      }
    }

    if (!password) {
      formIsValid = false;
      error["password"] = "Please enter your password";
    }

    if (typeof password !== "undefined") {
      if (
        !password.match(
          /^.*(?=.{8,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%&]).*$/
        )
      ) {
        formIsValid = false;
        error["password"] = "Please Enter A Strong Password";
      }
    }

    dispatch({
      type: "SET_LOGINDATA",
      payload: {
        ...rawLoginData,
        errors: { ...error },
      },
    });
    return formIsValid;
  };

  return (
    <div className="login">
      <div className="login_container">
        <h1>Sign in</h1>
        <form onSubmit={onSubmit}>
          <label>
            Email
            <input
              name="email"
              value={rawLoginData.email || ""}
              onChange={handleChange}
              type="email"
              placeholder="Email address..."
            />
            <span className="error-msg-l">{errors.email}</span>
          </label>
          <label>
            Password
            <input
              name="password"
              value={rawLoginData.password || ""}
              onChange={handleChange}
              type="password"
              placeholder="password..."
            />
            <span className="error-msg-l">{errors.password}</span>
          </label>
          <button type="submit" className="signin_button">
            SIGN IN
          </button>
          <div className="error-msg-l">{errors.invalid}</div>
        </form>
        <Link to="/forgot" style={{ textDecoration: "none", marginTop: "5px" }}>
          Forgot Password?
        </Link>
        <Link
          to="/register"
          style={{ textDecoration: "none", marginTop: "5px" }}
        >
          Don't have an account? Register!
        </Link>
      </div>
    </div>
  );
};

export default Login;
