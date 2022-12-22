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
import Cookies from "js-cookie";
import Autocomplete from "@mui/material/Autocomplete";
import { Box } from "@mui/material";
import {useSelector} from "react-redux";

export default function TransactionForm({
  fetchTransactions,
  editTransaction,
  setEditTransaction,
}) {
  const token = Cookies.get("token");
  const user = useSelector(state=>state.auth.user);
  const categories = user?.categories;
  const reload = (res) => {
    if (res.ok) {
      setFormdata(InitialForm);
      fetchTransactions();
    }
    return;
  };

  const InitialForm = {
    amount: 0,
    description: "",
    date: new Date(),
    category_id: "",
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

  const formSubmit = (e) => {
    e.preventDefault();
    editTransaction.amount === undefined ? create() : update();
  };

  const create = async () => {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/transaction`, {
      method: "POST",
      body: JSON.stringify(formdata),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    reload(res);
  };

  const update = async () => {
    const res = await fetch(
      `${process.env.REACT_APP_API_URL}/transaction/${editTransaction._id}`,
      {
        method: "PATCH",
        body: JSON.stringify(formdata),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    reload(res);
    setEditTransaction({});
  };

  function getCategoryNameById(){
    return categories.find((category)=> category._id===formdata.category_id) ?? ""
  }

  return (
    <Card sx={{ minWidth: 275, marginTop: 5 }}>
      <CardContent>
        <Typography variant="h6">Add New Transaction</Typography>
        <Box
          component="form"
          onSubmit={(e) => formSubmit(e)}
          sx={{ display: "flex" }}
        >
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
          <Autocomplete
            size="small"
            value={getCategoryNameById()}
            onChange={(event, newValue) => {
              setFormdata({ ...formdata, category_id: newValue._id });
              console.log(newValue)
            }}
            id="controllable-states-demo"
            options={categories}
            sx={{ width: 200, marginRight: 5 }}
            renderInput={(params) => <TextField {...params} label="Category" />}
          />
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
        </Box>
      </CardContent>
    </Card>
  );
}
