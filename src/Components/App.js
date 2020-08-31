import React, { useEffect } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import ForgotPassword from "./ForgotPassword";
import Dashboard from "./Dashboard";
import { useStateValue } from "../provider/StateProvider";
import { auth } from "../firebase";

const App = () => {
  const [state, dispatch] = useStateValue();
  const { user } = state;
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        //the user is logged in
        dispatch({
          type: "SET_USER",
          user: authUser,
        });
      } else {
        //the user is logged out
        dispatch({
          type: "SET_USER",
          user: null,
        });
      }
    });

    return () => {
      //any cleanup go in here (unmounting)...
      unsubscribe();
    };
  }, []);

  return (
    <div>
      <BrowserRouter>
        <Route path="/" exact component={Login} />
        <Route path="/register" exact component={Register} />
        <Route path="/forgot" exact component={ForgotPassword} />
        <Route path="/dashboard" exact component={Dashboard} />
      </BrowserRouter>
    </div>
  );
};

export default App;
