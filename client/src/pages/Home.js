import React, { useEffect, useState } from "react";
import { Container } from "@mui/system";
import TransactionForm from "../components/TransactionForm";
import TransactionChart from "../components/TransactionChart";
import TransactionsList from "../components/TransactionsList";
import Cookies from "js-cookie";

const Home = () => {
  const [transactions, setTransactions] = useState([]);
  const [editTransaction, setEditTransaction] = useState({});

  useEffect(() => {
    fetchTransactions();
  }, []);

  async function fetchTransactions() { 
    const token = Cookies.get("token");
    const res = await fetch(`${process.env.REACT_APP_API_URL}/transaction`, {
      headers: { 
        Authorization:`Bearer ${token}`,
       },
    });
    const { data } = await res.json();
    setTransactions(data);
  }
  return (
    <>
      <Container>
      <TransactionChart data={transactions}/>
        <TransactionForm
          fetchTransactions={fetchTransactions}
          editTransaction={editTransaction}
          setEditTransaction={setEditTransaction}
        ></TransactionForm>
        <TransactionsList
          data={transactions}
          fetchTransactions={fetchTransactions}
          setEditTransaction={setEditTransaction}
        ></TransactionsList>
        <br />
      </Container>
    </>
  );
};

export default Home;
