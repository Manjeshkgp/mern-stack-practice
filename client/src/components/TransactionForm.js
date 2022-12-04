import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { TextField } from "@mui/material";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider/LocalizationProvider";
import { Button } from "@mui/material";
import { useState, useEffect } from "react";

export default function TransactionForm({
  fetchTransactions,
  editTransaction,
  setEditTransaction,
}) {

    const reload = (res)=>{
        if(res.ok){
            setFormdata(InitialForm);
            fetchTransactions();
        }
        return;
    }

  const InitialForm = {
    amount: 0,
    description: "",
    date: new Date(),
  };

  const [formdata, setFormdata] = useState(InitialForm);

  useEffect(() => {
    if (editTransaction.amount !== undefined) {
      setFormdata(editTransaction);
    }
  }, [editTransaction]);

  function handleChange(e) {
    setFormdata({ ...formdata, [e.target.name]: e.target.value });
  }
  
  const handleDate = (newValue) => {
    setFormdata({ ...formdata, date: newValue });
  };

  const formSubmit = (e) =>{
    e.preventDefault();
    editTransaction.amount === undefined ? create(): update();
  }

  const create = async ()=>{
    const res = await fetch("http://localhost:4000/transaction", {
      method: "POST",
      body: JSON.stringify(formdata),
      headers: {
        "Content-Type": "application/json",
      },
    });
    reload(res)
  }

  const update = async ()=>{
    const res = await fetch(`http://localhost:4000/transaction/${editTransaction._id}`, {
      method: "PATCH",
      body: JSON.stringify(formdata),
      headers: {
        "Content-Type": "application/json",
      },
    });
   reload(res)
   setEditTransaction({})
  }
  return (
    <Card sx={{ minWidth: 275, marginTop: 5 }}>
      <CardContent>
        <form onSubmit={(e) => formSubmit(e)}>
          <Typography variant="h6">Add New Transaction</Typography>
          <TextField
            sx={{ marginRight: 5 }}
            size="small"
            name="amount"
            value={formdata.amount}
            onChange={handleChange}
            id="outlined-basic"
            label="Amount"
            variant="outlined"
          />
          <TextField
            sx={{ marginRight: 5 }}
            size="small"
            name="description"
            value={formdata.description}
            onChange={handleChange}
             id="outlined-basic"
            label="Description"
            variant="outlined"
          />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DesktopDatePicker
              label="Transaction Date"
              name="date"
              inputFormat="MM/DD/YYYY"
              value={formdata.date}
              onChange={handleDate}
              renderInput={(params) => (
                <TextField sx={{ marginRight: 5 }} size="small" {...params} />
              )}
            />
          </LocalizationProvider>
          {editTransaction.amount !== undefined && (
            <Button type="submit" variant="secondary">
              Update
            </Button>
          )}

          {editTransaction.amount === undefined && (
            <Button type="submit" variant="contained">
              Submit
            </Button>
          )}
          
        </form>
      </CardContent>
    </Card>
  );
}
