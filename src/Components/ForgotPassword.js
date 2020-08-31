import React from "react";
import "./RorgotPassword.css";
import { Link, useHistory } from "react-router-dom";
import { useStateValue } from "../provider/StateProvider";
import { auth } from "../firebase";

const ForgotPassword = () => {
  let [state, dispatch] = useStateValue();
  const { rawForgotPassData } = state;
  const { email, emailHasBeenSent, errors } = rawForgotPassData;

  const handleChange = ({ target: { name, value } }) => {
    dispatch({
      type: "SET_FORGOTPASSWORD",
      payload: {
        ...rawForgotPassData,
        [name]: value,
      },
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (validationForm()) {
      auth
        .sendPasswordResetEmail(email)
        .then(() => {
          dispatch({
            type: "SET_FORGOTPASSWORD",
            payload: {
              ...rawForgotPassData,
              emailHasBeenSent: true,
            },
          });
          setTimeout(() => {
            dispatch({
              type: "SET_FORGOTPASSWORD",
              payload: {
                ...rawForgotPassData,
                emailHasBeenSent: false,
                errors: {},
              },
            });
          }, 10000);
        })
        .catch((e) => {
          dispatch({
            type: "SET_FORGOTPASSWORD",
            payload: {
              ...rawForgotPassData,
              errors: { notexist: "User Does not exist!" },
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
        error["email"] = "Please Enter valid email-ID";
      }
    }
    dispatch({
      type: "SET_FORGOTPASSWORD",
      payload: {
        ...rawForgotPassData,
        errors: { ...error },
      },
    });

    return formIsValid;
  };

  return (
    <div className="reset">
      <div className="reset_container">
        <h1>Forgot Password</h1>
        <form onSubmit={onSubmit}>
          {emailHasBeenSent && (
            <div>
              An email has been sent to you! follow the link to reset your
              password.
            </div>
          )}
          <label>
            Your Email
            <input
              name="email"
              value={rawForgotPassData.email || ""}
              onChange={handleChange}
              placeholder="Your email address..."
            />
            <div className="error-msg-f">{errors.email}</div>
            <div className="error-msg-f">{errors.notexist}</div>
          </label>
          <button className="reset_button">Reset Password</button>
        </form>
        <Link to="/" style={{ textDecoration: "none", marginTop: "5px" }}>
          Go to login page
        </Link>
      </div>
    </div>
  );
};

export default ForgotPassword;
