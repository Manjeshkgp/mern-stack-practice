import React, { useEffect } from "react";
import { useState } from "react";
import AppBar from "./components/AppBar";
import TransactionForm from "./components/TransactionForm";
import TransactionsList from "./components/TransactionsList";
import { Container } from "@mui/material";

function App() {
  useEffect(() => {
    fetchTransactions();
  }, []);

  const [transactions, setTransactions] = useState([]);

  const [editTransaction, setEditTransaction] = useState({});

  async function fetchTransactions() {
    const res = await fetch("http://localhost:4000/transaction");
    const { data } = await res.json();
    setTransactions(data);
  }

  return (
    <div>
      <AppBar></AppBar>
      <Container>
        <TransactionForm
          fetchTransactions={fetchTransactions}
          editTransaction={editTransaction}
          setEditTransaction={setEditTransaction}
        ></TransactionForm>
        <TransactionsList
          transactions={transactions}
          fetchTransactions={fetchTransactions}
          setEditTransaction={setEditTransaction}
        ></TransactionsList>
        <br />
      </Container>
    </div>
  );
}

export default App;
