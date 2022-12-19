import React from "react";
import AppBar from "./components/AppBar";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <div>
      <AppBar></AppBar>
      <Outlet/>
    </div>
  );
}

export default App;
