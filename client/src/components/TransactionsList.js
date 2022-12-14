import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Typography } from "@mui/material";
import EditSharpIcon from "@mui/icons-material/EditSharp";
import DeleteSharpIcon from "@mui/icons-material/DeleteSharp";
import { IconButton } from "@mui/material";
import dayjs from "dayjs";
import Cookies from "js-cookie";
import { useSelector } from "react-redux";

export default function TransactionsList({
  data,
  fetchTransactions,
  setEditTransaction,
}) {
  const token = Cookies.get("token");
  const remove = async (_id) => {
    if (!window.confirm("Are you sure you want to remove")) {
      return;
    }
    const res = await fetch(
      `${process.env.REACT_APP_API_URL}/transaction/${_id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (res.ok) {
      alert("Deleted Successfully");
      fetchTransactions();
    }
  };

  const formatDate = (date) => {
    return dayjs(date).format("DD MMM, YY");
  };
  const user = useSelector((state) => state.auth.user);
  const categoryName = (id) => {
    const category = user.categories.find((category) => category._id === id);
    return category ? category.label : "NA";
  };
  return (
    <>
      <Typography sx={{ marginTop: 10 }} variant="h6">
        List of Transactions
      </Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Amount</TableCell>
              <TableCell align="center">Description</TableCell>
              <TableCell align="center">Date</TableCell>
              <TableCell align="center">Category</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
            data.map((month) =>
              month.transactions.map((row) => (
                <TableRow
                  key={row._id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row" align="center">
                    {row.amount}
                  </TableCell>
                  <TableCell align="center">
                    {row.description || "No Details Given"}
                  </TableCell>
                  <TableCell align="center">
                    {formatDate(row.date) || "No Details Given"}
                  </TableCell>
                  <TableCell align="center">
                    {categoryName(row.category_id)}
                  </TableCell>
                  <TableCell align="center">
                    <IconButton
                      onClick={() => setEditTransaction(row)}
                      color="primary"
                      component="label"
                    >
                      <EditSharpIcon />
                    </IconButton>
                    <IconButton
                      onClick={() => remove(row._id)}
                      color="warning"
                      component="label"
                    >
                      <DeleteSharpIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
