import React, { useEffect } from "react";
import { useState } from "react";

function App() {
  useEffect(() => {
    fetchTransactions();
  }, []);

  const [formdata, setFormdata] = useState({
    amount: 0,
    description: "",
    date: "",
  });

  const [transactions,setTransactions] = useState([])

  async function fetchTransactions() {
    const res = await fetch("http://localhost:4000/transaction");
    const { data } = await res.json();
    setTransactions(data);
  }

  const formSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:4000/transaction", {
      method: "POST",
      body: JSON.stringify(formdata),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if(res.ok){
    fetchTransactions();
    }
  };

  return (
    <div>
      <form onSubmit={(e) => formSubmit(e)}>
        <input
          value={formdata.amount}
          onChange={(e) => setFormdata({ ...formdata, amount: e.target.value })}
          type="number"
          name="amount"
          placeholder="Enter transaction Amount"
        ></input>
        <input
          type="text"
          value={formdata.description}
          onChange={(e) =>
            setFormdata({ ...formdata, description: e.target.value })
          }
          placeholder="Enter transaction details"
        ></input>
        <input
          type="date"
          value={formdata.date}
          onChange={(e) => setFormdata({ ...formdata, date: e.target.value })}
        ></input>
        <button type="submit">Submit</button>
      </form>
      <br />
      <section>
        <table>
          <thead>
            <th>Amount</th>
            <th>Description</th>
            <th>Date</th>
          </thead>
          {transactions.map((data)=>{
            return(<tbody key={data._id}>
              <tr>
                <td>{data.amount}</td>
                <td>{data.description || "No details"}</td>
                <td>{data.date}</td>
              </tr>
            </tbody>)
          })}
        </table>
      </section>
    </div>
  );
}

export default App;
