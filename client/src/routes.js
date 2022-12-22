import App from "./App";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Register from "./pages/Register";
import CheckAuth from "./utils/CheckAuth";
import Guest from "./utils/Guest";

import { createBrowserRouter } from "react-router-dom";
import Category from "./pages/Category";

export default createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/login",
        element: <Guest><Login /></Guest>,
      },
      {
        path: "/",
        element: (
          <CheckAuth>
            <Home />
          </CheckAuth>
        ),
        // element: token? <Home />: <Navigate to='/login' replace={true}/>
      },
      {
        path: "/register",
        element: <Guest><Register /></Guest>,
      },
      {
        path: "/Category",
        element: <CheckAuth><Category /></CheckAuth>,
      },
    ],
  },
]);
