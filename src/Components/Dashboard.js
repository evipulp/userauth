import React from "react";
import MenuBar from "./MenuBar";
import SessionTracker from "../Charts/Components/SessionTracker";

const Dashboard = () => {
  return (
    <div>
      <MenuBar />
      <SessionTracker />
    </div>
  );
};

export default Dashboard;
