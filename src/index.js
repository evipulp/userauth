import React from "react";
import ReactDOM from "react-dom";
import App from "./Components/App";
import { StateProvider } from "./provider/StateProvider";
import Reducer, { initialState } from "./provider/Reducer";

ReactDOM.render(
  <React.StrictMode>
    <StateProvider initialState={initialState} reducer={Reducer}>
      <App />
    </StateProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
