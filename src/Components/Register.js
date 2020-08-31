import React from "react";
import moment from "moment";
import "./Register.css";
import { Link, useHistory } from "react-router-dom";
import { useStateValue } from "../provider/StateProvider";
import { auth } from "../firebase";

const Register = () => {
  const history = useHistory();
  let [state, dispatch] = useStateValue();
  const { rawRegisterData } = state;
  const { name, email, phone, dob, password, errors } = rawRegisterData;

  const handleChange = ({ target: { name, value } }) => {
    dispatch({
      type: "SET_REGISTERDATA",
      payload: {
        ...rawRegisterData,
        [name]: value,
      },
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (validationForm()) {
      auth
        .createUserWithEmailAndPassword(email, password)
        .then((res) => {
          res.user
            .updateProfile({
              displayName: name,
              phoneNumber: phone,
              date_of_birth: dob,
            })
            .then((res) => {
              history.push("/dashboard");
            });
        })
        .catch((e) => {
          alert(e.message);
        });
    }
  };

  const validationForm = () => {
    let error = {};
    let formIsValid = true;

    if (!name) {
      formIsValid = false;
      error["name"] = "Please enter your username";
    }

    if (typeof name !== "undefined") {
      if (!name.match(/^[a-zA-Z ]*$/)) {
        formIsValid = false;
        error["name"] = "Please Enter Alphabet Chracters Only";
      }
    }

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
    if (!phone) {
      formIsValid = false;
      error["phone"] = "Please enter your mobile number";
    }

    if (typeof phone !== "undefined") {
      if (!phone.match(/^[0-9]{10}$/)) {
        formIsValid = false;
        error["phone"] = "Please enter valid mobile number";
      }
    }
    if (!dob) {
      formIsValid = false;
      error["dob"] = "Please enter your date of birth";
    }
    if (typeof dob !== "undefined") {
      let data = dob.split("/");
      // using ISO 8601 Date String
      if (isNaN(Date.parse(data[2] + "-" + data[1] + "-" + data[0]))) {
        formIsValid = false;
        error["dob"] = "Invalid date of birth";
      } else if (
        moment(dob).format("dd/mm/yyyy") >
        moment(new Date()).format("dd/mm/yyyy")
      ) {
        formIsValid = false;
        error["dob"] = "User can not select future date.";
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
      type: "SET_REGISTERDATA",
      payload: {
        ...rawRegisterData,
        errors: { ...error },
      },
    });
    return formIsValid;
  };

  return (
    <div className="login">
      <div className="signup_container">
        <h1>Create account</h1>
        <form onSubmit={onSubmit}>
          <label>
            Name
            <input
              name="name"
              value={rawRegisterData.name || ""}
              onChange={handleChange}
              type="text"
              placeholder="Your name..."
            />
            <span className="errorMsg">{errors.name}</span>
          </label>

          <label>
            Email
            <input
              name="email"
              value={rawRegisterData.email || ""}
              onChange={handleChange}
              type="email"
              placeholder="Email address..."
            />
            <div className="errorMsg">{errors.email}</div>
          </label>

          <label>
            Contact
            <input
              name="phone"
              value={rawRegisterData.phone || ""}
              onChange={handleChange}
              type="tel"
              placeholder="Contact number..."
            />
            <div className="errorMsg">{errors.phone}</div>
          </label>

          <label>
            Date of Birth
            <input
              name="dob"
              onChange={handleChange}
              value={rawRegisterData.dob || ""}
              type="date"
            />
            <div className="errorMsg">{errors.dob}</div>
          </label>

          <label>
            Password
            <input
              name="password"
              value={rawRegisterData.password || ""}
              onChange={handleChange}
              type="password"
              placeholder="password..."
            />
            <div className="errorMsg">{errors.password}</div>
          </label>

          <button type="submit" className="signup_button">
            SIGN UP
          </button>
        </form>
        <Link to="/" style={{ textDecoration: "none", marginTop: "5px" }}>
          Already have an account? Sign in
        </Link>
      </div>
    </div>
  );
};

export default Register;
