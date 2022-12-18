import React, { useEffect } from "react";
import { useState } from "react";
import AppBar from "./components/AppBar";
import TransactionForm from "./components/TransactionForm";
import TransactionsList from "./components/TransactionsList";
import { Container } from "@mui/material";
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
