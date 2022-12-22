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
import {Container} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import { setUser } from "../store/auth";

export default function Category() {
    const dispatch = useDispatch();
    const user = useSelector(state=>state.auth.user)
    const token = Cookies.get("token")
    const remove = async (_id)=>{
        const res = await fetch(`${process.env.REACT_APP_API_URL}/category/${_id}`,{
          method: "DELETE",
          headers:{
            Authorization:`Bearer ${token}`,
          },
        })
        if(res.ok){
            const _user = {...user,categories:user.categories.filter(cat=>cat._id!=_id)}
            dispatch(setUser({user:_user}))
        }
      }

  return (
    <><Container>
      <Typography sx={{ marginTop: 10 }} variant="h6">
        List of Categories
      </Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Label</TableCell>
              <TableCell align="center">Icon</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {user.categories.map((row) => (
              <TableRow
                key={row._id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row" align="center">
                  {row.label}
                </TableCell>
                <TableCell align="center">
                  {row.icon || "No Details Given"}
                </TableCell>
                <TableCell align="center">
                <IconButton color="primary" component="label">
                    <EditSharpIcon />
                  </IconButton>
                  <IconButton onClick={()=>{remove(row._id)}} color="warning" component="label">
                    <DeleteSharpIcon/>
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      </Container>
    </>
  );
}
