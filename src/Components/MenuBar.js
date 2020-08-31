import React from "react";
import "./MenuBar.css";
import { auth } from "../firebase";
import { useStateValue } from "../provider/StateProvider";
import { useHistory } from "react-router-dom";

const MenuBar = () => {
  const [state, dispatch] = useStateValue();
  const history = useHistory();

  const { user } = state;
  const logout = () => {
    if (user) {
      auth.signOut();
      history.push("/");
    }
  };

  return (
    <div>
      <nav className="menu-bar">
        <button className="d-button">Dashboard</button>
        <div style={{ marginLeft: 5, color: "white" }}>
          Congratulations!!
          <div style={{ marginLeft: 10, color: "white" }}>
            {auth?.currentUser ? user.displayName : ""}
          </div>
        </div>

        <button onClick={logout} className="l-button">
          Logout
        </button>
      </nav>
    </div>
  );
};

export default MenuBar;
