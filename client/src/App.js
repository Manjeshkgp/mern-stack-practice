import React, { useEffect,useState } from "react";
import AppBar from "./components/AppBar";
import { Outlet } from "react-router-dom";
import { useSelector,useDispatch } from "react-redux";
import { setUser } from "./store/auth";
import Cookies from "js-cookie";

function App() {
  const auth = useSelector(state=>state.auth);
  const dispatch = useDispatch();
  const token = Cookies.get("token");
  const [isLoading, setIsLoading] = useState(true);



  async function fetchUser() {
    setIsLoading(true)
    const res = await fetch(`${process.env.REACT_APP_API_URL}/user`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if(res.ok){
      const user = await res.json();
      dispatch(setUser(user))
    }
  setIsLoading(false)
}

  console.log(auth)

  useEffect(()=>{
    fetchUser()
  },[])

  if(isLoading){
    return "Loading..."
  }

  return (
    <>
      <AppBar></AppBar>
      <Outlet/>
    </>
  );
}

export default App;
