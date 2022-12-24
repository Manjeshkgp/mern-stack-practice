import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { TextField } from "@mui/material";
import { Button } from "@mui/material";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import Autocomplete from "@mui/material/Autocomplete";
import { Box } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../store/auth.js";

export default function CategoryForm({ editCategory }) {
  const dispatch = useDispatch();
  const token = Cookies.get("token");
  const user = useSelector((state) => state.auth.user);
  const categories = user?.categories;
  const reload = (res,_user) => {
    if (res.ok) {
      dispatch(setUser({ user: _user }));
      setFormdata(InitialForm);
    }
    return;
  };

  const InitialForm = {
    label: "",
    icon: "",
  };
  const icons = ["User"];

  const [formdata, setFormdata] = useState(InitialForm);

  useEffect(() => {
    if (editCategory._id !== undefined) {
      setFormdata(editCategory);
    }
  }, [editCategory]);

  function handleChange(e) {
    setFormdata({ ...formdata, [e.target.name]: e.target.value });
  }

  const formSubmit = (e) => {
    e.preventDefault();
    editCategory._id === undefined ? create() : update();
  };

  const create = async () => {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/category`, {
      method: "POST",
      body: JSON.stringify(formdata),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const _user = { ...user, categories: [...user.categories, {...formdata}] };
    reload(res,_user);
  };

  const update = async () => {
    const res = await fetch(
      `${process.env.REACT_APP_API_URL}/category/${editCategory._id}`,
      {
        method: "PATCH",
        body: JSON.stringify(formdata),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const _user = { ...user, categories: user.categories.map((cat)=>cat._id==editCategory._id?formdata:cat) };
    reload(res,_user);
  };

  function getCategoryNameById() {
    return (
      categories.find((category) => category._id === formdata.category_id) ?? ""
    );
  }

  return (
    <Card sx={{ minWidth: 275, marginTop: 5 }}>
      <CardContent>
        <Typography variant="h6">Add New Category</Typography>
        <Box
          component="form"
          onSubmit={(e) => formSubmit(e)}
          sx={{ display: "flex" }}
        >
          <TextField
            sx={{ marginRight: 5 }}
            size="small"
            name="label"
            value={formdata.label}
            onChange={handleChange}
            id="outlined-basic"
            label="Label"
            variant="outlined"
          />
          <Autocomplete
            size="small"
            value={getCategoryNameById()}
            onChange={(event, newValue) => {
              setFormdata({ ...formdata, icon: newValue });
              console.log(newValue);
            }}
            id="icons"
            options={icons}
            sx={{ width: 200, marginRight: 5 }}
            renderInput={(params) => <TextField {...params} label="Icons" />}
          />
          {editCategory._id !== undefined && (
            <Button type="submit" variant="secondary">
              Update
            </Button>
          )}

          {editCategory._id === undefined && (
            <Button type="submit" variant="contained">
              Submit
            </Button>
          )}
        </Box>
      </CardContent>
    </Card>
  );
}
